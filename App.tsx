import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Login from './pages/Login';
import Layout from './components/Layout';
import PatientList from './pages/PatientList';
import PatientDetails from './pages/PatientDetails';
import InvoiceList from './pages/InvoiceList';
import CreateInvoice from './pages/CreateInvoice';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import BookAppointment from './pages/BookAppointment';
import { DataService } from './services/dataService';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial Check
    const checkAuth = async () => {
        try {
            const userData = await DataService.getCurrentUser();
            setUser(userData);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    checkAuth();

    // 2. Listener for Supabase Auth changes
    if (supabase) {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                 const userData = await DataService.getCurrentUser();
                 setUser(userData);
            } else {
                 // Only set user to null if we are strictly using Supabase
                 // If mock, we might want to keep the mock user unless explicit logout happened in UI
                 if (!user?.id.startsWith('u1')) { // assuming mock ID 'u1'
                    setUser(null);
                 }
            }
        });
        return () => subscription.unsubscribe();
    }
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-background-light text-primary">Loading DentalFlow...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={user ? <Layout user={user} /> : <Navigate to="/login" replace />}>
            <Route path="/" element={<Dashboard />} />
            
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
            
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointments/book" element={<BookAppointment />} />
            
            <Route path="/billing" element={<InvoiceList />} />
            <Route path="/billing/create" element={<CreateInvoice />} />
            
            {/* Fallback for unimplemented routes */}
            <Route path="/reports" element={<div className="p-8">Reports Module Coming Soon</div>} />
            <Route path="/settings" element={<div className="p-8">Settings Module Coming Soon</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;