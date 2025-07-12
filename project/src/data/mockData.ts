import { Match, User, Team, Trade, Portfolio, AIPrediction } from '../types';

export const teams: Team[] = [
  {
    id: '1',
    name: 'Delhi Capitals',
    shortName: 'DC',
    logo: '🏏',
    color: '#1e40af'
  },
  {
    id: '2',
    name: 'Lucknow Super Giants',
    shortName: 'LSG',
    logo: '⚡',
    color: '#059669'
  },
  {
    id: '3',
    name: 'Mumbai Indians',
    shortName: 'MI',
    logo: '🔵',
    color: '#1e3a8a'
  },
  {
    id: '4',
    name: 'Royal Challengers Bangalore',
    shortName: 'RCB',
    logo: '🔴',
    color: '#dc2626'
  }
];

export const matches: Match[] = [
  {
    id: '1',
    team1: teams[0],
    team2: teams[1],
    status: 'live',
    startTime: new Date(),
    venue: 'Arun Jaitley Stadium, Delhi',
    currentPrice: {
      team1: 45,
      team2: 55
    },
    priceHistory: [
      { timestamp: new Date(Date.now() - 3600000), team1Price: 50, team2Price: 50 },
      { timestamp: new Date(Date.now() - 1800000), team1Price: 48, team2Price: 52 },
      { timestamp: new Date(Date.now() - 900000), team1Price: 45, team2Price: 55 },
    ],
    score: {
      team1: {
        runs: 0,
        wickets: 0,
        overs: 0
      },
      team2: {
        runs: 0,
        wickets: 0,
        overs: 0
      },
      commentary: "Let's Play!"
    }
  },
  {
    id: '2',
    team1: teams[2],
    team2: teams[3],
    status: 'upcoming',
    startTime: new Date(Date.now() + 86400000),
    venue: 'Wankhede Stadium, Mumbai',
    currentPrice: {
      team1: 52,
      team2: 48
    },
    priceHistory: [
      { timestamp: new Date(Date.now() - 3600000), team1Price: 50, team2Price: 50 },
      { timestamp: new Date(Date.now() - 1800000), team1Price: 51, team2Price: 49 },
      { timestamp: new Date(Date.now() - 900000), team1Price: 52, team2Price: 48 },
    ]
  }
];

export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: '👤',
  virtualCoins: 10000,
  totalProfitLoss: 1250,
  rank: 1
};

export const leaderboard: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: '👩',
    virtualCoins: 12500,
    totalProfitLoss: 1100,
    rank: 2
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    email: 'mike@example.com',
    avatar: '👨',
    virtualCoins: 9800,
    totalProfitLoss: 950,
    rank: 3
  }
];

export const trades: Trade[] = [
  {
    id: '1',
    matchId: '1',
    teamId: '1',
    type: 'buy',
    shares: 10,
    price: 48,
    timestamp: new Date(Date.now() - 1800000),
    status: 'completed'
  },
  {
    id: '2',
    matchId: '1',
    teamId: '2',
    type: 'sell',
    shares: 5,
    price: 52,
    timestamp: new Date(Date.now() - 900000),
    status: 'completed'
  }
];

export const portfolios: Portfolio[] = [
  {
    matchId: '1',
    team1Shares: 10,
    team2Shares: 0,
    totalInvestment: 480,
    currentValue: 450,
    profitLoss: -30
  }
];

export const aiPredictions: AIPrediction[] = [
  {
    matchId: '1',
    team1WinProbability: 42,
    team2WinProbability: 58,
    confidence: 85,
    factors: [
      'Recent form analysis',
      'Head-to-head statistics',
      'Player availability',
      'Weather conditions'
    ],
    lastUpdated: new Date()
  },
  {
    matchId: '2',
    team1WinProbability: 55,
    team2WinProbability: 45,
    confidence: 78,
    factors: [
      'Home advantage',
      'Team composition',
      'Recent performance',
      'Pitch conditions'
    ],
    lastUpdated: new Date()
  }
];