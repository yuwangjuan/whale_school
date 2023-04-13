/*
 * @Description: 
 * @Author: ywj
 * @Date: 2023-04-12 19:46:15
 */
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './router/index';
import './App.css';

const App: React.FC = () => {
  const element = useRoutes(routes);
  return (
    <div>
      { element }
    </div>
  );
}

export default App;
