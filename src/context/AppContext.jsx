import { createContext, useContext, useState, useCallback, useReducer } from 'react';
import { APPOINTMENTS, CLIENTS, SERVICES, PAYMENTS, NOTIFICATIONS } from '../data/mockData';
const AppContext = createContext(null);
function toastReducer(state, action) {
  if (action.type === 'ADD') return [...state, { id: Date.now(), ...action.payload }];
  if (action.type === 'REMOVE') return state.filter(t => t.id !== action.id);
  return state;
}
export function AppProvider({ children }) {
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [clients, setClients]           = useState(CLIENTS);
  const [services, setServices]         = useState(SERVICES);
  const [payments]                      = useState(PAYMENTS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [toasts, dispatchToast] = useReducer(toastReducer, []);
  const [notifOpen, setNotifOpen]   = useState(false);
  const [modalOpen, setModalOpen]   = useState(false);
  const [aiOpen, setAiOpen]         = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 1));
  const [calendarView, setCalendarView] = useState('week');
  const showToast = useCallback((msg, type = 'default') => {
    const id = Date.now();
    dispatchToast({ type: 'ADD', payload: { msg, kind: type } });
    setTimeout(() => dispatchToast({ type: 'REMOVE', id }), 3400);
  }, []);
  const addAppointment = useCallback((appt) => {
    setAppointments(prev => [...prev, { ...appt, id: `a${Date.now()}` }]);
    showToast('✅ Agendamento confirmado! Notificação enviada.', 'success');
  }, [showToast]);
  const updateAppointment = useCallback((id, changes) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...changes } : a));
    showToast('📝 Agendamento atualizado.', 'success');
  }, [showToast]);
  const cancelAppointment = useCallback((id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
    showToast('❌ Agendamento cancelado.', 'warning');
  }, [showToast]);
  const toggleService = useCallback((id) => { setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s)); }, []);
  const markAllRead = useCallback(() => { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); }, []);
  const unreadCount = notifications.filter(n => !n.read).length;
  return <AppContext.Provider value={{ appointments, clients, services, payments, notifications, addAppointment, updateAppointment, cancelAppointment, toggleService, setClients, markAllRead, toasts, showToast, notifOpen, setNotifOpen, modalOpen, setModalOpen, aiOpen, setAiOpen, selectedDate, setSelectedDate, calendarView, setCalendarView, unreadCount }}>{children}</AppContext.Provider>;
}
export const useApp = () => { const ctx = useContext(AppContext); if (!ctx) throw new Error('useApp must be used within AppProvider'); return ctx; };
