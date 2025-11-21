import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Target } from 'lucide-react';
import { loadMockData, mockPlayers } from '../mock';

const Jogadores = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const loadedPlayers = loadMockData('players', mockPlayers);
    // Ordenar por gols (maior para menor)
    const sorted = [...loadedPlayers].sort((a, b) => b.goals - a.goals);
    setPlayers(sorted);
  }, []);

  const getPositionBadge = (index) => {
    if (index === 0) {
      return (
        <div className="flex items-center gap-1 text-amber-500">
          <Trophy size={20} />
          <span className="font-bold">1º</span>
        </div>
      );
    } else if (index === 1) {
      return (
        <div className="flex items-center gap-1 text-gray-400">
          <Medal size={20} />
          <span className="font-bold">2º</span>
        </div>
      );
    } else if (index === 2) {
      return (
        <div className="flex items-center gap-1 text-amber-700">
          <Medal size={20} />
          <span className="font-bold">3º</span>
        </div>
      );
    }
    return <span className="text-gray-500 font-medium">{index + 1}º</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Target className="text-blue-600" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Artilharia</h1>
          <p className="text-xl text-gray-600">Ranking de gols do campeonato</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-4">
            <div className="grid grid-cols-12 gap-4 font-semibold">
              <div className="col-span-2 text-center">Posição</div>
              <div className="col-span-8">Jogador</div>
              <div className="col-span-2 text-center">Gols</div>
            </div>
          </div>

          {/* Players List */}
          <div className="divide-y divide-gray-200">
            {players.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg">Nenhum jogador registrado ainda.</p>
              </div>
            ) : (
              players.map((player, index) => (
                <div
                  key={player.id}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-emerald-50 transition-colors ${
                    index < 3 ? 'bg-amber-50' : ''
                  }`}
                >
                  <div className="col-span-2 flex justify-center">
                    {getPositionBadge(index)}
                  </div>
                  <div className="col-span-8">
                    <p className="text-lg font-semibold text-gray-900">
                      {player.firstName} {player.lastName}
                    </p>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full">
                      <span className="text-xl font-bold text-emerald-700">
                        {player.goals}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats Summary */}
        {players.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <p className="text-gray-600 mb-2">Total de Jogadores</p>
              <p className="text-4xl font-bold text-emerald-600">{players.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <p className="text-gray-600 mb-2">Total de Gols</p>
              <p className="text-4xl font-bold text-blue-600">
                {players.reduce((sum, p) => sum + p.goals, 0)}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <p className="text-gray-600 mb-2">Artilheiro</p>
              <p className="text-xl font-bold text-amber-600">
                {players[0]?.firstName} {players[0]?.lastName}
              </p>
              <p className="text-3xl font-bold text-amber-600 mt-1">
                {players[0]?.goals} gols
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jogadores;