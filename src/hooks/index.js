import { useState, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
export function useCalendar(initialDate = new Date(2025, 4, 1)) {
  const [current, setCurrent] = useState(initialDate);
  const navigate     = useCallback((dir) => { setCurrent(prev => { const d = new Date(prev); d.setMonth(d.getMonth() + dir); return d; }); }, []);
  const navigateWeek = useCallback((dir) => { setCurrent(prev => { const d = new Date(prev); d.setDate(d.getDate() + dir * 7); return d; }); }, []);
  const navigateDay  = useCallback((dir) => { setCurrent(prev => { const d = new Date(prev); d.setDate(d.getDate() + dir); return d; }); }, []);
  const goToday = useCallback(() => setCurrent(new Date(2025, 4, 1)), []);
  const monthDays = useMemo(() => {
    const year = current.getFullYear(), month = current.getMonth();
    const first = new Date(year, month, 1).getDay(), total = new Date(year, month + 1, 0).getDate(), prevTotal = new Date(year, month, 0).getDate();
    const days = [];
    for (let i = first - 1; i >= 0; i--) days.push({ day: prevTotal - i, current: false, date: new Date(year, month - 1, prevTotal - i) });
    for (let d = 1; d <= total; d++) days.push({ day: d, current: true, date: new Date(year, month, d) });
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) days.push({ day: d, current: false, date: new Date(year, month + 1, d) });
    return days;
  }, [current]);
  const weekDays = useMemo(() => {
    const start = new Date(current); start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
  }, [current]);
  const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const DAYS_SHORT = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const DAYS_MIN   = ['D','S','T','Q','Q','S','S'];
  return { current, navigate, navigateWeek, navigateDay, goToday, monthDays, weekDays, MONTHS, DAYS_SHORT, DAYS_MIN };
}
export function useAppointmentsByDate(date) {
  const { appointments } = useApp();
  return useMemo(() => {
    if (!date) return [];
    const key = date instanceof Date ? `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}` : date;
    return appointments.filter(a => a.date === key).sort((a, b) => a.time.localeCompare(b.time));
  }, [appointments, date]);
}
export function useChartData(data, options = {}) {
  const { key = 'value' } = options;
  const max   = useMemo(() => Math.max(...data.map(d => d[key] || 0), 1), [data, key]);
  const total = useMemo(() => data.reduce((s, d) => s + (d[key] || 0), 0), [data, key]);
  const pcts  = useMemo(() => data.map(d => Math.max(((d[key] || 0) / max) * 100, 2)), [data, max, key]);
  return { max, total, pcts };
}
export function useFilteredClients(query = '', statusFilter = '') {
  const { clients } = useApp();
  return useMemo(() => clients.filter(c => {
    const matchQ = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.phone.includes(query) || c.email.toLowerCase().includes(query.toLowerCase());
    const matchS = !statusFilter || c.status === statusFilter;
    return matchQ && matchS;
  }), [clients, query, statusFilter]);
}
export function useDashboardStats() {
  const { appointments, payments } = useApp();
  return useMemo(() => {
    const today     = appointments.filter(a => a.date === '2025-05-01');
    const confirmed = today.filter(a => a.status === 'confirmed').length;
    const pending   = today.filter(a => a.status === 'pending').length;
    const cancelled = today.filter(a => a.status === 'cancelled').length;
    const revenue   = payments.filter(p => p.date === '2025-05-01' && p.status === 'paid').reduce((s,p) => s+p.value, 0);
    const occupancy  = Math.round((confirmed / Math.max(today.length, 1)) * 100);
    const cancelRate = Math.round((cancelled / Math.max(today.length, 1)) * 100);
    return { total: today.length, confirmed, pending, cancelled, revenue, occupancy, cancelRate };
  }, [appointments, payments]);
}
