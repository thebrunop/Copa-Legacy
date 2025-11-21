import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserPlus, Users, Shield, Calendar } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Calendar, label: 'Início' },
    { path: '/registre', icon: UserPlus, label: 'Registre' },
    { path: '/jogadores', icon: Users, label: 'Jogadores' },
    { path: '/times', icon: Shield, label: 'Times' },
    { path: '/jogos', icon: Calendar, label: 'Jogos' }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-emerald-700 to-emerald-900 text-white flex flex-col">
      <div className="p-6 border-b border-emerald-600">
        <div className="flex items-center gap-3">
          <div className="text-4xl">⚽</div>
          <div>
            <h1 className="text-xl font-bold">Campeonato</h1>
            <p className="text-sm text-emerald-200">Igreja FC</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-lg'
                      : 'hover:bg-emerald-600 text-emerald-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-emerald-600">
        <p className="text-xs text-emerald-200 text-center">
          Campeonato 2025
        </p>
      </div>
    </div>
  );
};

export default Sidebar;