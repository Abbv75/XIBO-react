import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sheet, Typography, Grid } from "@mui/joy";
import { Bar } from "react-chartjs-2";
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
import TableCustom from "../../components/TableCustome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PrixProduitMarcheParRegion: React.FC = () => {
    const { produit } = useParams<{ produit: string }>();

    const [produitData, setproduitData] = useState<GET_ALL_VALIDATION_T[]>([]);

    const nomProduit = produitData?.length ? produitData[0].produit : "";
    const nomRegion = produitData?.length ? produitData[0].region : "";

    const tableRows = produitData.map((p) => {
        let tendance = null;

        if (p.precedent) {
            if (parseFloat(p.prix) > parseFloat(p.precedent.prix)) tendance = <FontAwesomeIcon icon={faArrowUp} color="green" />;
            else if (parseFloat(p.prix) < parseFloat(p.precedent.prix)) tendance = <FontAwesomeIcon icon={faArrowDown} color="red" />;
        }

        return {
            marche: <>{tendance} {p.marche}</>,
            prix: parseFloat(p.prix),
            date: p.dateCollecte,
            gaphLabel: p.marche
        };
    });

    useEffect(() => {
        console.log(tableRows);

    }, [tableRows])

    const chartData = {
        labels: tableRows.map((row) => row.gaphLabel),
        datasets: [
            {
                label: `Prix de ${nomProduit}`,
                data: tableRows.map((row) => row.prix),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
        ],
    };

    const loadData = async () => {
        let data = (await getAllValidation()) || [];
        const res = data.filter((p) => p.produit === produit);

        // Garder uniquement le dernier prix pour chaque marché
        let dernierPrixParMarche: GET_ALL_VALIDATION_T[] = [];
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

        dernierPrixParMarche = Array.from(marcheMap.values()).map((v) => ({
            ...v.dernier,
            precedent: v.precedent,
        }));

        setproduitData(dernierPrixParMarche);
    };

    useEffect(() => {
        loadData();
    }, [produit]);

    if (produitData.length === 0) {
        return <Typography fontSize={'2.5vw'} >Produit "{produit}" non trouvé ou chargement en cours...</Typography>;
    }

    return (
        <Sheet
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                p: 3,
                height: "90vh",
            }}
        >
            <Typography level="h4" fontSize={'2vw'}>
                Prix de {nomProduit} dans la région de {nomRegion}
            </Typography>

            <Grid
                container
                alignItems={"center"}
                flex={1}
                spacing={5}
            >
                <Grid xs={12} md={6}>
                    <TableCustom
                        columns={[
                            { label: "Marché", key: "marche" },
                            { label: "Prix", key: "prix" },
                            { label: "Date de collecte", key: "date" },
                        ]}
                        data={tableRows}
                    />
                </Grid>

                <Grid xs={12} md={6}>
                    <Bar
                        data={chartData}
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

export default PrixProduitMarcheParRegion;
