import React from "react";
import { Stack, Typography, Box } from "@mui/joy";
import { IMAGES, PARTENAIRE_IMAMGE } from "../../constant";
import { CardMedia } from "@mui/material";
import ChargeurDePage from "./ChargeurDePage";

const PageAccueil: React.FC = () => {
    return (
        <Stack
            sx={{
                gap: 4,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
            height="100vh"
        >
            <ChargeurDePage />
            
            <Stack direction="row" spacing={4} justifyContent="center" alignContent={'center'} flexWrap="wrap">
                <CardMedia
                    component="img"
                    src={IMAGES.logo} // Remplacer par le chemin réel de ton logo
                    alt="Logo SIMRO Cameroun"
                    sx={{ width: 200, height: "auto", objectFit: 'contain' }}
                />
                <CardMedia
                    component="img"
                    src={IMAGES.logo_padfa} // Remplacer par le chemin réel de ton logo
                    alt="Logo SIMRO Cameroun"
                    sx={{ width: 200, height: "auto", objectFit: 'contain' }}
                />
            </Stack>

            <Typography level="h2" fontSize="2.5vw" fontWeight="lg">
                SIMRO Cameroun
            </Typography>
            <Typography level="h4" fontSize="1.5vw" fontWeight="md">
                Système d'Information sur les Marchés du Riz et de l'Oignon du Cameroun
            </Typography>

            {/* Liste des partenaires */}
            <Box sx={{ mt: 5 }}>
                <Typography level="h4" fontWeight="md" mb={2}>
                    Nos différents Partenaires
                </Typography>
                <Stack direction="row" spacing={4} justifyContent="center" alignContent={'center'} flexWrap="wrap">
                    {PARTENAIRE_IMAMGE.map((partenaire, index) => (
                        <CardMedia
                            component="img"
                            src={partenaire}
                            alt={`Partenaire ${index + 1}`}
                            key={index}
                            sx={{ width: 120, height: "auto", objectFit: 'contain' }}
                        />
                    ))}
                </Stack>
            </Box>
        </Stack>
    );
};

export default PageAccueil;
