import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Portfolio } from '../types';

interface PortfolioContextType {
  portfolios: Portfolio[];
  updatePortfolio: (matchId: string, teamId: string, shares: number, price: number) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  const updatePortfolio = (matchId: string, teamId: string, shares: number, price: number) => {
    setPortfolios(prevPortfolios => {
      const existingPortfolioIndex = prevPortfolios.findIndex(p => p.matchId === matchId);
      const cost = shares * price;

      if (existingPortfolioIndex > -1) {
        // Update existing portfolio
        const updatedPortfolios = [...prevPortfolios];
        const portfolioToUpdate = { ...updatedPortfolios[existingPortfolioIndex] };

        if (teamId === '1') {
          portfolioToUpdate.team1Shares += shares;
        } else {
          portfolioToUpdate.team2Shares += shares;
        }
        
        portfolioToUpdate.totalInvestment += cost;
        updatedPortfolios[existingPortfolioIndex] = portfolioToUpdate;
        return updatedPortfolios;
      } else {
        // Create new portfolio
        const newPortfolio: Portfolio = {
          matchId,
          team1Shares: teamId === '1' ? shares : 0,
          team2Shares: teamId === '2' ? shares : 0,
          totalInvestment: cost,
          currentValue: cost, // Initial value is the investment
          profitLoss: 0,
        };
        return [...prevPortfolios, newPortfolio];
      }
    });
  };

  return (
    <PortfolioContext.Provider value={{ portfolios, updatePortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};