import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UserProvider } from './context/UserContext.tsx';
import { MatchProvider } from './context/MatchContext.tsx';
import { PortfolioProvider } from './context/PortfolioContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <MatchProvider>
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </MatchProvider>
    </UserProvider>
  </StrictMode>
);
