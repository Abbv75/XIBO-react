import React, { useContext, useEffect, useState } from "react";
import { Typography, Grid, Stack } from "@mui/joy";
import TableCustom from "../../components/TableCustome";
import getAllValidation from "../../service/prixMarche/getAllValidation";
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
import getPrixMoyenProduitParRegion from "../../utils/getPrixMoyenProduitParRegion";
import { green, grey } from "@mui/material/colors";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ProduitMoyenne {
    region: string;
    moyenne: number;
    min: number;
    max: number;
    nbMarches: number;
}

const PrixMoyenProduitParRegion: React.FC<{ produit: string }> = ({ produit }) => {
    const { cacheMoyennes, apiData } = useContext(PageLooperContext);

    const [loading, setLoading] = useState(true);
    const [moyennes, setMoyennes] = useState<ProduitMoyenne[]>([]);

    const loadData = async () => {
        const res = apiData.filter((p) => p.produit === produit);

        const moyennesParRegion = getPrixMoyenProduitParRegion(res);

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
        <Stack sx={{ gap: 3, p: 3, height: "100%", }}>
            <Typography
                level="h4"
                fontSize={"2vw"}
                textColor={grey[700]}
                fontWeight={300}
            >
                Prix moyen de
                {` `}<Typography
                    fontWeight={700}
                    textColor={green[900]}
                >{produit}</Typography> {` `}
                par région
            </Typography>

            <Grid container spacing={5} height={'100%'} alignItems="center" >
                <Grid xs={12} md={7}>
                    <TableCustom
                        columns={[
                            { label: "Région", key: "region" },
                            { label: "Minimum", key: "minimum" },
                            { label: "Maximum", key: "maximum" },
                            { label: "Moyen", key: "moyenne" },
                            { label: "Nbr marché", key: "nbMarches" },
                        ]}
                        data={moyennes.map((m) => ({
                            region: m.region,
                            moyenne: `${m.moyenne.toFixed(2)} FCFA`,
                            minimum: `${m.min.toFixed(2)} FCFA`,
                            maximum: `${m.max.toFixed(2)} FCFA`,
                            nbMarches: m.nbMarches,
                        }))}
                    />
                </Grid>

                <Grid xs={12} md={5}>
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
        </Stack>
    );
};

export default PrixMoyenProduitParRegion;
