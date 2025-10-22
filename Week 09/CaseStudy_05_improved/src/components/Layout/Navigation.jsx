import { Link, useLocation } from 'react-router-dom';
import { Coffee, Home, Music, Briefcase, DollarSign, BarChart3 } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/menu', label: 'Menu', icon: Coffee },
    { path: '/music', label: 'Music', icon: Music },
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/admin/prices', label: 'Update Prices', icon: DollarSign },
    { path: '/admin/reports', label: 'Sales Report', icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Coffee className="w-8 h-8 text-amber-800" />
            <span className="text-2xl font-bold text-amber-900">JavaJam</span>
          </div>

          <div className="hidden md:flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${isActive(path)
                    ? 'bg-amber-800 text-white'
                    : 'text-amber-900 hover:bg-amber-100'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button className="text-amber-900 hover:text-amber-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
