import React from 'react';
import { Trophy, Users, Calendar, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="text-8xl animate-bounce">⚽</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-4">
            Campeonato de Futebol
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-emerald-700 mb-6">
            Igreja FC 2025
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bem-vindo ao sistema de gerenciamento do nosso campeonato de final de ano!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-emerald-600" size={32} />
              <span className="text-3xl font-bold text-emerald-900">24</span>
            </div>
            <p className="text-gray-600 font-medium">Jogadores</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Shield className="text-blue-600" size={32} />
              <span className="text-3xl font-bold text-blue-900">6</span>
            </div>
            <p className="text-gray-600 font-medium">Times</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-amber-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="text-amber-600" size={32} />
              <span className="text-3xl font-bold text-amber-900">9</span>
            </div>
            <p className="text-gray-600 font-medium">Jogos</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Target className="text-purple-600" size={32} />
              <span className="text-3xl font-bold text-purple-900">87</span>
            </div>
            <p className="text-gray-600 font-medium">Gols</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Acesso Rápido</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/registre">
              <Button className="w-full h-24 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold">
                <UserPlus className="mr-2" size={24} />
                Registrar Jogador
              </Button>
            </Link>
            <Link to="/jogadores">
              <Button className="w-full h-24 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold">
                <Users className="mr-2" size={24} />
                Ver Jogadores
              </Button>
            </Link>
            <Link to="/times">
              <Button className="w-full h-24 bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold">
                <Shield className="mr-2" size={24} />
                Ver Times
              </Button>
            </Link>
            <Link to="/jogos">
              <Button className="w-full h-24 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold">
                <Calendar className="mr-2" size={24} />
                Ver Jogos
              </Button>
            </Link>
          </div>
        </div>

        {/* Tournament Info */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Sobre o Campeonato</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-emerald-100">Formato:</h4>
              <ul className="space-y-1 text-emerald-50">
                <li>• Fase de Grupos (2 grupos com 3 times)</li>
                <li>• Semifinais (1º A vs 2º B, 1º B vs 2º A)</li>
                <li>• Final (vencedores das semifinais)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-emerald-100">Informações:</h4>
              <ul className="space-y-1 text-emerald-50">
                <li>• 4 jogadores por time</li>
                <li>• Jogos todas as sextas-feiras</li>
                <li>• Início: Janeiro 2025</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Shield = ({ className, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const UserPlus = ({ className, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="22" x2="16" y1="11" y2="11" />
  </svg>
);

export default Home;