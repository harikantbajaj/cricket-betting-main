import React from 'react';
import { Bell, User, TrendingUp, Wallet, LogIn, UserPlus } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onAddFundsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginClick, onAddFundsClick }) => {
  const { user } = useUser();

  return (
    <header className="bg-primary-light border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-secondary">CricketTrade</h1>
                <p className="text-xs text-subtle">The Future of Fantasy Sports</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button onClick={onAddFundsClick} className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
                  <Wallet className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold text-secondary">
                    ₹{user.virtualCoins.toLocaleString()}
                  </span>
                </button>
                
                <button className="relative p-2 text-subtle hover:text-white">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">3</span>
                  </span>
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-secondary">{user.name}</p>
                    <p className="text-xs text-subtle">Rank #{user.rank}</p>
                  </div>
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <button onClick={onLoginClick} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-secondary hover:bg-gray-800 rounded-lg">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button onClick={onLoginClick} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-lg">
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};