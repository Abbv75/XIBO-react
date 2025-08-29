import React from "react";
import { Typography, Grid, Stack } from "@mui/joy";
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
import { green, grey, red } from "@mui/material/colors";

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
        <Stack sx={{ gap: 3, p: 3, }} height={'100%'}>
            <Typography
                level="h4"
                fontSize={"2vw"}
                textColor={grey[700]}
                fontWeight={300}
            >
                Prix des produits de la catégorie
                {` `}<Typography
                    fontWeight={700}
                    textColor={green[900]}
                >"{categorie}"</Typography> {` `}
                dans la région de
                {` `}
                <Typography
                    fontWeight={700}
                    textColor={red[900]}
                >{region}</Typography>
            </Typography>

            <Grid container flex={1} spacing={5} height={'100%'}>
                <Grid xs={12} >
                    <TableCustom
                        columns={columns.map((col, index) => ({ label: col, key: col, center: !!index }))}
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