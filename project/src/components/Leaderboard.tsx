import React from 'react';
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Users } from 'lucide-react';
import { leaderboard } from '../data/mockData';

export const Leaderboard: React.FC = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-500" />;
      default:
        return <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-secondary">#{rank}</div>;
    }
  };

  const getPerformanceColor = (profitLoss: number) => {
    if (profitLoss > 0) return 'text-green-400';
    if (profitLoss < 0) return 'text-red-400';
    return 'text-subtle';
  };

  const getPerformanceIcon = (profitLoss: number) => {
    if (profitLoss > 0) return <TrendingUp className="w-4 h-4" />;
    if (profitLoss < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary mb-2">Leaderboard</h2>
        <p className="text-subtle">Top traders based on total profit & loss</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top 3 Podium */}
        <div className="lg:col-span-1">
          <div className="bg-primary-light rounded-xl border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-secondary flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                Top Performers
              </h3>
            </div>
            <div className="p-6">
              {leaderboard.slice(0, 3).map((user) => (
                <div key={user.id} className="flex items-center space-x-4 mb-6 last:mb-0">
                  <div className="flex-shrink-0">
                    {getRankIcon(user.rank)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{user.avatar}</span>
                      <div>
                        <p className="font-medium text-secondary">{user.name}</p>
                        <p className="text-sm text-subtle">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-subtle">Balance</p>
                    <p className="font-medium text-secondary">₹{user.virtualCoins.toLocaleString()}</p>
                    <div className={`flex items-center space-x-1 ${getPerformanceColor(user.totalProfitLoss)}`}>
                      {getPerformanceIcon(user.totalProfitLoss)}
                      <span className="text-sm font-medium">
                        {user.totalProfitLoss >= 0 ? '+' : ''}₹{user.totalProfitLoss.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-primary-light rounded-xl border border-gray-800 mt-6">
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-800 to-pink-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">Global Community</h3>
                <p className="text-3xl font-bold text-secondary mb-1">2,847</p>
                <p className="text-sm text-subtle">Active Traders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="lg:col-span-2">
          <div className="bg-primary-light rounded-xl border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-secondary">Global Rankings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-subtle uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-subtle uppercase tracking-wider">Trader</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-subtle uppercase tracking-wider">Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-subtle uppercase tracking-wider">P&L</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-subtle uppercase tracking-wider">Performance</th>
                  </tr>
                </thead>
                <tbody className="bg-primary-light divide-y divide-gray-800">
                  {leaderboard.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRankIcon(user.rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{user.avatar}</span>
                          <div>
                            <div className="text-sm font-medium text-secondary">{user.name}</div>
                            <div className="text-sm text-subtle">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-secondary">₹{user.virtualCoins.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getPerformanceColor(user.totalProfitLoss)}`}>
                          {user.totalProfitLoss >= 0 ? '+' : ''}₹{user.totalProfitLoss.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center space-x-1 ${getPerformanceColor(user.totalProfitLoss)}`}>
                          {getPerformanceIcon(user.totalProfitLoss)}
                          <span className="text-sm">
                            {user.totalProfitLoss > 0 ? 'Profit' : user.totalProfitLoss < 0 ? 'Loss' : 'Even'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};