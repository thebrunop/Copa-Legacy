import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { loadMockData, mockTeams, mockPlayers } from '../mock';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

const Times = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    setTeams(loadMockData('teams', mockTeams));
    setPlayers(loadMockData('players', mockPlayers));
  }, []);

  const getTeamPlayers = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) return [];
    return team.players.map((playerId) => players.find((p) => p.id === playerId)).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🛡️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Times</h1>
          <p className="text-xl text-gray-600">Conheça os 6 times do campeonato</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team) => {
            const teamPlayers = getTeamPlayers(team.id);
            const totalGoals = teamPlayers.reduce((sum, p) => sum + (p?.goals || 0), 0);

            return (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                style={{ borderTop: `6px solid ${team.color}` }}
              >
                <div
                  className="p-8 text-center"
                  style={{ backgroundColor: `${team.color}15` }}
                >
                  <div className="text-7xl mb-4">{team.shield}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{team.name}</h3>
                  <div className="flex justify-center gap-6 mt-4">
                    <div>
                      <p className="text-sm text-gray-600">Jogadores</p>
                      <p className="text-2xl font-bold" style={{ color: team.color }}>
                        {teamPlayers.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Gols</p>
                      <p className="text-2xl font-bold" style={{ color: team.color }}>
                        {totalGoals}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50">
                  <p className="text-center text-sm text-gray-600 font-medium">
                    Clique para ver jogadores
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal com jogadores do time */}
      <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
        <DialogContent className="max-w-2xl">
          {selectedTeam && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-6xl">{selectedTeam.shield}</div>
                    <h2 className="text-3xl font-bold" style={{ color: selectedTeam.color }}>
                      {selectedTeam.name}
                    </h2>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Elenco</h3>
                <div className="space-y-3">
                  {getTeamPlayers(selectedTeam.id).map((player, index) => (
                    <div
                      key={player?.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: selectedTeam.color }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">
                            {player?.firstName} {player?.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">⚽</span>
                        <span className="text-xl font-bold text-gray-700">
                          {player?.goals || 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Times;