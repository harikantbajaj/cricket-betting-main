import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useMatches } from '../context/MatchContext';

export const PortfolioSection: React.FC = () => {
  const { portfolios } = usePortfolio();
  const { matches } = useMatches();

  if (portfolios.length === 0) {
    return <p className="text-subtle p-4">You have no shares in your portfolio.</p>;
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mt-8">
      <h3 className="text-lg font-semibold text-secondary mb-4">Your Portfolio</h3>
      <div className="space-y-6">
        {portfolios.map((portfolio) => {
          const match = matches.find(m => m.id === portfolio.matchId);
          if (!match) return null;

          const team1Value = portfolio.team1Shares * match.currentPrice.team1;
          const team2Value = portfolio.team2Shares * match.currentPrice.team2;
          const totalValue = team1Value + team2Value;
          const profitLoss = totalValue - portfolio.totalInvestment;

          return (
            <div key={portfolio.matchId} className="border border-gray-800 rounded-lg p-4">
              <h4 className="text-md font-semibold text-secondary mb-2">
                Match: {match.team1.shortName} vs {match.team2.shortName}
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm text-subtle">
                <div>
                  <p><strong>{match.team1.shortName}</strong></p>
                  <p>Shares: {portfolio.team1Shares}</p>
                  <p>Current Price: ₹{match.currentPrice.team1.toFixed(2)}</p>
                  <p>Value: ₹{team1Value.toFixed(2)}</p>
                </div>
                <div>
                  <p><strong>{match.team2.shortName}</strong></p>
                  <p>Shares: {portfolio.team2Shares}</p>
                  <p>Current Price: ₹{match.currentPrice.team2.toFixed(2)}</p>
                  <p>Value: ₹{team2Value.toFixed(2)}</p>
                </div>
                <div>
                  <p><strong>Total Investment</strong></p>
                  <p>₹{portfolio.totalInvestment.toFixed(2)}</p>
                  <p><strong>Profit/Loss</strong></p>
                  <p className={profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {profitLoss >= 0 ? '+' : ''}₹{profitLoss.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
