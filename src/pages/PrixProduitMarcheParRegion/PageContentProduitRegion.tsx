import React from "react";
import { Typography, Grid, Stack } from "@mui/joy";
import { Bar } from "react-chartjs-2";
import { GET_ALL_VALIDATION_T } from "../../types";
import TableCustom from "../../components/TableCustome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


// Composant qui affiche tableau + graphique pour une région
const PageContentProduitRegion: React.FC<{
    produit: string;
    region: string;
    data: GET_ALL_VALIDATION_T[];
}> = ({ produit, region, data }) => {
    const tableRows = data.map((p) => {
        let tendance = null;
        if (p.precedent) {
            if (parseFloat(p.prix) > parseFloat(p.precedent.prix))
                tendance = <FontAwesomeIcon icon={faArrowUp} color="green" />;
            else if (parseFloat(p.prix) < parseFloat(p.precedent.prix))
                tendance = <FontAwesomeIcon icon={faArrowDown} color="red" />;
        }

        return {
            marche: <>{tendance} {p.marche}</>,
            prix: parseFloat(p.prix),
            date: p.dateCollecte,
            gaphLabel: p.marche,
        };
    });

    const chartData = {
        labels: tableRows.map((row) => row.gaphLabel),
        datasets: [
            {
                label: `Prix de ${produit}`,
                data: tableRows.map((row) => row.prix),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
        ],
    };

    return (
        <Stack sx={{ gap: 3, p: 3, height: "90vh" }}>
            <Typography level="h4" fontSize={"2vw"}>
                Prix de {produit} dans la région de {region}
            </Typography>

            <Grid container alignItems={"center"} flex={1} spacing={5}>
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

                <Grid xs={12} md={6} bgcolor={"white"}>
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
        </Stack>
    );
};

export default PageContentProduitRegion;
