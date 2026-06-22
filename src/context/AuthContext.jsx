import { createContext, useContext, useState, useCallback } from 'react';
const AuthContext = createContext(null);
const MOCK_USER = { id:'u1', name:'Dra. Ana Silva', email:'ana.silva@clinica.com.br', role:'admin', plan:'Profissional', clinic:'Clínica Dra. Silva', avatar:'DS', mfaEnabled:true };
export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [step, setStep]       = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const login = useCallback(async (email, password) => {
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 1200));
    if (email === 'admin@agendai.com' && password === '123456') { setStep('mfa'); }
    else { setError('E-mail ou senha incorretos. Tente: admin@agendai.com / 123456'); }
    setLoading(false);
  }, []);
  const verifyMfa = useCallback(async (code) => {
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 900));
    if (code.length === 6) { setUser(MOCK_USER); setStep('authenticated'); }
    else { setError('Código inválido. Use qualquer código de 6 dígitos.'); }
    setLoading(false);
  }, []);
  const logout = useCallback(() => { setUser(null); setStep('login'); setError(''); }, []);
  return <AuthContext.Provider value={{ user, step, loading, error, setError, login, verifyMfa, logout, isAuthenticated: step === 'authenticated' }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => { const ctx = useContext(AuthContext); if (!ctx) throw new Error('useAuth must be used within AuthProvider'); return ctx; };
