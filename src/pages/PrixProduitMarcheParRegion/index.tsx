import React, { useEffect, useState, useContext, memo } from "react";
import getAllValidation from "../../service/prixMarche/getAllValidation";
import { GET_ALL_VALIDATION_T, PAGE_T } from "../../types";
import PageLooperContext from "../../providers/PageLooperContext";
import PageContentProduitRegion from "./PageContentProduitRegion";
import { Typography } from "@mui/joy";

const PrixProduitMarcheParRegion: React.FC<{ produit: string }> = memo(({ produit }) => {
    const { setPages, pages,setCurrentIndex } = useContext(PageLooperContext); // pour ajouter dynamiquement des pages
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const alreadyExists = pages.some((p) => p.id.startsWith(`prix-${produit}-`));
            if (alreadyExists) {
                setLoading(false);
                return;
            }

            let data = (await getAllValidation()) || [];
            const res = data.filter((p) => p.produit === produit);

            // Créer un map pour le dernier prix par marché + précédent
            const marcheMap = new Map<
                string,
                { dernier: GET_ALL_VALIDATION_T; precedent?: GET_ALL_VALIDATION_T }
            >();

            res.forEach((p) => {
                const date = new Date(p.dateCollecte);
                const exist = marcheMap.get(p.marche);
                if (!exist) {
                    marcheMap.set(p.marche, { dernier: p });
                } else {
                    const dernierDate = new Date(exist.dernier.dateCollecte);
                    if (date > dernierDate) {
                        marcheMap.set(p.marche, { dernier: p, precedent: exist.dernier });
                    }
                }
            });

            const dernierPrixParMarche = Array.from(marcheMap.values()).map((v) => ({
                ...v.dernier,
                precedent: v.precedent,
            }));

            // Récupérer toutes les régions distinctes pour ce produit
            const regions = Array.from(new Set(dernierPrixParMarche.map((p) => p.region)))
                .filter((region) => dernierPrixParMarche.some((p) => p.region === region));

            // Créer toutes les pages dynamiques **avant de lancer le PageLooper**
            const newPages = regions.map((region) => ({
                id: `prix-${produit}-${region}`,
                component: (
                    <PageContentProduitRegion
                        produit={produit}
                        region={region}
                        data={dernierPrixParMarche.filter((p) => p.region === region)}
                    />
                ),
                duration: 15000,
            }));

            // Supprimer la page de préchargement du produit
            setPages((prev: PAGE_T[]) => {
                const filtered = prev.filter(
                    (p) => !(p.id === `PrixProduitMarcheParRegion ${produit}`)
                );
                return [...filtered, ...newPages];
            });

            setLoading(false);
            // setCurrentIndex(0)
        };

        loadData();
    }, [produit, setPages]);

    if (loading) {
        return (
            <Typography fontSize={"2vw"} textAlign="center" sx={{ mt: 10 }}>
                Chargement des pages pour "{produit}"...
            </Typography>
        );
    }

    return null; // Ce composant ne rend rien, il sert à créer les pages dynamiquement
});

export default PrixProduitMarcheParRegion;