import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { User } from '../types';

interface LayoutProps {
  user: User;
}

const Layout: React.FC<LayoutProps> = ({ user }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen bg-background-light">
      <Sidebar user={user} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
