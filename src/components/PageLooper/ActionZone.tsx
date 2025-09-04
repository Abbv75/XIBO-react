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
import { useContext, useEffect } from "react";
import PageLooperContext from "../../providers/PageLooperContext";

const ActionZone = () => {
    const {
        isPlaying,
        setIsPlaying,
        pages,
        nextPage,
        setCurrentIndex,
    } = useContext(PageLooperContext);

    const prevPage = () => setCurrentIndex((prev: number) => (prev === 0 ? pages.length - 1 : prev - 1));
    const firstPage = () => setCurrentIndex(0);
    const lastPage = () => setCurrentIndex(pages.length - 1);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Tab":
                case " ":
                    e.preventDefault();
                    setIsPlaying((p: boolean) => !p); break;
                case "ArrowRight": nextPage(); break;
                case "ArrowLeft": prevPage(); break;
                case "ArrowUp": lastPage(); break;
                case "ArrowDown": firstPage(); break;
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [pages]);

    return (
        < Sheet
            variant="soft"
            sx={{
                position: "fixed", bottom: '1vw',
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: '2vw',
                p: '1vw',
                borderRadius: "md",
                boxShadow: "sm",
                zIndex: 1000
            }}
        >
            <Typography
                level="body-md"
                textAlign={'center'}
                fontSize={'1vw'}
                onClick={() => setIsPlaying(p => !p)}
            ><FontAwesomeIcon icon={isPlaying ? faPause : faPlay} /> Tab</Typography>
            <Typography
                level="body-md"
                textAlign={'center'}
                fontSize={'1vw'}
                onClick={() => prevPage()}
            ><FontAwesomeIcon icon={faArrowLeft} /> Précédent</Typography>
            <Typography
                level="body-md"
                textAlign={'center'}
                fontSize={'1vw'}
                onClick={() => nextPage()}
            ><FontAwesomeIcon icon={faArrowRight} /> Suivant</Typography>
            <Typography
                level="body-md"
                textAlign={'center'}
                fontSize={'1vw'}
                onClick={() => lastPage()}
            ><FontAwesomeIcon icon={faArrowUp} /> Dernière</Typography>
            <Typography
                level="body-md"
                textAlign={'center'}
                fontSize={'1vw'}
                onClick={() => firstPage()}

            ><FontAwesomeIcon icon={faArrowDown} /> Première</Typography>
        </Sheet >
    )
}

export default ActionZone