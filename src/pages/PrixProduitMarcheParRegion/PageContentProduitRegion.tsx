import React from "react";
import { Typography, Grid, Stack } from "@mui/joy";
import { GET_ALL_VALIDATION_T } from "../../types";
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
import formatDateToDDMMYYYY from "../../utils/formatDateToDDMMYYYY";
import { getPrixProduitMarcheParRegion } from "../../utils/getPrixProduitMarcheParRegion";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Définir la nouvelle interface pour les données entrantes du composant
interface MarcheCollectes {
    marche: string;
    collectes: GET_ALL_VALIDATION_T[];
}

const PageContentProduitRegion: React.FC<{
    produit: string;
    region: string;
    data: MarcheCollectes[]; // La donnée reçue est un tableau de MarcheCollectes
}> = ({ produit, region, data }) => {
    // Utiliser la fonction utilitaire pour traiter les données et obtenir les informations nécessaires
    const processedData = getPrixProduitMarcheParRegion(data);

    // Trier les marchés pour l'affichage
    const marches = processedData.map((p) => p.marche);

    // Préparer les lignes du tableau avec les données traitées, en incluant les "gaps"
    const tableRows = [
        {
            label: "Prix actuel",
            values: processedData.map((p) =>
                p.prixActuel !== null ? Math.round(p.prixActuel).toLocaleString() + " FCFA" : "-"
            ),
            center: true
        },
        {
            label: "Date actuelle",
            values: processedData.map((p) => formatDateToDDMMYYYY(p.dateActuelle) || "-"),
        },
        {
            label: "Nbr de collectes actuel",
            values: processedData.map((p) => (p.nbrCollecteActuel !== null ? p.nbrCollecteActuel.toString() : "-")),
        },
        'gap', // Ajout d'une ligne de séparation après les données actuelles
        {
            label: "Prix précédent",
            values: processedData.map((p) =>
                p.prixPrecedent !== null ? Math.round(p.prixPrecedent).toLocaleString() + " FCFA" : "-"
            ),
        },
        {
            label: "Date précédente",
            values: processedData.map((p) => formatDateToDDMMYYYY(p.datePrecedente) || "-"),
        },
        {
            label: "Nbr de collectes précédent",
            values: processedData.map((p) => (p.nbrCollectePrecedente !== null ? p.nbrCollectePrecedente.toString() : "-")),
        },
        'gap', // Ajout d'une ligne de séparation après les données précédentes
        {
            label: "Evolution %",
            values: processedData.map((p) => {
                if (p.evolution === null) return "-";
                const arrow = p.evolution > 0 ? "⬆️" : p.evolution < 0 ? "⬇️" : "";
                return `${arrow} ${Math.abs(p.evolution).toFixed(2)}%`;
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
                            ...marches.map((m) => ({ label: m, key: m, center : true })),
                        ]}
                        data={tableRows.map((row) => {
                            if (row === 'gap') {
                                return 'gap'; // Retourne la chaîne de caractères si c'est un "gap"
                            }

                            //@ts-ignore
                            const obj: any = { label: row.label };
                            //@ts-ignore
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