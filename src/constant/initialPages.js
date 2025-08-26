import PrixCategorieParRegion from "../pages/PrixCategorieParRegion";
import PrixMoyenProduitParRegion from "../pages/PrixMoyenProduitParRegion";
import PrixProduitMarcheParRegion from "../pages/PrixProduitMarcheParRegion";

export default [
    {
        id: "PrixProduitMarcheParRegion Oignon bulbe",
        component: <PrixProduitMarcheParRegion produit="Oignon bulbe" />,
        duration: 10000,
    },
    {
        id: "PrixProduitMarcheParRegion Oignon Local",
        component: <PrixProduitMarcheParRegion produit="Oignon Local" />,
        duration: 10000,
    },
    {
        id: "PrixMoyenProduitParRegion Oignon bulbe",
        component: <PrixMoyenProduitParRegion produit="Oignon bulbe" />,
        duration: 10000,
    },
    {
        id: "PrixMoyenProduitParRegion Oignon Local",
        component: <PrixMoyenProduitParRegion produit="Oignon Local" />,
        duration: 10000,
    },
    {
        id: "PrixCategorieParRegion",
        component: <PrixCategorieParRegion />,
        duration: 10000,
    },
];