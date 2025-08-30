import { formatDataForExport } from './reportService.js';

/**
 * Exporta dados para CSV
 */
export const exportToCSV = (data, area, filename = 'relatorio') => {
  const formattedData = formatDataForExport(data, area);
  
  // Cabeçalho do CSV
  let csvContent = 'Relatório JL Construtora\n';
  csvContent += `Área: ${formattedData.area}\n`;
  csvContent += `Data de Geração: ${formattedData.dataGeracao}\n\n`;
  
  // KPIs
  csvContent += 'INDICADORES\n';
  csvContent += 'Indicador,Valor,Meta,Tendência\n';
  
  formattedData.kpis.forEach(kpi => {
    csvContent += `${kpi.indicador},${kpi.valor},${kpi.meta},${kpi.tendencia}\n`;
  });
  
  csvContent += '\n';
  
  // Tabelas
  formattedData.tabelas.forEach(tabela => {
    csvContent += `${tabela.titulo.toUpperCase()}\n`;
    
    if (tabela.dados.length > 0) {
      // Cabeçalhos da tabela
      const headers = Object.keys(tabela.dados[0]);
      csvContent += headers.join(',') + '\n';
      
      // Dados da tabela
      tabela.dados.forEach(row => {
        const values = headers.map(header => {
          const value = row[header];
          // Escapar vírgulas e aspas
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csvContent += values.join(',') + '\n';
      });
    }
    
    csvContent += '\n';
  });
  
  // Criar blob e download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${area}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Exporta dados para PDF
 */
export const exportToPDF = async (data, area, filename = 'relatorio') => {
  try {
    // Importação dinâmica do jsPDF
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF();
    
    const formattedData = formatDataForExport(data, area);
    
    // Configurações
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;
    
    // Cabeçalho
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('JL Construtora', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 10;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Relatório - ${formattedData.area}`, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.text(`Gerado em: ${formattedData.dataGeracao}`, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 20;
    
    // KPIs
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INDICADORES PRINCIPAIS', margin, yPosition);
    
    yPosition += 10;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    formattedData.kpis.forEach(kpi => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }
      
      const label = kpi.indicador.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      pdf.text(`${label}: ${kpi.valor}`, margin, yPosition);
      
      if (kpi.meta !== '-') {
        pdf.text(`Meta: ${kpi.meta}`, margin + 80, yPosition);
      }
      
      if (kpi.tendencia !== '-') {
        const tendenciaText = kpi.tendencia === 'subindo' ? '↗' : kpi.tendencia === 'descendo' ? '↘' : '→';
        pdf.text(tendenciaText, margin + 120, yPosition);
      }
      
      yPosition += 8;
    });
    
    yPosition += 10;
    
    // Tabelas
    formattedData.tabelas.forEach(tabela => {
      if (yPosition > 200) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(tabela.titulo.toUpperCase(), margin, yPosition);
      
      yPosition += 10;
      
      if (tabela.dados.length > 0) {
        // Cabeçalhos
        const headers = Object.keys(tabela.dados[0]);
        const colWidth = (pageWidth - 2 * margin) / headers.length;
        
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        headers.forEach((header, index) => {
          const x = margin + (index * colWidth);
          const label = header.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          pdf.text(label, x, yPosition);
        });
        
        yPosition += 8;
        
        // Dados
        pdf.setFont('helvetica', 'normal');
        tabela.dados.forEach(row => {
          if (yPosition > 250) {
            pdf.addPage();
            yPosition = 20;
          }
          
          headers.forEach((header, index) => {
            const x = margin + (index * colWidth);
            const value = row[header] || '';
            pdf.text(String(value), x, yPosition);
          });
          
          yPosition += 6;
        });
      }
      
      yPosition += 15;
    });
    
    // Download
    pdf.save(`${filename}_${area}_${new Date().toISOString().split('T')[0]}.pdf`);
    
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Falha ao gerar PDF. Verifique se jsPDF está instalado.');
  }
};

/**
 * Exporta dados para ambos os formatos
 */
export const exportReport = async (data, area, format = 'both') => {
  const filename = `relatorio_jl_construtora`;
  
  try {
    switch (format) {
      case 'csv':
        exportToCSV(data, area, filename);
        break;
      case 'pdf':
        await exportToPDF(data, area, filename);
        break;
      case 'both':
        exportToCSV(data, area, filename);
        await exportToPDF(data, area, filename);
        break;
      default:
        throw new Error('Formato de exportação inválido');
    }
    
    return { success: true, message: 'Relatório exportado com sucesso!' };
  } catch (error) {
    console.error('Erro na exportação:', error);
    return { success: false, message: error.message };
  }
};
