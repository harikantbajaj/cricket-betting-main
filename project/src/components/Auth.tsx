import React, { useState } from 'react';
import { X, LogIn, UserPlus } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface AuthProps {
  onClose: () => void;
  onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const { updateUser } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && name) {
      updateUser({ name });
    }
    onLogin();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-primary-light rounded-xl shadow-2xl p-8 w-full max-w-md relative border border-gray-800">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-secondary">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-400">{isLogin ? 'Login to continue trading' : 'Sign up to start your journey'}</p>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-secondary focus:ring-2 focus:ring-accent focus:border-accent"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-secondary focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-secondary focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-hover transition-colors flex items-center justify-center space-x-2"
          >
            {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            <span>{isLogin ? 'Login' : 'Sign Up'}</span>
          </button>
        </form>
        <div className="text-center mt-6">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-accent hover:underline">
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};