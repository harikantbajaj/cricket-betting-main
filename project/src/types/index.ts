export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color: string;
}

export interface LiveScore {
  team1: {
    runs: number;
    wickets: number;
    overs: number;
  };
  team2: {
    runs: number;
    wickets: number;
    overs: number;
  };
  commentary: string;
}

export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  status: 'upcoming' | 'live' | 'completed';
  startTime: Date;
  venue: string;
  currentPrice: {
    team1: number;
    team2: number;
  };
  priceHistory: Array<{
    timestamp: Date;
    team1Price: number;
    team2Price: number;
  }>;
  score?: LiveScore;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  virtualCoins: number;
  totalProfitLoss: number;
  rank: number;
}

export interface Trade {
  id: string;
  matchId: string;
  teamId: string;
  type: 'buy' | 'sell';
  shares: number;
  price: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Portfolio {
  matchId: string;
  team1Shares: number;
  team2Shares: number;
  totalInvestment: number;
  currentValue: number;
  profitLoss: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface AIPrediction {
  matchId: string;
  team1WinProbability: number;
  team2WinProbability: number;
  confidence: number;
  factors: string[];
  lastUpdated: Date;
}