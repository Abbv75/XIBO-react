import { AxiosInstense } from "../../helpers/AxiosInstense";
import { PRODUIT_T } from "../../types";

export default async () => {
    try {
        const { data } = await AxiosInstense.get('/produit/getAllProduit')
        return data as PRODUIT_T[];
    } catch (error) {
        console.error("Une erreur est survenue : ", error);

        return false;
    }
}