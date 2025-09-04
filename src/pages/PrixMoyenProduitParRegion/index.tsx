import React, { useContext, useEffect, useMemo, useState } from "react";
import { Typography, Grid, Stack, Divider, List } from "@mui/joy";
import TableCustom from "../../components/TableCustome";
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
import { CardMedia } from "@mui/material";
import getProduitImageUrl from "../../utils/getProduitImageUrl";

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
    const [moyenneMin, setmoyenneMin] = useState<ProduitMoyenne>();
    const [moyenneMax, setmoyenneMax] = useState<ProduitMoyenne>();

    const loadData = async () => {
        const res = apiData.filter((p) => p.produit === produit);

        const moyennesParRegion = getPrixMoyenProduitParRegion(res);

        setMoyennes(moyennesParRegion);
        setLoading(false);

        cacheMoyennes[produit] = moyennesParRegion;
    };

    const codeProduit = useMemo(() => (apiData.find((p) => p.produit === produit)?.codeProduit), [apiData, produit])

    useEffect(() => {
        if (cacheMoyennes[produit]) {
            setMoyennes(cacheMoyennes[produit]);
            setLoading(false);
            return;
        }

        loadData();
    }, [produit, cacheMoyennes]);

    useEffect(() => {
        if (moyennes.length) {
            setmoyenneMin(moyennes.reduce((prev, curr) => (prev.moyenne < curr.moyenne ? prev : curr)));
            setmoyenneMax(moyennes.reduce((prev, curr) => (prev.moyenne > curr.moyenne ? prev : curr)));
        }
    }, [moyennes]);

    if (loading) {
        return (
            <Typography fontSize="2vw" textAlign="center" sx={{ mt: 10 }}>
                Chargement du prix moyen pour "{produit}"...
            </Typography>
        );
    }

    return (
        <Stack sx={{ gap: 3, p: 3, }}>
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

            <Grid container spacing={5} alignItems={'flex-start'} >
                <Grid xs={12} md={7}>
                    <TableCustom
                        columns={[
                            { label: "Région", key: "region" },
                            { label: "Minimum", key: "minimum", center: true },
                            { label: "Maximum", key: "maximum", center: true },
                            { label: "Moyen", key: "moyenne", center: true },
                            { label: "Nbr marché", key: "nbMarches", center: true },
                        ]}
                        data={moyennes.map((m) => ({
                            region: m.region,
                            moyenne: <><b>{m.moyenne.toFixed(2)}</b> FCFA</>,
                            minimum: <><b>{m.min.toFixed(2)}</b> FCFA</>,
                            maximum: <><b>{m.max.toFixed(2)}</b> FCFA</>,
                            nbMarches: <b>{m.nbMarches}</b>,
                        }))}
                    />
                </Grid>

                <Grid xs={12} md={5}>
                    <CardMedia
                        component={'img'}
                        src={getProduitImageUrl(codeProduit || '')}
                        sx={{ flex: 1, maxHeight: '30vh' }}
                    />
                </Grid>

                <Grid xs={12} md={7} >
                    <Typography level="h3" fontSize={"1.5vw"}>
                        Point à retenir:
                    </Typography>

                    <Divider
                        sx={{
                            width: 50,
                            height: 10,
                            borderRadius: 50,
                            bgcolor: green[800]
                        }}
                    />

                    <Stack
                        component={'ul'}
                        mt={2}
                        fontSize={'0.9vw'}
                        gap={1}
                    >
                        <li>
                            Le prix de
                            <b>{` `}{produit}{` `}</b>
                            est généralement moins chère dans la région du
                            <b>{` `}{moyenneMin?.region}{` `}</b>
                            et plus élévé dans la région du
                            <b>{` `}{moyenneMax?.region}</b>.
                        </li>
                        {moyennes.map(m => (
                            <li>
                                En
                                <b>{` `}{m.region}</b>
                                , avec des collectes dans
                                <b>{` `}{m.nbMarches}{` `}</b>
                                marché
                                <b>{` `}{m.nbMarches > 1 && 's'}</b>,
                                le prix de
                                <b>{` `}{produit}{` `}</b>
                                {
                                    m.min == m.max
                                        ? <span>
                                            est rélativement stable. Elle est de
                                            {` `}<b>{m.min}</b>
                                        </span>
                                        : <span>
                                            varie entre
                                            {` `}<b>{m.min} FCFA</b>{` `}
                                            à
                                            {` `}<b>{m.max} FCFA</b>{` `}
                                        </span>
                                }
                            </li>
                        ))}
                    </Stack>
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
