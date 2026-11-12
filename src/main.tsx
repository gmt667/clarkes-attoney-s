import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { ThemeProvider } from './components/theme-provider';
import './styles/site.css';
import './styles/enhancements.css';
import './styles/migration.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode><ThemeProvider><BrowserRouter><AppRoutes /></BrowserRouter></ThemeProvider></StrictMode>,
);
