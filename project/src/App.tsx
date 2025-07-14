import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Trading } from './components/Trading';
import { Leaderboard } from './components/Leaderboard';
import { AIPredictions } from './components/AIPredictions';
import { AIChat } from './components/AIChat';
import { Auth } from './components/Auth';
import { Payment } from './components/Payment';
import { PortfolioPage } from './components/PortfolioPage';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'trading':
        return <Trading />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'predictions':
        return <AIPredictions />;
      case 'chat':
        return <AIChat />;
      case 'portfolio':
        return <PortfolioPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-primary font-sans">
      <Header isLoggedIn={isLoggedIn} onLoginClick={() => setShowAuth(true)} onAddFundsClick={() => setShowPayment(true)} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {renderContent()}
      </main>
      {showAuth && <Auth onClose={() => setShowAuth(false)} onLogin={() => {
        setIsLoggedIn(true);
        setShowAuth(false);
      }} />}
      {showPayment && <Payment onClose={() => setShowPayment(false)} />}
    </div>
  );
}

export default App;