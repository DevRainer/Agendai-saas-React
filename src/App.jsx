import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp }   from './context/AppContext';
import { LoginPage, MfaPage }    from './pages/AuthPages';
import { DashboardPage }         from './pages/DashboardPage';
import { AgendaPage, NewAppointmentModal } from './pages/AgendaPage';
import { ClientesPage }          from './pages/ClientesPage';
import { ServicosPage, PagamentosPage } from './pages/ServicosPage';
import { RelatoriosPage }        from './pages/RelatoriosPage';
import { IntegracoesPage, ConfiguracoesPage } from './pages/ConfigPage';
import { Sidebar, NotifPanel }   from './components/layout';
import { AIAssistant }           from './components/AIAssistant';
import { ToastList }             from './components/ui';
import './styles/globals.css';

function AuthGate() {
  const { step } = useAuth();
  if (step === 'login') return <LoginPage />;
  if (step === 'mfa')   return <MfaPage />;
  return <AppProvider><MainApp /></AppProvider>;
}

function MainApp() {
  const [page, setPage] = useState('dashboard');
  const { toasts, notifOpen, modalOpen, setModalOpen, aiOpen } = useApp();

  const renderPage = () => {
    switch (page) {
      case 'dashboard':     return <DashboardPage />;
      case 'agenda':        return <AgendaPage />;
      case 'clientes':      return <ClientesPage />;
      case 'servicos':      return <ServicosPage />;
      case 'pagamentos':    return <PagamentosPage />;
      case 'relatorios':    return <RelatoriosPage />;
      case 'integracoes':   return <IntegracoesPage />;
      case 'configuracoes': return <ConfiguracoesPage />;
      default:              return <DashboardPage />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar page={page} onNavigate={setPage} />

      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </main>

      {notifOpen  && <NotifPanel />}
      {modalOpen  && <NewAppointmentModal onClose={() => setModalOpen(false)} />}
      {aiOpen     && <AIAssistant />}

      <ToastList toasts={toasts} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
