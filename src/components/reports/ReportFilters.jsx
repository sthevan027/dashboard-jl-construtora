import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { PERIODOS, AREAS } from '../../services/reportService';

const ReportFilters = ({ 
  area, 
  periodo, 
  onAreaChange, 
  onPeriodoChange, 
  onExport, 
  exporting = false 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Filtro de Área */}
      <Select value={area} onValueChange={onAreaChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Selecione a área" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={AREAS.RH}>
            <div className="flex items-center gap-2">
              <span>👥</span>
              Recursos Humanos
            </div>
          </SelectItem>
          <SelectItem value={AREAS.SEGURANCA}>
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              Segurança
            </div>
          </SelectItem>
          <SelectItem value={AREAS.OBRAS}>
            <div className="flex items-center gap-2">
              <span>🏗️</span>
              Obras
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Filtro de Período */}
      <Select value={periodo} onValueChange={onPeriodoChange}>
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={PERIODOS.MES}>Mês</SelectItem>
          <SelectItem value={PERIODOS.TRIMESTRE}>Trimestre</SelectItem>
          <SelectItem value={PERIODOS.ANO}>Ano</SelectItem>
        </SelectContent>
      </Select>

      {/* Botões de Exportação */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExport('csv')}
          disabled={exporting}
          loading={exporting}
        >
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          CSV
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExport('pdf')}
          disabled={exporting}
          loading={exporting}
        >
          <FileText className="w-4 h-4 mr-2" />
          PDF
        </Button>
        <Button
          size="sm"
          onClick={() => onExport('both')}
          disabled={exporting}
          loading={exporting}
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default ReportFilters;
