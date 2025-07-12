import React from 'react';
import { TrendingUp, TrendingDown, IndianRupee, Users, Clock, MapPin } from 'lucide-react';
import { PriceChart } from './PriceChart';
import { LiveMatch } from './LiveMatch';
import { useUser } from '../context/UserContext';
import { useMatches } from '../context/MatchContext';
import { usePortfolio } from '../context/PortfolioContext';

export const Dashboard: React.FC = () => {
  const { user } = useUser();
  const { matches } = useMatches();
  const { portfolios } = usePortfolio();
  const liveMatches = matches.filter(match => match.status === 'live');
  const upcomingMatches = matches.filter(match => match.status === 'upcoming');

  const totalPortfolioValue = portfolios.reduce((sum, p) => {
    const match = matches.find(m => m.id === p.matchId);
    if (!match) return sum;
    const value = p.team1Shares * match.currentPrice.team1 + p.team2Shares * match.currentPrice.team2;
    return sum + value;
  }, 0);

  const totalInvestment = portfolios.reduce((sum, p) => sum + p.totalInvestment, 0);
  const totalProfitLoss = totalPortfolioValue - totalInvestment;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {liveMatches.length > 0 && (
        <div className="mb-8">
          <LiveMatch match={liveMatches[0]} />
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary mb-2">Welcome back, {user.name}!</h2>
        <p className="text-subtle">Track your performance and discover trading opportunities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-primary-light rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-subtle">Virtual Balance</p>
              <p className="text-2xl font-bold text-secondary">₹{user.virtualCoins.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-900 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-primary-light rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-subtle">Portfolio Value</p>
              <p className="text-2xl font-bold text-secondary">₹{totalPortfolioValue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-primary-light rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-subtle">Total P&L</p>
              <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalProfitLoss >= 0 ? '+' : ''}₹{totalProfitLoss.toLocaleString()}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              totalProfitLoss >= 0 ? 'bg-green-900' : 'bg-red-900'
            }`}>
              {totalProfitLoss >= 0 ?
                <TrendingUp className="w-6 h-6 text-green-400" /> :
                <TrendingDown className="w-6 h-6 text-red-400" />
              }
            </div>
          </div>
        </div>

        <div className="bg-primary-light rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-subtle">Global Rank</p>
              <p className="text-2xl font-bold text-secondary">#{user.rank}</p>
            </div>
            <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Matches */}
        <div className="bg-gray-900 rounded-xl border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-secondary flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              Live Matches
            </h3>
          </div>
          <div className="p-6">
            {liveMatches.map((match) => (
              <div key={match.id} className="border border-gray-800 rounded-lg p-4 mb-4 last:mb-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{match.team1.logo}</span>
                    <div>
                      <p className="font-medium text-secondary">{match.team1.shortName}</p>
                      <p className="text-sm text-subtle">₹{match.currentPrice.team1}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium text-subtle">VS</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-medium text-secondary">{match.team2.shortName}</p>
                      <p className="text-sm text-subtle">₹{match.currentPrice.team2}</p>
                    </div>
                    <span className="text-2xl">{match.team2.logo}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-subtle mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {match.venue}
                </div>
                <div className="h-32">
                  <PriceChart match={match} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="bg-gray-900 rounded-xl border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-secondary flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-400" />
              Upcoming Matches
            </h3>
          </div>
          <div className="p-6">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="border border-gray-800 rounded-lg p-4 mb-4 last:mb-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{match.team1.logo}</span>
                    <div>
                      <p className="font-medium text-secondary">{match.team1.shortName}</p>
                      <p className="text-sm text-subtle">₹{match.currentPrice.team1}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium text-subtle">VS</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-medium text-secondary">{match.team2.shortName}</p>
                      <p className="text-sm text-subtle">₹{match.currentPrice.team2}</p>
                    </div>
                    <span className="text-2xl">{match.team2.logo}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-subtle mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {match.venue}
                </div>
                <div className="flex items-center text-sm text-subtle">
                  <Clock className="w-4 h-4 mr-1" />
                  {match.startTime.toLocaleDateString()} at {match.startTime.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};