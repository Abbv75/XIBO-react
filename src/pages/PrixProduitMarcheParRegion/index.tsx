import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Sheet, Typography } from "@mui/joy";
import { Bar } from "react-chartjs-2";
import getAllValidation from "../../service/prixMarche/getAllValidation";
import { GET_ALL_VALIDATION_T } from "../../types";

const PrixProduitMarcheParRegion: React.FC = () => {
    const { produit } = useParams<{ produit: string }>();

    const [produitData, setproduitData] = useState<GET_ALL_VALIDATION_T[]>([]);

    const nomProduit = produitData?.length ? produitData[0].produit : "";
    const nomRegion = produitData?.length ? produitData[0].region : "";

    const tableRows = produitData.map((p) => ({
        marche: p.marche,
        prix: parseFloat(p.prix),
    }));

    const chartData = {
        labels: tableRows.map((row) => row.marche),
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
        const dernierPrixParMarche: GET_ALL_VALIDATION_T[] = [];
        const marcheMap = new Map<string, GET_ALL_VALIDATION_T>();

        res.forEach((p) => {
            const date = new Date(p.dateCollecte);
            const exist = marcheMap.get(p.marche);
            if (!exist || date > new Date(exist.dateCollecte)) {
                marcheMap.set(p.marche, p);
            }
        });

        dernierPrixParMarche.push(...marcheMap.values());

        setproduitData(dernierPrixParMarche);
    };

    useEffect(() => {
        loadData();
    }, [produit]);

    if (produitData.length === 0) {
        return <Typography>Produit "{produit}" non trouvé ou chargement en cours...</Typography>;
    }

    return (
        <Sheet
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                p: 3,
                height: "100%",
            }}
        >
            <Typography level="h4">
                Prix de {nomProduit} dans la région de {nomRegion}
            </Typography>

            <div style={{ display: "flex", gap: "2rem" }}>
                <Table>
                    <thead>
                        <tr>
                            <th>Marché</th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.marche}</td>
                                <td>{row.prix}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* <div style={{ flex: 1 }}>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: { legend: { display: false } },
                            scales: { y: { beginAtZero: true } },
                        }}
                    />
                </div> */}
            </div>
        </Sheet>
    );
};

export default PrixProduitMarcheParRegion;
