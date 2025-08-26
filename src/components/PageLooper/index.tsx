import { useEffect, useState, useRef } from "react";
import { Box, LinearProgress, Sheet, Typography } from "@mui/joy";
import {
    faPause,
    faPlay,
    faArrowRight,
    faArrowLeft,
    faArrowUp,
    faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GET_ALL_VALIDATION_T, PAGE_T } from "../../types";
import PageLooperContext from "../../providers/PageLooperContext";
import { INITIAL_PAGES } from "../../constant";
import getAllValidation from "../../service/prixMarche/getAllValidation";

const PageLooper = () => {
    const [pages, setPages] = useState<PAGE_T[]>(INITIAL_PAGES);

    const [apiData, setapiData] = useState<GET_ALL_VALIDATION_T[]>([]);

    const [cacheMoyennes] = useState<{ [produit: string]: any }>({});

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [timeLeft, setTimeLeft] = useState(pages[0].duration / 1000);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const nextPage = () => setCurrentIndex((prev) => (prev + 1) % pages.length);
    const prevPage = () => setCurrentIndex((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
    const firstPage = () => setCurrentIndex(0);
    const lastPage = () => setCurrentIndex(pages.length - 1);

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
        const handleKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Tab":
                    e.preventDefault();
                    setIsPlaying((p) => !p); break;
                case "ArrowRight": nextPage(); break;
                case "ArrowLeft": prevPage(); break;
                case "ArrowUp": lastPage(); break;
                case "ArrowDown": firstPage(); break;
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [pages]);

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
            apiData
        }}>

            {/* Decorations */}
            <Box sx={{ position: "fixed", top: -280, right: -200, width: 500, height: 500, borderRadius: "50%", background: "linear-gradient(135deg, #4caf50, #ff9800)", zIndex: -1 }} />
            <Box sx={{ position: "fixed", bottom: -310, left: 10, width: 500, height: 500, borderRadius: 500, background: "linear-gradient(45deg, #0e160cff, #06aa0eff)", zIndex: -1 }} />

            {/* Timer + page info */}
            <Sheet variant="soft" sx={{ position: "fixed", top: 10, right: 10, px: 2, py: 1, borderRadius: "md", boxShadow: "sm", zIndex: 1000 }}>
                <Typography level="body-lg" fontWeight="lg">
                    ⏱ {timeLeft}s — Page {currentIndex + 1} / {pages.length}
                </Typography>
            </Sheet>

            {/* Actions clavier */}
            <Sheet variant="soft" sx={{ position: "fixed", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 3, px: 3, py: 2, borderRadius: "md", boxShadow: "sm", zIndex: 1000 }}>
                <Typography level="body-md"><FontAwesomeIcon icon={isPlaying ? faPause : faPlay} /> Tab</Typography>
                <Typography level="body-md"><FontAwesomeIcon icon={faArrowLeft} /> Précédent</Typography>
                <Typography level="body-md"><FontAwesomeIcon icon={faArrowRight} /> Suivant</Typography>
                <Typography level="body-md"><FontAwesomeIcon icon={faArrowUp} /> Dernière</Typography>
                <Typography level="body-md"><FontAwesomeIcon icon={faArrowDown} /> Première</Typography>
            </Sheet>

            {/* Affichage de la page courante */}
            <Box sx={{ width: "100%", height: "100%" }}>
                {pages[currentIndex]?.component}
            </Box>
        </PageLooperContext.Provider>
    );
};

export default PageLooper;
