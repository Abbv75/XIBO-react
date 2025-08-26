import { AxiosInstense } from "../../helpers/AxiosInstense";
import { GET_ALL_VALIDATION_T } from "../../types";

export default async () => {
    try {
        const { data } = await AxiosInstense.get('/prixMarche/getAllValidation')
        return data as GET_ALL_VALIDATION_T[];
    } catch (error) {
        console.error("Une erreur est survenue : ", error);

        return false;
    }
}