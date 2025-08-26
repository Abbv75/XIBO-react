import { createContext } from "react";
import { PAGE_T, USE_STATE_T } from "../types";

export default createContext({} as {
    pages: PAGE_T[],
    setPages: USE_STATE_T,
    setCurrentIndex: USE_STATE_T,
    cacheMoyennes : {[produit: string]: any} 
})