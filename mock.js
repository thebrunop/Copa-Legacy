// Mock data para o sistema de campeonato

export const mockPlayers = [
  { id: '1', firstName: 'João', lastName: 'Silva', phone: '(11) 99999-1111', goals: 0 },
  { id: '2', firstName: 'Pedro', lastName: 'Santos', phone: '(11) 99999-2222', goals: 0 },
  { id: '3', firstName: 'Lucas', lastName: 'Oliveira', phone: '(11) 99999-3333', goals: 0 },
  { id: '4', firstName: 'Matheus', lastName: 'Costa', phone: '(11) 99999-4444', goals: 0 },
  { id: '5', firstName: 'Gabriel', lastName: 'Lima', phone: '(11) 99999-5555', goals: 0 },
  { id: '6', firstName: 'Rafael', lastName: 'Alves', phone: '(11) 99999-6666', goals: 0 },
  { id: '7', firstName: 'Bruno', lastName: 'Ferreira', phone: '(11) 99999-7777', goals: 0 },
  { id: '8', firstName: 'Thiago', lastName: 'Rodrigues', phone: '(11) 99999-8888', goals: 0 },
  { id: '9', firstName: 'Diego', lastName: 'Martins', phone: '(11) 99999-9999', goals: 0 },
  { id: '10', firstName: 'Felipe', lastName: 'Souza', phone: '(11) 98888-1111', goals: 0 },
  { id: '11', firstName: 'André', lastName: 'Pereira', phone: '(11) 98888-2222', goals: 0 },
  { id: '12', firstName: 'Carlos', lastName: 'Mendes', phone: '(11) 98888-3333', goals: 0 },
  { id: '13', firstName: 'Ricardo', lastName: 'Barros', phone: '(11) 98888-4444', goals: 0 },
  { id: '14', firstName: 'Fernando', lastName: 'Campos', phone: '(11) 98888-5555', goals: 0 },
  { id: '15', firstName: 'Marcelo', lastName: 'Ribeiro', phone: '(11) 98888-6666', goals: 0 },
  { id: '16', firstName: 'Roberto', lastName: 'Cardoso', phone: '(11) 98888-7777', goals: 0 },
  { id: '17', firstName: 'Eduardo', lastName: 'Dias', phone: '(11) 98888-8888', goals: 0 },
  { id: '18', firstName: 'Paulo', lastName: 'Nunes', phone: '(11) 98888-9999', goals: 0 },
  { id: '19', firstName: 'Gustavo', lastName: 'Moreira', phone: '(11) 97777-1111', goals: 0 },
  { id: '20', firstName: 'Rodrigo', lastName: 'Azevedo', phone: '(11) 97777-2222', goals: 0 },
  { id: '21', firstName: 'Leandro', lastName: 'Castro', phone: '(11) 97777-3333', goals: 0 },
  { id: '22', firstName: 'Fábio', lastName: 'Correia', phone: '(11) 97777-4444', goals: 0 },
  { id: '23', firstName: 'Vinícius', lastName: 'Gomes', phone: '(11) 97777-5555', goals: 0 },
  { id: '24', firstName: 'Alessandro', lastName: 'Rocha', phone: '(11) 97777-6666', goals: 0 }
];

export const mockTeams = [
  {
    id: '1',
    name: 'Real Milagre',
    shield: '🦁',
    color: '#DC2626',
    players: ['1', '2', '3', '4']
  },
  {
    id: '2',
    name: 'Oração Dortmund',
    shield: '🦅',
    color: '#2563EB',
    players: ['5', '6', '7', '8']
  },
  {
    id: '3',
    name: 'Inter de Unção',
    shield: '⚔️',
    color: '#16A34A',
    players: ['9', '10', '11', '12']
  },
  {
    id: '4',
    name: 'Coríntios',
    shield: '⭐',
    color: '#CA8A04',
    players: ['13', '14', '15', '16']
  },
  {
    id: '5',
    name: 'BotaFé',
    shield: '🏆',
    color: '#7C3AED',
    players: ['17', '18', '19', '20']
  },
  {
    id: '6',
    name: 'Vasco da Graça',
    shield: '✝️',
    color: '#EA580C',
    players: ['21', '22', '23', '24']
  }
];

export const mockMatches = [
  // Fase de Grupos - Grupo A
  { id: '1', team1: '1', team2: '3', date: '2025-01-10', time: '19:00', score1: 0, score2: 0, phase: 'Grupo A', status: 'scheduled', goals: [] },
  { id: '2', team1: '1', team2: '5', date: '2025-01-12', time: '19:00', score1: 0, score2: 0, phase: 'Grupo A', status: 'scheduled', goals: [] },
  { id: '3', team1: '3', team2: '5', date: '2025-01-14', time: '19:00', score1: 0, score2: 0, phase: 'Grupo A', status: 'scheduled', goals: [] },
  
  // Fase de Grupos - Grupo B
  { id: '4', team1: '2', team2: '4', date: '2025-01-10', time: '20:30', score1: 0, score2: 0, phase: 'Grupo B', status: 'scheduled', goals: [] },
  { id: '5', team1: '2', team2: '6', date: '2025-01-12', time: '20:30', score1: 0, score2: 0, phase: 'Grupo B', status: 'scheduled', goals: [] },
  { id: '6', team1: '4', team2: '6', date: '2025-01-14', time: '20:30', score1: 0, score2: 0, phase: 'Grupo B', status: 'scheduled', goals: [] },
  
  // Semifinais (placeholders)
  { id: '7', team1: null, team2: null, date: '2025-01-17', time: '19:00', score1: 0, score2: 0, phase: 'Semifinal 1', status: 'pending', goals: [], label: '1º A vs 2º B' },
  { id: '8', team1: null, team2: null, date: '2025-01-17', time: '20:30', score1: 0, score2: 0, phase: 'Semifinal 2', status: 'pending', goals: [], label: '1º B vs 2º A' },
  
  // Final (placeholder)
  { id: '9', team1: null, team2: null, date: '2025-01-19', time: '19:30', score1: 0, score2: 0, phase: 'Final', status: 'pending', goals: [], label: 'Vencedor SF1 vs Vencedor SF2' }
];

// Função para salvar dados no localStorage
export const saveMockData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};