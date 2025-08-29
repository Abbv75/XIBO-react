import { useEffect, useState, useRef } from "react";
import { Box, LinearProgress, Sheet, Stack, Typography } from "@mui/joy";
import { GET_ALL_VALIDATION_T, PAGE_T } from "../../types";
import PageLooperContext from "../../providers/PageLooperContext";
import { INITIAL_PAGES } from "../../constant";
import getAllValidation from "../../service/prixMarche/getAllValidation";
import Header from "../Header";
import ActionZone from "./ActionZone";

const PageLooper = () => {
    const [pages, setPages] = useState<PAGE_T[]>(INITIAL_PAGES);

    const [apiData, setapiData] = useState<GET_ALL_VALIDATION_T[]>([]);

    const [cacheMoyennes] = useState<{ [produit: string]: any }>({});

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [timeLeft, setTimeLeft] = useState(pages[0].duration / 1000);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const nextPage = () => setCurrentIndex((prev) => (prev + 1) % pages.length);

    useEffect(() => {
        if (!isPlaying || !pages[currentIndex]) return;

        const duration = pages[currentIndex].duration;
        setTimeLeft(duration / 1000);

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    nextPage();
                    return duration / 1000;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [currentIndex, isPlaying, pages]);


    useEffect(() => {
        getAllValidation().then(data => data && setapiData(data))
    }, []);

    if (!apiData.length) {
        return (
            <LinearProgress />
        )
    }

    return (
        <PageLooperContext.Provider value={{
            pages,
            setPages,
            setCurrentIndex,
            cacheMoyennes,
            apiData,
            isPlaying,
            setIsPlaying,
            nextPage
        }}>
            {/* Decorations */}
            <Box sx={{ position: "fixed", top: -280, right: -200, width: 500, height: 500, borderRadius: "50%", background: "linear-gradient(135deg, #4caf50, #ff9800)", zIndex: -1 }} />
            <Box sx={{ position: "fixed", bottom: -310, left: 10, width: 500, height: 500, borderRadius: '50%', background: "linear-gradient(45deg, #0e160cff, #06aa0eff)", zIndex: -1 }} />

            {/* Timer + page info */}
            <Sheet variant="soft" sx={{ position: "fixed", top: pages[currentIndex].id != 'accueil' ? 100 : 10, right: 10, px: 2, py: 1, borderRadius: "md", boxShadow: "sm", zIndex: 1000 }}>
                <Typography level="body-lg" fontWeight="lg">
                    ⏱ {timeLeft}s — Page {currentIndex + 1} / {pages.length}
                </Typography>
            </Sheet>

            <ActionZone />

            {/* Affichage de la page courante */}
            <Stack
                width={'100%'}
                gap={2}
                height={'100vh'}
            >
                {pages[currentIndex].id != 'accueil' && (<Header />)}

                {pages[currentIndex]?.component}
            </Stack>
        </PageLooperContext.Provider>
    );
};

export default PageLooper;
