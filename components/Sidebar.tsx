import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/' },
    { name: 'Appointments', icon: 'calendar_month', path: '/appointments' },
    { name: 'Patients', icon: 'groups', path: '/patients' },
    { name: 'Billing', icon: 'receipt_long', path: '/billing' },
    { name: 'Reports', icon: 'bar_chart', path: '/reports' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-2xl">local_hospital</span>
          </div>
          <h1 className="text-xl font-bold text-text-main">DentalFlow</h1>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-sub hover:bg-gray-50 hover:text-text-main'
                }`
              }
            >
              <span className={`material-symbols-outlined ${item.name === 'Billing' || item.name === 'Patients' ? 'fill' : ''}`}>
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-gray-100 flex flex-col gap-2">
         <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                 isActive ? 'bg-gray-100 text-text-main' : 'text-text-sub hover:bg-gray-50'
              }`
            }
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </NavLink>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-sub hover:bg-gray-50 w-full text-left"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Log Out</span>
          </button>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
             <div 
               className="w-10 h-10 rounded-full bg-cover bg-center border border-gray-200"
               style={{ backgroundImage: `url(${user.avatar})` }}
             ></div>
             <div>
               <p className="text-sm font-semibold text-text-main">{user.name}</p>
               <p className="text-xs text-text-sub">{user.role}</p>
             </div>
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;
