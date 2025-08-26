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


interface PageContentCategorieRegionProps {
    categorie: string;
    region: string;
    columns: string[]; // ["marche", "date", "produit1", "produit2", ...]
    data: { [key: string]: string | number }[]; // tableau des lignes
}

const PageContentCategorieRegion: React.FC<PageContentCategorieRegionProps> = ({
    categorie,
    region,
    columns,
    data,
}) => {
    // Préparer les données pour le graphique : chaque produit = dataset
    const produitColumns = columns.filter((c) => c !== "marche" && c !== "date");
    const chartData = {
        labels: data.map((row) => row.marche),
        datasets: produitColumns.map((prod, idx) => ({
            label: prod,
            data: data.map((row) => Number(row[prod]) || 0),
            backgroundColor: `hsla(${(idx * 50) % 360}, 70%, 50%, 0.6)`,
        })),
    };

    return (
        <Stack sx={{ gap: 3, p: 3, height: "90vh" }}>
            <Typography level="h4" fontSize={"2vw"}>
                Prix des produits de la catégorie "{categorie}" dans la région de {region}
            </Typography>

            <Grid container flex={1} spacing={5}>
                <Grid xs={12} >
                    <TableCustom
                        columns={columns.map((col) => ({ label: col, key: col }))}
                        data={data.map((row) =>
                            Object.fromEntries(
                                columns.map((col) => [
                                    col,
                                    col === "marche" || col === "date" ? row[col] : row[col] ? `${row[col].toLocaleString()} FCFA` : "-",
                                ])
                            )
                        )}
                    />
                </Grid>

                {/* <Grid xs={12} md={6} bgcolor={"white"}>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: { legend: { position: "top" } },
                            scales: { y: { beginAtZero: true } },
                        }}
                    />
                </Grid> */}
            </Grid>
        </Stack>
    );
};

export default PageContentCategorieRegion;