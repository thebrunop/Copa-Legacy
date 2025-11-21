import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { loadMockData, mockMatches, mockTeams } from '../mock';
import { Button } from '../components/ui/button';

const Jogos = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMatches(loadMockData('matches', mockMatches));
    setTeams(loadMockData('teams', mockTeams));
  }, []);

  const getTeam = (teamId) => {
    return teams.find((t) => t.id === teamId);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const groupMatchesByPhase = () => {
    const grouped = {
      'Grupo A': [],
      'Grupo B': [],
      'Semifinais': [],
      'Final': []
    };

    matches.forEach((match) => {
      if (match.phase === 'Grupo A') grouped['Grupo A'].push(match);
      else if (match.phase === 'Grupo B') grouped['Grupo B'].push(match);
      else if (match.phase.includes('Semifinal')) grouped['Semifinais'].push(match);
      else if (match.phase === 'Final') grouped['Final'].push(match);
    });

    return grouped;
  };

  const groupedMatches = groupMatchesByPhase();

  const renderMatch = (match) => {
    const team1 = getTeam(match.team1);
    const team2 = getTeam(match.team2);

    return (
      <div
        key={match.id}
        onClick={() => navigate(`/jogo/${match.id}`)}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 hover:border-emerald-500"
      >
        <div className="p-6">
          {/* Data e Hora */}
          <div className="flex items-center justify-center gap-4 mb-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span className="font-medium">{formatDate(match.date)}</span>
            </div>
            <span className="text-gray-400">|</span>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span className="font-medium">{match.time}</span>
            </div>
          </div>

          {/* Times e Placar */}
          {match.team1 && match.team2 ? (
            <div className="flex items-center justify-between">
              {/* Time 1 */}
              <div className="flex-1 text-center">
                <div className="text-5xl mb-2">{team1?.shield}</div>
                <p className="font-semibold text-gray-900 text-sm">{team1?.name}</p>
              </div>

              {/* Placar */}
              <div className="flex-shrink-0 mx-6">
                <div className="flex items-center gap-4 bg-gray-100 rounded-lg px-6 py-3">
                  <span className="text-3xl font-bold text-gray-900">{match.score1}</span>
                  <span className="text-2xl text-gray-400">-</span>
                  <span className="text-3xl font-bold text-gray-900">{match.score2}</span>
                </div>
              </div>

              {/* Time 2 */}
              <div className="flex-1 text-center">
                <div className="text-5xl mb-2">{team2?.shield}</div>
                <p className="font-semibold text-gray-900 text-sm">{team2?.name}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 font-medium">{match.label}</p>
              <p className="text-sm text-gray-400 mt-1">Aguardando classificação</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 flex items-center justify-between">
          <span className="text-white font-medium">
            {match.status === 'scheduled' ? 'Agendado' : match.status === 'finished' ? 'Finalizado' : 'Pendente'}
          </span>
          <ChevronRight className="text-white" size={20} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Jogos</h1>
          <p className="text-xl text-gray-600">Acompanhe todos os jogos do campeonato</p>
        </div>

        {/* Fase de Grupos - Grupo A */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-red-500 rounded"></div>
            <h2 className="text-2xl font-bold text-gray-900">Fase de Grupos - Grupo A</h2>
            <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-red-500 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupedMatches['Grupo A'].map((match) => renderMatch(match))}
          </div>
        </div>

        {/* Fase de Grupos - Grupo B */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-blue-500 rounded"></div>
            <h2 className="text-2xl font-bold text-gray-900">Fase de Grupos - Grupo B</h2>
            <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-blue-500 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupedMatches['Grupo B'].map((match) => renderMatch(match))}
          </div>
        </div>

        {/* Semifinais */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-amber-500 rounded"></div>
            <h2 className="text-2xl font-bold text-gray-900">Semifinais</h2>
            <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-amber-500 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupedMatches['Semifinais'].map((match) => renderMatch(match))}
          </div>
        </div>

        {/* Final */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-purple-500 rounded"></div>
            <h2 className="text-2xl font-bold text-gray-900">Final</h2>
            <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-purple-500 rounded"></div>
          </div>
          <div className="max-w-2xl mx-auto">
            {groupedMatches['Final'].map((match) => renderMatch(match))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jogos;