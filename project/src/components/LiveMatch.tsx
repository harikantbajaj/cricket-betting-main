import React from 'react';
import { Match } from '../types';
import { RadioTower } from 'lucide-react';

interface LiveMatchProps {
  match: Match;
}

export const LiveMatch: React.FC<LiveMatchProps> = ({ match }) => {
  if (!match.score) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-800 to-orange-800 text-white p-4 rounded-xl shadow-lg border border-red-700">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <RadioTower className="w-5 h-5 animate-pulse" />
          <h3 className="font-bold text-lg">Live Match</h3>
        </div>
        <span className="text-sm font-semibold">{match.venue}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm">{match.team1.name}</p>
          <p className="text-2xl font-bold">{match.score.team1.runs}/{match.score.team1.wickets}</p>
          <p className="text-xs">({match.score.team1.overs.toFixed(1)} overs)</p>
        </div>
        <div>
          <p className="text-sm">{match.team2.name}</p>
          <p className="text-2xl font-bold">{match.score.team2.runs}/{match.score.team2.wickets}</p>
          <p className="text-xs">({match.score.team2.overs.toFixed(1)} overs)</p>
        </div>
      </div>
      <div className="text-center mt-2 text-sm italic">
        {match.score.commentary}
      </div>
    </div>
  );
};