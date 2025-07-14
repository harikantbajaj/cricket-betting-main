import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Users } from 'lucide-react';
import { leaderboard as initialLeaderboard } from '../data/mockData';
import { usePortfolio } from '../context/PortfolioContext';
import { useMatches } from '../context/MatchContext';

export const Leaderboard: React.FC = () => {
  const { portfolios } = usePortfolio();
  const { matches } = useMatches();

  // Function to calculate user's portfolio total value and profit/loss
  const calculateUserPortfolio = () => {
    let totalValue = 0;
    let totalInvestment = 0;
    portfolios.forEach((portfolio) => {
      const match = matches.find(m => m.id === portfolio.matchId);
      if (match) {
        const team1Value = portfolio.team1Shares * match.currentPrice.team1;
        const team2Value = portfolio.team2Shares * match.currentPrice.team2;
        totalValue += team1Value + team2Value;
        totalInvestment += portfolio.totalInvestment;
      }
    });
    const profitLoss = totalValue - totalInvestment;
    return {
      id: 'user-portfolio',
      name: 'My Portfolio',
      email: '',
      avatar: '👤',
      virtualCoins: totalValue,
      totalProfitLoss: profitLoss,
      rank: 0, // will be updated dynamically
    };
  };

  // Initialize leaderboard state with initial leaderboard plus user's portfolio
  const [leaderboard, setLeaderboard] = useState(() => {
    const userPortfolioEntry = calculateUserPortfolio();
    // Filter out any existing user portfolio with same id if present
    const filteredLeaderboard = initialLeaderboard.filter(user => user.id !== 'user-portfolio');
    return [...filteredLeaderboard, userPortfolioEntry];
  });

  // Function to simulate price fluctuations
  const simulateFluctuations = (data: typeof leaderboard) => {
    return data.map(user => {
      if (user.id === 'user-portfolio') {
        // Recalculate user's portfolio dynamically
        const updatedUserPortfolio = calculateUserPortfolio();
        return { ...user, virtualCoins: updatedUserPortfolio.virtualCoins, totalProfitLoss: updatedUserPortfolio.totalProfitLoss };
      } else {
        // Simulate random fluctuation for other users
        const fluctuation = (Math.random() - 0.5) * 200; // +/- 100 range
        const newVirtualCoins = Math.max(0, user.virtualCoins + fluctuation);
        const newProfitLoss = user.totalProfitLoss + fluctuation * 0.1; // smaller change in profit/loss
        return { ...user, virtualCoins: newVirtualCoins, totalProfitLoss: newProfitLoss };
      }
    });
  };

  // Function to update ranks based on virtualCoins descending
  const updateRanks = (data: typeof leaderboard) => {
    const sorted = [...data].sort((a, b) => b.virtualCoins - a.virtualCoins);
    return sorted.map((user, index) => ({ ...user, rank: index + 1 }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard(prev => {
        const fluctuated = simulateFluctuations(prev);
        const ranked = updateRanks(fluctuated);
        return ranked;
      });
    }, 3000); // update every 3 seconds

    return () => clearInterval(interval);
  }, [portfolios, matches]);

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

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
        <Users className="w-6 h-6" /> Leaderboard
      </h2>
      <ul>
        {leaderboard.map(user => (
          <li
            key={user.id}
            className={`flex items-center justify-between p-3 mb-2 rounded-md ${
              user.id === 'user-portfolio' ? 'bg-blue-700' : 'bg-gray-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {getRankIcon(user.rank)}
              <span className="text-xl">{user.avatar}</span>
              <div>
                <p className="text-white font-semibold">{user.name}</p>
                {user.email && <p className="text-gray-400 text-sm">{user.email}</p>}
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-400 font-bold">{user.virtualCoins.toFixed(2)} VC</p>
              <p
                className={`text-sm ${
                  user.totalProfitLoss >= 0 ? 'text-green-400' : 'text-red-500'
                } flex items-center gap-1 justify-end`}
              >
                {user.totalProfitLoss >= 0 ? <TrendingUp /> : <TrendingDown />}
                {user.totalProfitLoss.toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
