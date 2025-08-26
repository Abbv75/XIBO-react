import React from "react";
import { BrowserRouter } from "react-router-dom";
import PageLooper from "./components/PageLooper";
import Router from "./Routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router />
      <PageLooper />
    </BrowserRouter>
  );
};

export default App;
