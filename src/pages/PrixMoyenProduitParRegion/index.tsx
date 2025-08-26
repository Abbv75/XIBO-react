import React, { useContext, useEffect, useState } from "react";
import { Sheet, Typography, Grid } from "@mui/joy";
import TableCustom from "../../components/TableCustome";
import getAllValidation from "../../service/prixMarche/getAllValidation";
import { GET_ALL_VALIDATION_T } from "../../types";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import PageLooperContext from "../../providers/PageLooperContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ProduitMoyenne {
    region: string;
    moyenne: number;
}

const PrixMoyenProduitParRegion: React.FC<{ produit: string }> = ({ produit }) => {
    const { cacheMoyennes } = useContext(PageLooperContext);

    const [loading, setLoading] = useState(true);
    const [moyennes, setMoyennes] = useState<ProduitMoyenne[]>([]);

    const loadData = async () => {
        const data = (await getAllValidation()) || [];
        const res = data.filter((p) => p.produit === produit);

        // Dernier prix par marché
        const marcheMap = new Map<string, GET_ALL_VALIDATION_T>();
        res.forEach((p) => {
            const exist = marcheMap.get(p.marche);
            if (!exist || new Date(p.dateCollecte) > new Date(exist.dateCollecte)) {
                marcheMap.set(p.marche, p);
            }
        });

        const dernierPrixParMarche = Array.from(marcheMap.values());

        // Moyenne par région
        const regionMap = new Map<string, { somme: number; count: number }>();
        dernierPrixParMarche.forEach((p) => {
            const prix = parseFloat(p.prix);
            if (!regionMap.has(p.region)) regionMap.set(p.region, { somme: 0, count: 0 });
            const entry = regionMap.get(p.region)!;
            entry.somme += prix;
            entry.count += 1;
        });

        const moyennesParRegion: ProduitMoyenne[] = Array.from(regionMap.entries()).map(
            ([region, { somme, count }]) => ({
                region,
                moyenne: count ? somme / count : 0,
            })
        );

        setMoyennes(moyennesParRegion);
        setLoading(false);

        cacheMoyennes[produit] = moyennesParRegion;
    };

    useEffect(() => {
        if (cacheMoyennes[produit]) {
            setMoyennes(cacheMoyennes[produit]);
            setLoading(false);
            return;
        }

        loadData();
    }, [produit, cacheMoyennes]);

    if (loading) {
        return (
            <Typography fontSize="2vw" textAlign="center" sx={{ mt: 10 }}>
                Chargement du prix moyen pour "{produit}"...
            </Typography>
        );
    }

    return (
        <Sheet sx={{ p: 3, height: "90vh", gap: 3 }}>
            <Typography level="h4" fontSize="2vw">
                Prix moyen de {produit} par région
            </Typography>

            <Grid container spacing={5} alignItems="center">
                <Grid xs={12} md={6}>
                    <TableCustom
                        columns={[
                            { label: "Région", key: "region" },
                            { label: "Prix moyen", key: "moyenne" },
                        ]}
                        data={moyennes.map((m) => ({
                            region: m.region,
                            moyenne: m.moyenne.toFixed(2),
                        }))}
                    />
                </Grid>

                <Grid xs={12} md={6}>
                    <Bar
                        data={{
                            labels: moyennes.map((m) => m.region),
                            datasets: [
                                {
                                    label: `Prix moyen de ${produit}`,
                                    data: moyennes.map((m) => m.moyenne),
                                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            plugins: { legend: { display: false } },
                            scales: { y: { beginAtZero: true } },
                        }}
                    />
                </Grid>
            </Grid>
        </Sheet>
    );
};

export default PrixMoyenProduitParRegion;
