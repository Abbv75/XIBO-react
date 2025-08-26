import { Routes, Route } from "react-router-dom";
import PrixProduitMarcheParRegion from "../pages/PrixProduitMarcheParRegion";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/PrixProduitMarcheParRegion/:produit"
        element={<PrixProduitMarcheParRegion />}
      />
    </Routes>
  );
};

export default Router;
