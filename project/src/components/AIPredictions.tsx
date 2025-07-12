import React from 'react';
import { Brain, TrendingUp, TrendingDown, Target, Zap, AlertCircle } from 'lucide-react';
import { aiPredictions } from '../data/mockData';
import { useMatches } from '../context/MatchContext';

export const AIPredictions: React.FC = () => {
  const { matches } = useMatches();
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400 bg-green-900/50';
    if (confidence >= 60) return 'text-yellow-400 bg-yellow-900/50';
    return 'text-red-400 bg-red-900/50';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 80) return <Target className="w-4 h-4" />;
    if (confidence >= 60) return <Zap className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary mb-2 flex items-center">
          <Brain className="w-8 h-8 mr-3 text-purple-400" />
          AI Predictions
        </h2>
        <p className="text-subtle">Advanced machine learning predictions for match outcomes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aiPredictions.map((prediction) => {
          const match = matches.find(m => m.id === prediction.matchId);
          if (!match) return null;

          return (
            <div key={prediction.matchId} className="bg-primary-light rounded-xl border border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-800 to-pink-800 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary">AI Analysis</h3>
                      <p className="text-sm text-subtle">
                        Updated {prediction.lastUpdated.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getConfidenceColor(prediction.confidence)}`}>
                    {getConfidenceIcon(prediction.confidence)}
                    <span className="text-sm font-medium">{prediction.confidence}% Confidence</span>
                  </div>
                </div>

                {/* Match Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{match.team1.logo}</span>
                    <div>
                      <p className="font-medium text-secondary">{match.team1.shortName}</p>
                      <p className="text-sm text-subtle">Current: ₹{match.currentPrice.team1}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium text-subtle">VS</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-medium text-secondary">{match.team2.shortName}</p>
                      <p className="text-sm text-subtle">Current: ₹{match.currentPrice.team2}</p>
                    </div>
                    <span className="text-3xl">{match.team2.logo}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Win Probability */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-subtle mb-3">Win Probability</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{match.team1.logo}</span>
                        <span className="font-medium text-secondary">{match.team1.shortName}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${prediction.team1WinProbability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-secondary w-12 text-right">
                          {prediction.team1WinProbability}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{match.team2.logo}</span>
                        <span className="font-medium text-secondary">{match.team2.shortName}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${prediction.team2WinProbability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-secondary w-12 text-right">
                          {prediction.team2WinProbability}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Factors */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-subtle mb-3">Key Analysis Factors</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {prediction.factors.map((factor, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-subtle">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-secondary mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2 text-purple-400" />
                    AI Recommendation
                  </h4>
                  <p className="text-sm text-subtle mb-3">
                    Based on our analysis, {prediction.team2WinProbability > prediction.team1WinProbability ? match.team2.shortName : match.team1.shortName} has a higher probability of winning this match.
                  </p>
                  <div className="flex items-center space-x-2">
                    {prediction.team2WinProbability > prediction.team1WinProbability ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-sm font-medium text-secondary">
                      Consider buying {prediction.team2WinProbability > prediction.team1WinProbability ? match.team2.shortName : match.team1.shortName} stocks
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Model Info */}
      <div className="mt-8 bg-primary-light rounded-xl border border-gray-800">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-secondary mb-4 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-purple-400" />
            About Our AI Model
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="font-medium text-secondary mb-2">95% Accuracy</h4>
              <p className="text-sm text-subtle">Trained on 10,000+ historical matches</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="font-medium text-secondary mb-2">Real-time Updates</h4>
              <p className="text-sm text-subtle">Predictions updated every 5 minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="font-medium text-secondary mb-2">Deep Learning</h4>
              <p className="text-sm text-subtle">Advanced neural network analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};