import Sidebar from './Sidebar';
import { ToggleTheme } from './ui/toggle-theme';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-end p-3">
          <ToggleTheme />
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
