import React from 'react';
import { Match } from '../types';

interface PriceChartProps {
  match: Match;
}

export const PriceChart: React.FC<PriceChartProps> = ({ match }) => {
  const maxPrice = Math.max(...match.priceHistory.map(p => Math.max(p.team1Price, p.team2Price)));
  const minPrice = Math.min(...match.priceHistory.map(p => Math.min(p.team1Price, p.team2Price)));
  const priceRange = maxPrice - minPrice;

  const getYPosition = (price: number) => {
    return ((maxPrice - price) / priceRange) * 100;
  };

  const team1Points = match.priceHistory.map((point, index) => {
    const x = (index / (match.priceHistory.length - 1)) * 100;
    const y = getYPosition(point.team1Price);
    return `${x},${y}`;
  }).join(' ');

  const team2Points = match.priceHistory.map((point, index) => {
    const x = (index / (match.priceHistory.length - 1)) * 100;
    const y = getYPosition(point.team2Price);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-full w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        
        {/* Team 1 line */}
        <polyline
          points={team1Points}
          fill="none"
          stroke={match.team1.color}
          strokeWidth="2"
        />
        
        {/* Team 2 line */}
        <polyline
          points={team2Points}
          fill="none"
          stroke={match.team2.color}
          strokeWidth="2"
        />
        
        {/* Current price indicators */}
        <circle
          cx="100"
          cy={getYPosition(match.currentPrice.team1)}
          r="2"
          fill={match.team1.color}
        />
        <circle
          cx="100"
          cy={getYPosition(match.currentPrice.team2)}
          r="2"
          fill={match.team2.color}
        />
      </svg>
      
      <div className="flex justify-between items-center mt-2 text-xs">
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: match.team1.color }}></div>
          <span className="text-gray-600">{match.team1.shortName}</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: match.team2.color }}></div>
          <span className="text-gray-600">{match.team2.shortName}</span>
        </div>
      </div>
    </div>
  );
};