import React from "react";
import { Box, Stack, Typography } from "@mui/joy";
import { IMAGES } from "../../constant";

const Header: React.FC = () => {
    return (
        <Stack
            px={4}
            py={1}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            bgcolor={'white'}
            sx={{
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
        >
            {/* Logo projet */}
            <Box
                component="img"
                src={IMAGES.logo}
                alt="Logo SIMRO Cameroun"
                sx={{ height: 60, width: "auto" }}
            />

            {/* Titre du projet */}
            <Stack spacing={0} sx={{ textAlign: "center" }}>
                <Typography level="h4" fontWeight="lg">
                    SIMRO Cameroun
                </Typography>
                <Typography level="body-md" fontWeight="md">
                    Système d'Information sur les Marchés du Riz et de l'Oignon
                </Typography>
            </Stack>

            {/* Logos bailleurs / partenaires */}
            <Stack direction="row" spacing={2}>
                <Box component="img" src={IMAGES.logo_padfa} alt="Bailleur 1" sx={{ height: 50, width: "auto" }} />
                {/* <Box component="img" src="/assets/bailleur2.png" alt="Bailleur 2" sx={{ height: 50, width: "auto" }} /> */}
                {/* Ajouter d'autres bailleurs si nécessaire */}
            </Stack>
        </Stack>
    );
};

export default Header;
