import React from "react";
import { Stack, Typography, Box } from "@mui/joy";
import { IMAGES, PARTENAIRE_IMAMGE } from "../../constant";

const PageAccueil: React.FC = () => {
    return (
        <Stack
            sx={{
                gap: 4,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "100vh",
            }}
        >
            {/* Logo */}
            <Box
                component="img"
                src={IMAGES.logo} // Remplacer par le chemin réel de ton logo
                alt="Logo SIMRO Cameroun"
                sx={{ width: 200, height: "auto" }}
            />

            {/* Titre principal */}
            <Typography level="h2" fontSize="2.5vw" fontWeight="lg">
                SIMRO Cameroun
            </Typography>
            <Typography level="h4" fontSize="1.5vw" fontWeight="md">
                Système d'Information sur les Marchés du Riz et de l'Oignon du Cameroun
            </Typography>

            {/* Liste des partenaires */}
            <Box sx={{ mt: 5 }}>
                <Typography level="h4" fontWeight="md" mb={2}>
                    Partenaires :
                </Typography>
                <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap">
                    {PARTENAIRE_IMAMGE.map((partenaire, index) => (
                        <Box component="img" src={partenaire} alt={`Partenaire ${index + 1}`} key={index} sx={{ width: 120, height: "auto" }} />
                    ))}
                    {/* <Box component="img" src="/assets/partenaire1.png" alt="Partenaire 1" sx={{ width: 120, height: "auto" }} /> */}
                    {/* <Box component="img" src="/assets/partenaire2.png" alt="Partenaire 2" sx={{ width: 120, height: "auto" }} /> */}
                    {/* <Box component="img" src="/assets/partenaire3.png" alt="Partenaire 3" sx={{ width: 120, height: "auto" }} /> */}
                    {/* Ajouter d'autres partenaires si nécessaire */}
                </Stack>
            </Box>
        </Stack>
    );
};

export default PageAccueil;
