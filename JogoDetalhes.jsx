import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { loadMockData, saveMockData, mockMatches, mockTeams, mockPlayers } from '../mock';
import { toast } from '../hooks/use-toast';

const JogoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);

  useEffect(() => {
    const matches = loadMockData('matches', mockMatches);
    const loadedTeams = loadMockData('teams', mockTeams);
    const loadedPlayers = loadMockData('players', mockPlayers);

    const currentMatch = matches.find((m) => m.id === id);
    
    if (!currentMatch) {
      navigate('/jogos');
      return;
    }

    setMatch(currentMatch);
    setTeams(loadedTeams);
    setPlayers(loadedPlayers);

    if (currentMatch.team1 && currentMatch.team2) {
      const team1 = loadedTeams.find((t) => t.id === currentMatch.team1);
      const team2 = loadedTeams.find((t) => t.id === currentMatch.team2);

      if (team1 && team2) {
        const t1Players = team1.players.map((pId) => loadedPlayers.find((p) => p.id === pId)).filter(Boolean);
        const t2Players = team2.players.map((pId) => loadedPlayers.find((p) => p.id === pId)).filter(Boolean);
        setTeam1Players(t1Players);
        setTeam2Players(t2Players);
      }
    }
  }, [id, navigate]);

  const getTeam = (teamId) => teams.find((t) => t.id === teamId);

  const getPlayerGoalsInMatch = (playerId) => {
    if (!match || !match.goals) return 0;
    return match.goals.filter((g) => g.playerId === playerId).length;
  };

  const addGoal = (playerId, teamId) => {
    const matches = loadMockData('matches', mockMatches);
    const currentMatch = matches.find((m) => m.id === id);
    const allPlayers = loadMockData('players', mockPlayers);

    if (!currentMatch.goals) currentMatch.goals = [];
    
    currentMatch.goals.push({ playerId, teamId });

    // Atualizar placar
    if (teamId === currentMatch.team1) {
      currentMatch.score1++;
    } else {
      currentMatch.score2++;
    }

    // Atualizar gols totais do jogador
    const playerIndex = allPlayers.findIndex((p) => p.id === playerId);
    if (playerIndex !== -1) {
      allPlayers[playerIndex].goals++;
    }

    // Salvar
    saveMockData('matches', matches);
    saveMockData('players', allPlayers);

    setMatch({ ...currentMatch });
    setPlayers(allPlayers);

    toast({
      title: 'Gol marcado!',
      description: 'Gol contabilizado com sucesso.'
    });
  };

  const removeGoal = (playerId, teamId) => {
    const matches = loadMockData('matches', mockMatches);
    const currentMatch = matches.find((m) => m.id === id);
    const allPlayers = loadMockData('players', mockPlayers);

    if (!currentMatch.goals || currentMatch.goals.length === 0) return;

    // Encontrar o último gol do jogador neste jogo
    const goalIndex = currentMatch.goals.map((g, i) => ({ ...g, index: i })).reverse().find((g) => g.playerId === playerId)?.index;
    
    if (goalIndex === undefined) {
      toast({
        title: 'Erro',
        description: 'Nenhum gol deste jogador para remover.',
        variant: 'destructive'
      });
      return;
    }

    currentMatch.goals.splice(goalIndex, 1);

    // Atualizar placar
    if (teamId === currentMatch.team1) {
      currentMatch.score1 = Math.max(0, currentMatch.score1 - 1);
    } else {
      currentMatch.score2 = Math.max(0, currentMatch.score2 - 1);
    }

    // Atualizar gols totais do jogador
    const playerIndex = allPlayers.findIndex((p) => p.id === playerId);
    if (playerIndex !== -1) {
      allPlayers[playerIndex].goals = Math.max(0, allPlayers[playerIndex].goals - 1);
    }

    // Salvar
    saveMockData('matches', matches);
    saveMockData('players', allPlayers);

    setMatch({ ...currentMatch });
    setPlayers(allPlayers);

    toast({
      title: 'Gol removido',
      description: 'Gol removido com sucesso.'
    });
  };

  if (!match) return null;

  const team1 = getTeam(match.team1);
  const team2 = getTeam(match.team2);

  if (!team1 || !team2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-600">Este jogo ainda não tem times definidos.</p>
          <Button onClick={() => navigate('/jogos')} className="mt-6">
            Voltar para Jogos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Botão Voltar */}
        <Button
          onClick={() => navigate('/jogos')}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </Button>

        {/* Placar */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-3 gap-8 items-center">
            {/* Time 1 */}
            <div className="text-center">
              <div className="text-7xl mb-4">{team1.shield}</div>
              <h2 className="text-2xl font-bold text-gray-900">{team1.name}</h2>
            </div>

            {/* Placar Central */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl w-24 h-24 flex items-center justify-center shadow-lg">
                  <span className="text-5xl font-bold">{match.score1}</span>
                </div>
                <span className="text-4xl text-gray-400 font-bold">-</span>
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl w-24 h-24 flex items-center justify-center shadow-lg">
                  <span className="text-5xl font-bold">{match.score2}</span>
                </div>
              </div>
              <p className="text-gray-600 mt-4">{match.phase}</p>
            </div>

            {/* Time 2 */}
            <div className="text-center">
              <div className="text-7xl mb-4">{team2.shield}</div>
              <h2 className="text-2xl font-bold text-gray-900">{team2.name}</h2>
            </div>
          </div>
        </div>

        {/* Jogadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Time 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-bold mb-6" style={{ color: team1.color }}>
              {team1.name}
            </h3>
            <div className="space-y-4">
              {team1Players.map((player) => (
                <div key={player.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {player.firstName} {player.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Gols neste jogo: {getPlayerGoalsInMatch(player.id)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => removeGoal(player.id, team1.id)}
                      variant="outline"
                      size="sm"
                      className="h-10 w-10 p-0"
                    >
                      <Minus size={18} />
                    </Button>
                    <Button
                      onClick={() => addGoal(player.id, team1.id)}
                      size="sm"
                      className="h-10 w-10 p-0 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-bold mb-6" style={{ color: team2.color }}>
              {team2.name}
            </h3>
            <div className="space-y-4">
              {team2Players.map((player) => (
                <div key={player.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {player.firstName} {player.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Gols neste jogo: {getPlayerGoalsInMatch(player.id)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => removeGoal(player.id, team2.id)}
                      variant="outline"
                      size="sm"
                      className="h-10 w-10 p-0"
                    >
                      <Minus size={18} />
                    </Button>
                    <Button
                      onClick={() => addGoal(player.id, team2.id)}
                      size="sm"
                      className="h-10 w-10 p-0 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JogoDetalhes;