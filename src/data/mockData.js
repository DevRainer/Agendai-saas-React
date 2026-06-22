export const APPOINTMENTS=[
  {id:'a1',date:'2025-05-01',time:'09:00',duration:45,name:'Maria Oliveira',service:'Consulta',professional:'Dra. Silva',status:'confirmed',value:180,phone:'(11) 98765-4321',init:'MO',color:'#10B981',notes:'Primeira consulta'},
  {id:'a2',date:'2025-05-01',time:'10:00',duration:30,name:'João Pedro Santos',service:'Retorno',professional:'Dra. Silva',status:'pending',value:120,phone:'(11) 91234-5678',init:'JP',color:'#FBBF24',notes:''},
  {id:'a3',date:'2025-05-01',time:'11:15',duration:60,name:'Ana Luíza Ferreira',service:'Avaliação',professional:'Dr. Mendes',status:'confirmed',value:250,phone:'(21) 99876-5432',init:'AL',color:'#A78BFA',notes:'Trazer exames'},
  {id:'a4',date:'2025-05-01',time:'14:00',duration:45,name:'Roberto Costa',service:'Consulta',professional:'Dra. Silva',status:'confirmed',value:180,phone:'(11) 97654-3210',init:'RC',color:'#F472B6',notes:''},
  {id:'a5',date:'2025-05-01',time:'15:30',duration:30,name:'Carla Souza',service:'Retorno',professional:'Dr. Mendes',status:'cancelled',value:120,phone:'(11) 96543-2109',init:'CS',color:'#EF4444',notes:''},
  {id:'a6',date:'2025-05-01',time:'16:00',duration:45,name:'Felipe Moreira',service:'Consulta',professional:'Dra. Silva',status:'confirmed',value:180,phone:'(11) 95432-1098',init:'FM',color:'#06B6D4',notes:''},
  {id:'a7',date:'2025-05-02',time:'09:00',duration:45,name:'Beatriz Lima',service:'Consulta',professional:'Dra. Costa',status:'confirmed',value:180,phone:'(21) 94321-0987',init:'BL',color:'#10B981',notes:''},
  {id:'a8',date:'2025-05-02',time:'10:30',duration:60,name:'André Torres',service:'Avaliação',professional:'Dra. Silva',status:'confirmed',value:250,phone:'(11) 93210-9876',init:'AT',color:'#A78BFA',notes:''},
  {id:'a9',date:'2025-05-02',time:'14:00',duration:30,name:'Paula Mendes',service:'Retorno',professional:'Dr. Mendes',status:'pending',value:120,phone:'(11) 92109-8765',init:'PM',color:'#FBBF24',notes:''},
  {id:'a10',date:'2025-05-03',time:'09:00',duration:45,name:'Carlos Eduardo',service:'Consulta',professional:'Dra. Silva',status:'confirmed',value:180,phone:'(11) 91098-7654',init:'CE',color:'#06B6D4',notes:''},
];
export const CLIENTS=[
  {id:'c1',name:'Maria Oliveira',phone:'(11) 98765-4321',email:'maria@email.com',birthdate:'1985-03-15',lastVisit:'2025-05-01',totalVisits:12,totalSpent:1240,status:'Ativo',init:'MO',color:'#10B981',rating:5},
  {id:'c2',name:'João Pedro Santos',phone:'(11) 91234-5678',email:'joao@email.com',birthdate:'1990-07-22',lastVisit:'2025-04-29',totalVisits:8,totalSpent:860,status:'Ativo',init:'JP',color:'#FBBF24',rating:4},
  {id:'c3',name:'Ana Luíza Ferreira',phone:'(21) 99876-5432',email:'ana@email.com',birthdate:'1978-11-08',lastVisit:'2025-05-01',totalVisits:18,totalSpent:2100,status:'Ativo',init:'AL',color:'#A78BFA',rating:5},
  {id:'c4',name:'Roberto Costa',phone:'(11) 97654-3210',email:'roberto@email.com',birthdate:'1982-05-30',lastVisit:'2025-04-25',totalVisits:5,totalSpent:540,status:'Ativo',init:'RC',color:'#06B6D4',rating:4},
  {id:'c5',name:'Carla Souza',phone:'(11) 96543-2109',email:'carla@email.com',birthdate:'1995-09-12',lastVisit:'2025-05-01',totalVisits:6,totalSpent:720,status:'Inativo',init:'CS',color:'#F472B6',rating:3},
  {id:'c6',name:'Paulo Mendes',phone:'(11) 95432-1098',email:'paulo@email.com',birthdate:'1988-01-20',lastVisit:'2025-04-20',totalVisits:9,totalSpent:1080,status:'Ativo',init:'PM',color:'#A78BFA',rating:5},
  {id:'c7',name:'André Torres',phone:'(11) 93210-9876',email:'andre@email.com',birthdate:'1975-06-14',lastVisit:'2025-04-15',totalVisits:20,totalSpent:2500,status:'Ativo',init:'AT',color:'#10B981',rating:5},
  {id:'c8',name:'Beatriz Lima',phone:'(21) 94321-0987',email:'beatriz@email.com',birthdate:'1993-02-28',lastVisit:'2025-05-02',totalVisits:4,totalSpent:360,status:'Ativo',init:'BL',color:'#FBBF24',rating:4},
];
export const SERVICES=[
  {id:'s1',name:'Consulta',icon:'🩺',duration:45,price:180,active:true,category:'Clínico',totalBookings:312,revenue:56160},
  {id:'s2',name:'Retorno',icon:'🔁',duration:30,price:120,active:true,category:'Clínico',totalBookings:148,revenue:17760},
  {id:'s3',name:'Avaliação',icon:'📋',duration:60,price:250,active:true,category:'Diagnóstico',totalBookings:97,revenue:24250},
  {id:'s4',name:'Exame',icon:'🔬',duration:30,price:200,active:true,category:'Diagnóstico',totalBookings:64,revenue:12800},
  {id:'s5',name:'Procedimento',icon:'💉',duration:90,price:400,active:false,category:'Cirúrgico',totalBookings:23,revenue:9200},
  {id:'s6',name:'Telemedicina',icon:'💻',duration:30,price:150,active:true,category:'Online',totalBookings:78,revenue:11700},
];
export const PROFESSIONALS=[
  {id:'p1',name:'Dra. Silva',role:'Clínica Geral',color:'#7C3AED',avatar:'DS',available:true},
  {id:'p2',name:'Dr. Mendes',role:'Cardiologista',color:'#06B6D4',avatar:'DM',available:true},
  {id:'p3',name:'Dra. Costa',role:'Dermatologista',color:'#F472B6',avatar:'DC',available:false},
];
export const REVENUE_WEEKLY=[
  {label:'Seg',value:3200,appointments:18},{label:'Ter',value:4100,appointments:22},
  {label:'Qua',value:2800,appointments:15},{label:'Qui',value:4800,appointments:26},
  {label:'Sex',value:3600,appointments:20},{label:'Sáb',value:1200,appointments:6},
  {label:'Dom',value:5200,appointments:28},
];
export const REVENUE_MONTHLY=[
  {label:'Jan',value:72000},{label:'Fev',value:68000},{label:'Mar',value:81000},
  {label:'Abr',value:75000},{label:'Mai',value:89240},{label:'Jun',value:0},
  {label:'Jul',value:0},{label:'Ago',value:0},{label:'Set',value:0},
  {label:'Out',value:0},{label:'Nov',value:0},{label:'Dez',value:0},
];
export const CANCELLATION_DATA=[
  {label:'Jan',rate:8.2},{label:'Fev',rate:7.5},{label:'Mar',rate:6.8},{label:'Abr',rate:7.1},{label:'Mai',rate:6.2},
];
export const OCCUPANCY_DATA=[
  {label:'Seg',occ:82},{label:'Ter',occ:91},{label:'Qua',occ:68},{label:'Qui',occ:95},{label:'Sex',occ:78},{label:'Sáb',occ:45},
];
export const PAYMENTS=[
  {id:'pay1',client:'Maria Oliveira',service:'Consulta',method:'Pix',value:180,date:'2025-05-01',status:'paid',init:'MO',color:'#10B981'},
  {id:'pay2',client:'João Pedro Santos',service:'Retorno',method:'Cartão',value:120,date:'2025-05-01',status:'pending',init:'JP',color:'#FBBF24'},
  {id:'pay3',client:'Ana Luíza Ferreira',service:'Avaliação',method:'Pix',value:250,date:'2025-05-01',status:'paid',init:'AL',color:'#A78BFA'},
  {id:'pay4',client:'Roberto Costa',service:'Consulta',method:'Cartão',value:180,date:'2025-05-01',status:'paid',init:'RC',color:'#06B6D4'},
  {id:'pay5',client:'Felipe Moreira',service:'Consulta',method:'Pix',value:180,date:'2025-05-01',status:'paid',init:'FM',color:'#F472B6'},
  {id:'pay6',client:'Beatriz Lima',service:'Consulta',method:'Pix',value:180,date:'2025-05-02',status:'paid',init:'BL',color:'#10B981'},
  {id:'pay7',client:'Paula Mendes',service:'Retorno',method:'Cartão',value:120,date:'2025-05-02',status:'pending',init:'PM',color:'#FBBF24'},
];
export const NOTIFICATIONS=[
  {id:'n1',type:'confirmed',msg:'Maria Oliveira confirmou consulta às 09:00',time:'3 min',read:false,icon:'✅',color:'#10B981'},
  {id:'n2',type:'new',msg:'Novo agendamento: Paulo Mendes para 15/05',time:'12 min',read:false,icon:'📅',color:'#7C3AED'},
  {id:'n3',type:'payment',msg:'Pagamento Pix confirmado — R$180,00',time:'28 min',read:false,icon:'💰',color:'#FBBF24'},
  {id:'n4',type:'cancelled',msg:'Carla Souza cancelou agendamento de 15:30',time:'41 min',read:true,icon:'❌',color:'#EF4444'},
  {id:'n5',type:'reminder',msg:'Lembretes enviados para 3 clientes',time:'1h',read:true,icon:'🔔',color:'#06B6D4'},
  {id:'n6',type:'backup',msg:'Backup automático concluído com sucesso',time:'2h',read:true,icon:'💾',color:'#4C4A6A'},
];
export const TIME_SLOTS=['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00'];
export const EVENT_DAYS=[1,2,3,5,7,8,12,14,15,19,20,22,26,27,28];
