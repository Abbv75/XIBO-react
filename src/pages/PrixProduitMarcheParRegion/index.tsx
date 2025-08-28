import React, { useEffect, useContext, memo } from "react";
import { GET_ALL_VALIDATION_T, PAGE_T } from "../../types";
import PageLooperContext from "../../providers/PageLooperContext";
import PageContentProduitRegion from "./PageContentProduitRegion";

// Définir une interface pour le nouveau format de données
interface MarcheCollectes {
    marche: string;
    collectes: GET_ALL_VALIDATION_T[];
}

const PrixProduitMarcheParRegion: React.FC<{ produit: string }> = memo(({ produit }) => {
    const { setPages, pages, apiData } = useContext(PageLooperContext);

    useEffect(() => {
        const loadData = async () => {
            const alreadyExists = pages.some((p) => p.id.startsWith(`prix-${produit}-`));
            if (alreadyExists) return;

            // Filtrer toutes les données pour le produit spécifié
            const res = apiData.filter((p) => p.produit === produit);

            // Regrouper toutes les collectes par marché
            const marcheMap = new Map<string, GET_ALL_VALIDATION_T[]>();
            res.forEach((p) => {
                const collectes = marcheMap.get(p.marche) || [];
                collectes.push(p);
                marcheMap.set(p.marche, collectes);
            });

            // Convertir le Map en un tableau structuré pour le composant enfant
            const collectesParMarche: MarcheCollectes[] = Array.from(marcheMap.entries()).map(([marche, collectes]) => ({
                marche,
                collectes,
            }));

            // Récupérer toutes les régions distinctes pour ce produit
            // En se basant sur la première collecte de chaque groupe pour déterminer la région
            const regions = Array.from(new Set(collectesParMarche.map((p) => p.collectes[0].region)));

            // Créer toutes les pages dynamiques en passant les données regroupées
            const newPages = regions.map((region) => {
                const dataParRegion = collectesParMarche.filter((p) => p.collectes[0].region === region);
                return {
                    id: `prix-${produit}-${region}`,
                    component: (
                        <PageContentProduitRegion
                            produit={produit}
                            region={region}
                            data={dataParRegion}
                        />
                    ),
                    duration: 15000,
                };
            });

            // Mettre à jour les pages en retirant la page de préchargement
            setPages((prev: PAGE_T[]) => {
                const filtered = prev.filter(
                    (p) => !(p.id === `PrixProduitMarcheParRegion ${produit}`)
                );
                return [...filtered, ...newPages];
            });
        };

        loadData();
    }, [produit, setPages, apiData, pages]);

    return null;
});

export default PrixProduitMarcheParRegion;