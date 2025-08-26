import React from "react";
import PageLooper from "./components/PageLooper";

// App ne gère plus de router, PageLooper devient le "navigateur interne"
const App: React.FC = () => {
  return <PageLooper />;
};

export default App;
