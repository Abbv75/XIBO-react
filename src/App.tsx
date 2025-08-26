import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Routes';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;