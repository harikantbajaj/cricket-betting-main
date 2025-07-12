import React, { useState } from 'react';
import { Send, Bot, User, MessageCircle, TrendingUp, IndianRupee, Target } from 'lucide-react';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm your AI trading assistant. I can help you with match analysis, trading strategies, and answer questions about the platform. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      text: "What's the best strategy for the Delhi vs Lucknow match?",
      sender: 'user',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      text: "Based on current analysis, here's my recommendation for the Delhi vs Lucknow match:\n\n🏏 **Match Analysis:**\n- Delhi Capitals are currently priced at ₹45\n- Lucknow Super Giants at ₹55\n\n📊 **Key Factors:**\n- LSG has better recent form (3 wins in last 5)\n- Delhi has home advantage\n- Weather conditions favor batting\n\n💡 **Strategy Suggestion:**\nConsider a balanced approach - buy LSG stocks if the price drops below ₹50, or wait for Delhi to show momentum in the first few overs.\n\n⚠️ **Risk Management:**\nDon't invest more than 20% of your portfolio in a single match.",
      sender: 'ai',
      timestamp: new Date(Date.now() - 180000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const quickQuestions = [
    "What's the current market sentiment?",
    "How do I minimize risk?",
    "Best time to buy stocks?",
    "Explain the pricing algorithm"
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(newMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('sentiment') || lowerQuestion.includes('market')) {
      return "📈 **Current Market Sentiment:**\n\nThe market is showing mixed signals today:\n- 60% of trades are bullish on LSG\n- Delhi stocks have high volatility\n- Overall trading volume is up 25%\n\n**Trending Teams:**\n🟢 Lucknow Super Giants (+12%)\n🔴 Delhi Capitals (-5%)\n\nConsider this data when making your next trade!";
    }
    
    if (lowerQuestion.includes('risk') || lowerQuestion.includes('minimize')) {
      return "🛡️ **Risk Management Tips:**\n\n1. **Diversify:** Don't put all funds in one match\n2. **Set Limits:** Never risk more than 10% per trade\n3. **Stop Loss:** Sell if losses exceed 15%\n4. **Time Management:** Trade closer to match start for better info\n5. **Follow AI:** Our predictions have 95% accuracy\n\n**Golden Rule:** Only invest what you can afford to lose!";
    }
    
    if (lowerQuestion.includes('buy') || lowerQuestion.includes('time')) {
      return "⏰ **Best Trading Times:**\n\n**30-60 minutes before match:**\n- Prices stabilize\n- Team news is final\n- Best for informed decisions\n\n**During toss:**\n- High volatility period\n- Quick profits possible\n- Higher risk\n\n**First 6 overs:**\n- Momentum-based trading\n- React to early performance\n\n**Tip:** Use our AI predictions to time your entry perfectly!";
    }
    
    if (lowerQuestion.includes('algorithm') || lowerQuestion.includes('pricing')) {
      return "🔬 **Pricing Algorithm Explained:**\n\nOur dynamic pricing uses:\n\n**Real-time Factors:**\n- Live betting volumes\n- Team performance metrics\n- Weather conditions\n- Player availability\n\n**Historical Data:**\n- Head-to-head records\n- Venue statistics\n- Recent form analysis\n\n**Market Psychology:**\n- Trader sentiment\n- Social media buzz\n- News impact\n\n**Formula:** Price = Base Probability + Market Sentiment + Live Adjustments\n\nPrices update every 30 seconds during live matches!";
    }
    
    return "I understand you're asking about trading strategies. Here are some general tips:\n\n• Always do your research before trading\n• Start with smaller amounts to learn\n• Use our AI predictions as guidance\n• Monitor live match events closely\n• Set clear profit/loss targets\n\nFeel free to ask more specific questions about any aspect of trading!";
  };

  const handleQuickQuestion = (question: string) => {
    setNewMessage(question);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary mb-2 flex items-center">
          <MessageCircle className="w-8 h-8 mr-3 text-accent" />
          AI Trading Assistant
        </h2>
        <p className="text-subtle">Get personalized trading advice and match insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-primary-light rounded-xl border border-gray-800 h-96 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-accent text-white'
                        : 'bg-gray-800 text-secondary'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.sender === 'ai' ? (
                        <Bot className="w-4 h-4 text-accent" />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                      <span className="text-xs opacity-75">
                        {message.sender === 'ai' ? 'AI Assistant' : 'You'}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-800 p-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about trading strategies, match analysis, or platform features..."
                  className="flex-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-secondary focus:ring-2 focus:ring-accent focus:border-accent"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Tips */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <div className="bg-primary-light rounded-xl border border-gray-800">
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-semibold text-secondary">Quick Questions</h3>
            </div>
            <div className="p-4 space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left px-3 py-2 text-sm text-subtle hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* AI Features */}
          <div className="bg-primary-light rounded-xl border border-gray-800">
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-semibold text-secondary">AI Capabilities</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-secondary">Market Analysis</h4>
                  <p className="text-xs text-subtle">Real-time insights and trends</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center">
                  <IndianRupee className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-secondary">Risk Management</h4>
                  <p className="text-xs text-subtle">Personalized risk strategies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-secondary">Trade Optimization</h4>
                  <p className="text-xs text-subtle">Timing and portfolio advice</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Status */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-secondary">AI Status: Online</span>
            </div>
            <p className="text-xs text-subtle">
              Response time: ~1 second<br />
              Accuracy: 95%<br />
              Last updated: Just now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};