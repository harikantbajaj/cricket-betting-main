import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ShoppingCart, IndianRupee, Clock, Users } from 'lucide-react';
import { PriceChart } from './PriceChart';
import { useUser } from '../context/UserContext';
import { useMatches } from '../context/MatchContext';
import { usePortfolio } from '../context/PortfolioContext';

export const Trading: React.FC = () => {
  const { user, updateUser } = useUser();
  const { matches } = useMatches();
  const { updatePortfolio } = usePortfolio();
  const [selectedMatch, setSelectedMatch] = useState(matches[0]);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [selectedTeam, setSelectedTeam] = useState<'team1' | 'team2'>('team1');
  const [shares, setShares] = useState(1);

  const currentPrice = selectedTeam === 'team1' ? selectedMatch.currentPrice.team1 : selectedMatch.currentPrice.team2;
  const totalCost = shares * currentPrice;
  const team = selectedTeam === 'team1' ? selectedMatch.team1 : selectedMatch.team2;
  const teamId = selectedTeam === 'team1' ? '1' : '2';

  const handleTrade = () => {
    if (tradeType === 'buy') {
      if (user.virtualCoins >= totalCost) {
        updateUser({ virtualCoins: user.virtualCoins - totalCost });
        updatePortfolio(selectedMatch.id, teamId, shares, currentPrice);
        alert(`Bought ${shares} shares of ${team.shortName} for ₹${totalCost.toLocaleString()}`);
      } else {
        alert('Insufficient balance');
      }
    } else {
      // For selling, you'd need to check if the user owns the shares.
      // This is a simplified example.
      updateUser({ virtualCoins: user.virtualCoins + totalCost });
      updatePortfolio(selectedMatch.id, teamId, -shares, currentPrice);
      alert(`Sold ${shares} shares of ${team.shortName} for ₹${totalCost.toLocaleString()}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary mb-2">Trading Center</h2>
        <p className="text-subtle">Buy and sell team stocks based on match predictions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Match Selection */}
        <div className="lg:col-span-2">
          <div className="bg-primary-light rounded-xl border border-gray-800 mb-6">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-secondary">Select Match</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.map((match) => (
                  <button
                    key={match.id}
                    onClick={() => setSelectedMatch(match)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMatch.id === match.id
                        ? 'border-accent bg-accent/10'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
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
                    <div className="flex items-center justify-between text-sm text-subtle">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        match.status === 'live'
                          ? 'bg-red-900 text-red-400'
                          : 'bg-blue-900 text-blue-400'
                      }`}>
                        {match.status === 'live' ? 'LIVE' : 'UPCOMING'}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{match.startTime.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Chart */}
          <div className="bg-primary-light rounded-xl border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-secondary">Price Chart</h3>
            </div>
            <div className="p-6">
              <div className="h-64 mb-4">
                <PriceChart match={selectedMatch} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-900 rounded-lg">
                  <p className="text-sm text-subtle mb-1">{selectedMatch.team1.shortName}</p>
                  <p className="text-2xl font-bold" style={{ color: selectedMatch.team1.color }}>
                    ₹{selectedMatch.currentPrice.team1}
                  </p>
                  <div className="flex items-center justify-center mt-2 text-sm text-green-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +2.5%
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-900 rounded-lg">
                  <p className="text-sm text-subtle mb-1">{selectedMatch.team2.shortName}</p>
                  <p className="text-2xl font-bold" style={{ color: selectedMatch.team2.color }}>
                    ₹{selectedMatch.currentPrice.team2}
                  </p>
                  <div className="flex items-center justify-center mt-2 text-sm text-red-400">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    -2.5%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Panel */}
        <div className="bg-primary-light rounded-xl border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-secondary flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-accent" />
              Place Trade
            </h3>
          </div>
          <div className="p-6">
            {/* Trade Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-subtle mb-2">Trade Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    tradeType === 'buy'
                      ? 'border-green-500 bg-green-500/10 text-green-400'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                  Buy
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    tradeType === 'sell'
                      ? 'border-red-500 bg-red-500/10 text-red-400'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <TrendingDown className="w-5 h-5 mx-auto mb-1" />
                  Sell
                </button>
              </div>
            </div>

            {/* Team Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-subtle mb-2">Select Team</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedTeam('team1')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTeam === 'team1'
                      ? 'border-accent bg-accent/10'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-2xl mb-1 block">{selectedMatch.team1.logo}</span>
                    <p className="text-sm font-medium text-secondary">{selectedMatch.team1.shortName}</p>
                    <p className="text-xs text-subtle">₹{selectedMatch.currentPrice.team1}</p>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedTeam('team2')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTeam === 'team2'
                      ? 'border-accent bg-accent/10'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-2xl mb-1 block">{selectedMatch.team2.logo}</span>
                    <p className="text-sm font-medium text-secondary">{selectedMatch.team2.shortName}</p>
                    <p className="text-xs text-subtle">₹{selectedMatch.currentPrice.team2}</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Shares Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-subtle mb-2">Number of Shares</label>
              <input
                type="number"
                min="1"
                max="100"
                value={shares}
                onChange={(e) => setShares(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-secondary focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>

            {/* Trade Summary */}
            <div className="mb-6 p-4 bg-gray-900 rounded-lg">
              <h4 className="font-medium text-secondary mb-2">Trade Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-subtle">Team:</span>
                  <span className="font-medium text-secondary">{team.shortName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-subtle">Price per share:</span>
                  <span className="font-medium text-secondary">₹{currentPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-subtle">Shares:</span>
                  <span className="font-medium text-secondary">{shares}</span>
                </div>
                <div className="flex justify-between border-t border-gray-800 pt-2">
                  <span className="text-subtle">Total Cost:</span>
                  <span className="font-bold text-lg text-secondary">₹{totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Balance Check */}
            <div className="mb-6 p-4 bg-blue-900/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-blue-400">Available Balance:</span>
                </div>
                <span className="font-bold text-blue-400">₹{user.virtualCoins.toLocaleString()}</span>
              </div>
            </div>

            {/* Place Trade Button */}
            <button
              onClick={handleTrade}
              disabled={totalCost > user.virtualCoins}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                totalCost > user.virtualCoins
                  ? 'bg-gray-800 text-subtle cursor-not-allowed'
                  : tradeType === 'buy'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {totalCost > user.virtualCoins
                ? 'Insufficient Balance'
                : `${tradeType === 'buy' ? 'Buy' : 'Sell'} ${shares} Shares`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};