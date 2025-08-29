import React, { useEffect, useState, useContext, memo } from "react";
import { PAGE_T } from "../../types";
import PageLooperContext from "../../providers/PageLooperContext";
import PageContentCategorieRegion from "./PageContentCategorieRegion";

const PrixCategorieParRegion: React.FC = memo(() => {
    const { pages, setPages, setCurrentIndex, apiData } = useContext(PageLooperContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (!apiData.length) {
                setLoading(false);
                return;
            }

            // Identifier toutes les catégories présentes
            const categories = Array.from(new Set(apiData.map((p) => p.categorie)));

            const newPages: any[] = [];

            categories.forEach((categorie) => {
                const catData = apiData.filter((p) => p.categorie === categorie);

                // Map par région -> marché -> produit -> dernier prix
                const regionMap = new Map<
                    string,
                    Map<string, { date: string; produits: { [produit: string]: number } }>
                >();

                catData.forEach((p) => {
                    const region = p.region;
                    const marche = p.marche;
                    const produit = p.produit;
                    const date = p.dateCollecte;
                    const prix = parseFloat(p.prix);

                    if (!regionMap.has(region)) regionMap.set(region, new Map());
                    const marcheMap = regionMap.get(region)!;

                    const exist = marcheMap.get(marche);
                    if (!exist || new Date(date) > new Date(exist.date)) {
                        marcheMap.set(marche, { date, produits: { [produit]: prix } });
                    } else if (exist && !exist.produits[produit]) {
                        exist.produits[produit] = prix;
                    }
                });

                // Créer une page pour chaque région
                Array.from(regionMap.entries()).forEach(([region, marcheMap]) => {
                    const allProduits = Array.from(new Set(catData.map((p) => p.produit)));
                    const tableRows = Array.from(marcheMap.entries()).map(([marche, info]) => {
                        const row: any = { marche, date: info.date };
                        allProduits.forEach((prod) => {
                            row[prod] = info.produits[prod] ?? "-";
                        });
                        return row;
                    });

                    // Vérifie si cette page existe déjà
                    const pageId = `cat-${categorie}-${region}`;
                    if (!pages.some((p) => p.id === pageId)) {
                        newPages.push({
                            id: pageId,
                            component: (
                                <PageContentCategorieRegion
                                    categorie={categorie}
                                    region={region}
                                    columns={["marche", "date", ...allProduits]}
                                    data={tableRows}
                                />
                            ),
                            duration: 15000,
                        });
                    }
                });
            });

            if (newPages.length) {
                // Supprimer la page de préchargement du produit
                setPages((prev: PAGE_T[]) => {
                    const filtered = prev.filter(
                        (p) => !(p.id === `PrixCategorieParRegion`)
                    );
                    return [...filtered, ...newPages];
                });
            }
            setLoading(false);
        };

        loadData();
    }, [pages, setPages, setCurrentIndex]);

    return null;
});

export default PrixCategorieParRegion;
