import { createContext } from "react";
import { GET_ALL_VALIDATION_T, PAGE_T, USE_STATE_T } from "../types";

export default createContext({} as {
    pages: PAGE_T[],
    setPages: USE_STATE_T,
    setCurrentIndex: USE_STATE_T,
    cacheMoyennes: { [produit: string]: any },
    apiData: GET_ALL_VALIDATION_T[],
    isPlaying: boolean, setIsPlaying: USE_STATE_T
    nextPage: () => void

})