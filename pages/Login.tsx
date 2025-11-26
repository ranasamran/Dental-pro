import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { DataService } from '../services/dataService';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (supabase) {
        if (isSignUp) {
          const { error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) throw error;
          alert('Check your email for the confirmation link!');
          setIsSignUp(false); // Switch back to login
        } else {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          navigate('/');
        }
      } else {
        // Fallback Mock Login
        console.warn("Supabase not configured, using mock login.");
        setTimeout(async () => {
           // Simulate a fetch
           await DataService.getCurrentUser(); 
           navigate('/');
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background-light p-4">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Left Side - Image */}
        <div className="hidden w-1/2 bg-cover bg-center md:block" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNuq93Gg_dub8VPujOH-iP2bCUKHjvfuBtbgMzxO-DkJBJnD9H1zaIWOLuydyci_aoGw5p6rQDlTlBktA7a11X1xtr5a2Xou4zjQWFwdhexsyJYn5ELtpduF3VEQ_SorumTSYeX69VWRpjAGETNx9EtMZEXc8bUCQgREIW2IHOnFeo8IuEYp55ehuTnR8bz46URWPCwWzG2_fWbBqPaKdaQ8jgsS4HjXvOUWz7yUwF4e6dRDWmPO3zUCdYFJlO-C9aQ_f3Lu6ZBgGE")' }}>
        </div>
        
        {/* Right Side - Form */}
        <div className="w-full p-8 md:w-1/2 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 flex items-center gap-3">
             <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white">
                <span className="material-symbols-outlined text-2xl">dentistry</span>
             </div>
             <h2 className="text-xl font-bold text-text-main">DentalCare Portal</h2>
          </div>

          <h1 className="mb-2 text-3xl font-bold text-text-main">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="mb-8 text-text-sub">
            {isSignUp ? 'Enter details to get started.' : 'Please enter your details to log in.'}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-text-main">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">email</span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-text-main placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-text-main">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-text-main placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between">
                 <div className="flex items-center">
                   <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                   <label htmlFor="remember-me" className="ml-2 block text-sm text-text-sub">Remember me</label>
                 </div>
                 <button type="button" className="text-sm font-medium text-primary hover:text-primary-dark">Forgot Password?</button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full rounded-lg bg-primary py-3 font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                isSignUp ? "Sign Up" : "Log In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-text-sub">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-bold text-primary hover:underline focus:outline-none"
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;