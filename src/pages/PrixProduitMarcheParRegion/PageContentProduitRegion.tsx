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
import { green, grey, orange, red } from "@mui/material/colors";

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
    // Trier les marchés pour l'affichage
    const marches = data.map((p) => p.marche);

    // Préparer les lignes du tableau
    const tableRows = [
        {
            label: "Prix actuel",
            values: data.map((p) => parseFloat(p.prix).toLocaleString() + " FCFA"),
        },
        {
            label: "Date actuel",
            values: data.map((p) => p.dateCollecte),
        },
        {
            label: "Prix précédent",
            values: data.map((p) =>
                p.precedent ? parseFloat(p.precedent.prix).toLocaleString() + " FCFA" : "-"
            ),
        },
        {
            label: "Date précédente",
            values: data.map((p) =>
                p.precedent ? p.precedent.dateCollecte : "-"
            ),
        },
        {
            label: "Evolution %",
            values: data.map((p) => {
                if (!p.precedent) return "-";
                const prev = parseFloat(p.precedent.prix);
                const curr = parseFloat(p.prix);
                const diff = ((curr - prev) / prev) * 100;
                const arrow = diff > 0 ? "⬆️" : diff < 0 ? "⬇️" : "";
                return `${arrow} ${Math.abs(diff).toFixed(2)}%`;
            }),
        },
    ];

    return (
        <Stack sx={{ gap: 3, p: 3, }} height={'100%'}>
            <Typography
                level="h4"
                fontSize={"2vw"}
                textColor={grey[700]}
                fontWeight={300}
            >
                Prix de
                {` `}<Typography
                    fontWeight={700}
                    textColor={green[900]}
                >{produit}</Typography> {` `}
                dans la région de
                {` `}
                <Typography
                    fontWeight={700}
                    textColor={red[900]}
                >{region}</Typography>
            </Typography>

            <Grid container spacing={5} height={'100%'} flex={1} alignItems="center">
                <Grid xs={12}>
                    <TableCustom
                        columns={[
                            { label: "#", key: "label" },
                            ...marches.map((m) => ({ label: m, key: m })),
                        ]}
                        data={tableRows.map((row) => {
                            const obj: any = { label: row.label };
                            row.values.forEach((v, i) => {
                                obj[marches[i]] = v;
                            });
                            return obj;
                        })}
                    />
                </Grid>
            </Grid>
        </Stack>
    );
};


export default PageContentProduitRegion;
