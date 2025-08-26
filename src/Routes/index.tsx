import { Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Accueil</h1>} />
      <Route path="/page1" element={<h1>Page 1</h1>} />
      <Route path="/page2" element={<h1>Page 2</h1>} />
      <Route path="/page3" element={<h1>Page 3</h1>} />
    </Routes>
  );
};

export default Router;
