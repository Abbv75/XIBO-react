import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, Typography } from "@mui/joy";
import {
    faPause,
    faPlay,
    faArrowRight,
    faArrowLeft,
    faArrowUp,
    faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PAGE_LIST } from "../../constant";

const PageLooper: React.FC = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [timeLeft, setTimeLeft] = useState(PAGE_LIST[0].duration / 1000); // en secondes
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Navigation helpers
    const nextPage = () => setCurrentIndex((prev) => (prev + 1) % PAGE_LIST.length);
    const prevPage = () =>
        setCurrentIndex((prev) => (prev === 0 ? PAGE_LIST.length - 1 : prev - 1));
    const firstPage = () => setCurrentIndex(0);
    const lastPage = () => setCurrentIndex(PAGE_LIST.length - 1);

    // Boucle automatique
    useEffect(() => {
        if (!isPlaying) return; // ne lance pas le timer si en pause

        let { path, duration, produitName } = PAGE_LIST[currentIndex];

        if (produitName) {
            path = path.replace("{produit}", encodeURIComponent(produitName));
        }

        navigate(path);
        setTimeLeft(duration / 1000);

        if (!isPlaying) return;

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    nextPage();
                    return duration / 1000; // reset du timer
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [currentIndex, isPlaying, navigate]);

    // Gestion du clavier
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
    }, []);

    return (
        <>
            {/* En haut : Timer + page info */}
            <Sheet
                variant="soft"
                sx={{
                    position: "fixed",
                    top: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    px: 2,
                    py: 1,
                    borderRadius: "md",
                    boxShadow: "sm",
                    zIndex: 1000,
                }}
            >
                <Typography level="body-lg" fontWeight="lg">
                    ⏱ {timeLeft}s — Page {currentIndex + 1} / {PAGE_LIST.length}
                </Typography>
            </Sheet>

            {/* En bas : Guide des actions clavier */}
            <Sheet
                variant="soft"
                sx={{
                    position: "fixed",
                    bottom: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 3,
                    px: 3,
                    py: 2,
                    borderRadius: "md",
                    boxShadow: "sm",
                    zIndex: 1000,
                }}
            >
                <Typography level="body-md">
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} /> Tab
                </Typography>
                <Typography level="body-md">
                    <FontAwesomeIcon icon={faArrowLeft} /> ← Précédent
                </Typography>
                <Typography level="body-md">
                    <FontAwesomeIcon icon={faArrowRight} /> → Suivant
                </Typography>
                <Typography level="body-md">
                    <FontAwesomeIcon icon={faArrowUp} /> ↑ Dernière
                </Typography>
                <Typography level="body-md">
                    <FontAwesomeIcon icon={faArrowDown} /> ↓ Première
                </Typography>
            </Sheet>
        </>
    );
};

export default PageLooper;
