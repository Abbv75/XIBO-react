import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Sheet, Typography } from "@mui/joy";
import { Bar } from "react-chartjs-2";

// Supposons que tu as un tableau PRODUCTS: Produit[]
import getAllValidation from "../../service/prixMarche/getAllValidation";
import { GET_ALL_VALIDATION_T } from "../../types";

const PrixProduitMarcheParRegion: React.FC = () => {
    const { produit } = useParams<{ produit: string }>();

    const [produitData, setproduitData] = useState<GET_ALL_VALIDATION_T[]>([]);

    // On prend le nom du produit et de la région (première occurrence)
    const nomProduit = produitData[0].produit;
    const nomRegion = produitData[0].region;

    // Préparer le tableau et le graphique
    const tableRows = produitData.map((p) => ({
        marche: p.marche,
        prix: parseFloat(p.prix), // convertir en nombre si nécessaire
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

        setproduitData(res);
    }

    useEffect(() => {
        loadData();
    }, []);

    // if (produitData.length === 0) return <Typography>Produit non trouvé</Typography>;

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
                {/* Tableau */}
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

                {/* Graphique */}
                <div style={{ flex: 1 }}>
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: { legend: { display: false } },
                            scales: { y: { beginAtZero: true } },
                        }}
                    />
                </div>
            </div>
        </Sheet>
    );
};

export default PrixProduitMarcheParRegion;
