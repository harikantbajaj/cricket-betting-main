import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Match } from '../types';
import { matches as initialMatches } from '../data/mockData';

interface MatchContextType {
  matches: Match[];
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>(initialMatches);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatches(prevMatches => {
        return prevMatches.map(match => {
          if (match.status === 'live') {
            const score = match.score!;
            let currentInnings = score.team1.overs < 20 ? 'team1' : 'team2';
            let currentScore = currentInnings === 'team1' ? score.team1 : score.team2;

            if (currentScore.overs < 20) {
              const possibleRuns = [0, 1, 2, 4, 6];
              const runs = possibleRuns[Math.floor(Math.random() * possibleRuns.length)];
              const isWicket = Math.random() < 0.05 && currentScore.wickets < 10;

              currentScore.runs += runs;
              
              if (currentScore.runs > 400) {
                currentScore.runs = 400;
              }

              if (isWicket) {
                currentScore.wickets += 1;
                score.commentary = `Wicket!!`;
                if (runs > 0) {
                    score.commentary += ` and ${runs} run${runs !== 1 ? 's' : ''}`;
                }
                match.currentPrice[currentInnings as keyof typeof match.currentPrice] = Math.max(1, match.currentPrice[currentInnings as keyof typeof match.currentPrice] - 5);
              } else {
                score.commentary = `${runs} run${runs !== 1 ? 's' : ''}`;
              }

              // Increment balls and overs properly
              let overs = Math.floor(currentScore.overs);
              let balls = Math.round((currentScore.overs - overs) * 10);

              balls += 1;
              if (balls === 6) {
                overs += 1;
                balls = 0;
              }
              currentScore.overs = overs + balls / 10;

              // Check if 10 wickets are done, switch innings
              if (currentScore.wickets === 10 || currentScore.overs >= 20) {
                if (currentInnings === 'team1') {
                  currentInnings = 'team2';
                  // Reset team2 runs, wickets, overs and balls to start innings
                  score.team2.runs = 0;
                  score.team2.wickets = 0;
                  score.team2.overs = 0;
                  score.commentary = 'Innings switched to Team 2';
                } else {
                  // Match ended, finalize stock prices based on result
                  score.commentary = 'Match ended, finalizing stock prices';

                  // Determine winner and loser
                  let winner: keyof typeof match.currentPrice;
                  let loser: keyof typeof match.currentPrice;
                  if (score.team1.runs > score.team2.runs) {
                    winner = 'team1';
                    loser = 'team2';
                  } else if (score.team2.runs > score.team1.runs) {
                    winner = 'team2';
                    loser = 'team1';
                  } else {
                    // Tie case: both get equal prices
                    winner = 'team1';
                    loser = 'team2';
                  }

                  // Set final prices
                  match.currentPrice[winner] = 92; // high price for winner
                  match.currentPrice[loser] = 6;   // low price for loser

                  // Update price history with final prices
                  match.priceHistory.push({
                    timestamp: new Date(),
                    team1Price: match.currentPrice.team1,
                    team2Price: match.currentPrice.team2,
                  });

                  // Reset match state for next match
                  score.team1.runs = 0;
                  score.team1.wickets = 0;
                  score.team1.overs = 0;
                  score.team2.runs = 0;
                  score.team2.wickets = 0;
                  score.team2.overs = 0;

                  // Set match status to live to restart
                  match.status = 'live';
                }
              }
            } else if (currentInnings === 'team1' && score.team2.overs === 0) {
              // Start team2's innings
              currentInnings = 'team2';
            }

              // Enhanced dynamic stock price update based on multiple factors
              const battingTeam = currentInnings as keyof typeof match.currentPrice;
              const bowlingTeam = battingTeam === 'team1' ? 'team2' : 'team1';

              // Calculate run rate
              const overs = currentScore.overs;
              const runs = currentScore.runs;
              const wickets = currentScore.wickets;
              const runRate = overs > 0 ? runs / overs : 0;

              // Base price starts at 50
              let battingTeamPrice = 50;
              let bowlingTeamPrice = 50;

              // Increase price for boundaries
              if (runs > 0) {
                // Simulate boundary detection from last runs scored (runs variable from earlier)
                // Since runs is random, we can use it directly here
                if (runs === 4) {
                  battingTeamPrice += 5;
                  bowlingTeamPrice -= 5;
                } else if (runs === 6) {
                  battingTeamPrice += 7;
                  bowlingTeamPrice -= 7;
                }
              }

              // Increase price for high run rate
              if (runRate >= 10) {
                battingTeamPrice += 10;
                bowlingTeamPrice -= 10;
              } else if (runRate >= 7) {
                battingTeamPrice += 5;
                bowlingTeamPrice -= 5;
              }

              // Decrease price for wickets lost
              battingTeamPrice -= wickets * 2;
              bowlingTeamPrice += wickets * 2;

              // Clamp prices between 1 and 97
              battingTeamPrice = Math.min(97, Math.max(1, battingTeamPrice));
              bowlingTeamPrice = Math.min(97, Math.max(1, bowlingTeamPrice));

              // Normalize prices to sum to 98
              const total = battingTeamPrice + bowlingTeamPrice;
              battingTeamPrice = (battingTeamPrice / total) * 98;
              bowlingTeamPrice = (bowlingTeamPrice / total) * 98;

              match.currentPrice[battingTeam] = parseFloat(battingTeamPrice.toFixed(2));
              match.currentPrice[bowlingTeam] = parseFloat(bowlingTeamPrice.toFixed(2));

              match.priceHistory.push({
                timestamp: new Date(),
                team1Price: match.currentPrice.team1,
                team2Price: match.currentPrice.team2,
              });
          }
          return match;
        });
      });
    }, 1500); // Update every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <MatchContext.Provider value={{ matches }}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatches = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatches must be used within a MatchProvider');
  }
  return context;
};