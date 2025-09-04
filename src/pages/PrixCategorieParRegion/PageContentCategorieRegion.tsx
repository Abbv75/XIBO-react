import React, { useContext } from "react";
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
import { CardMedia } from "@mui/material";
import PageLooperContext from "../../providers/PageLooperContext";
import getProduitImageUrl from "../../utils/getProduitImageUrl";

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
    const { apiData } = useContext(PageLooperContext);

    // Construire une ligne spéciale pour les images
    const imageRow = Object.fromEntries(
        columns.map((col) => {
            if (col === "marche" || col === "date") {
                return [col, ""]; // pas d'image ici
            }
            const codeProduit = apiData.find((p) => p.produit === col)?.codeProduit;
            return [
                col,
                codeProduit ? (
                    <CardMedia
                        key={col}
                        component="img"
                        src={getProduitImageUrl(codeProduit)}
                        sx={{ width: "4vw", height: "4vw", objectFit: "contain", margin: "auto" }}
                    />
                ) : "-",
            ];
        })
    );

    // Lignes du tableau (on insère d'abord la ligne des images)
    const tableRows = [
        { ...imageRow, marche: " ", date: " " }, // ligne images
        ...data.map((row: any) =>
            Object.fromEntries(
                columns.map((col) => [
                    col,
                    col === "marche" ? (
                        row[col]
                    ) : (
                        <b>
                            {col === "date"
                                ? row[col]
                                : row[col] == null || row[col] === "" // null, undefined, vide
                                    ? ""
                                    : row[col] < 0 // négatif → juste "-"
                                        ? "-"
                                        : row[col] > 0 // positif → valeur formatée
                                            ? `${row[col].toLocaleString()} FCFA`
                                            : "-"} {/* 0 → vide */}
                        </b>
                    ),
                ])
            )
        ),
    ];


    return (
        <Stack sx={{ gap: 3, p: 3 }}>
            <Typography
                level="h4"
                fontSize={"2vw"}
                textColor={grey[700]}
                fontWeight={300}
            >
                Prix des produits de la catégorie{" "}
                <Typography fontWeight={700} textColor={green[900]}>
                    "{categorie}"
                </Typography>{" "}
                dans la région de{" "}
                <Typography fontWeight={700} textColor={red[900]}>
                    {region}
                </Typography>
            </Typography>

            <Grid container flex={1} spacing={5} height={"100%"} direction={"column"}>
                <Grid xs={12}>
                    <TableCustom
                        columns={columns.map((col, index) => ({
                            label: col,
                            key: col,
                            center: !!index,
                        }))}
                        data={tableRows}
                    />
                </Grid>
            </Grid>
        </Stack>
    );
};

export default PageContentCategorieRegion;
