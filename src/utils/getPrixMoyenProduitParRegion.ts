import { GET_ALL_VALIDATION_T } from "../types";

interface ProduitMoyenneEtendue {
    region: string;
    moyenne: number;
    min: number;
    max: number;
    nbMarches: number;
}

export default (res: GET_ALL_VALIDATION_T[]): ProduitMoyenneEtendue[] => {
    try {
        // Dernier prix par marché
        const marcheMap = new Map<string, GET_ALL_VALIDATION_T>();
        res.forEach((p) => {
            const exist = marcheMap.get(p.marche);
            if (!exist || new Date(p.dateCollecte) > new Date(exist.dateCollecte)) {
                marcheMap.set(p.marche, p);
            }
        });

        const dernierPrixParMarche = Array.from(marcheMap.values());

        // Calcul min, max, moyenne, nbMarches par région
        const regionMap = new Map<
            string,
            { prix: number[] }
        >();

        dernierPrixParMarche.forEach((p) => {
            const prix = parseFloat(p.prix);
            if (!regionMap.has(p.region)) regionMap.set(p.region, { prix: [] });
            regionMap.get(p.region)!.prix.push(prix);
        });

        const result: ProduitMoyenneEtendue[] = Array.from(regionMap.entries()).map(
            ([region, { prix }]) => ({
                region,
                min: Math.min(...prix),
                max: Math.max(...prix),
                moyenne: prix.reduce((a, b) => a + b, 0) / prix.length,
                nbMarches: prix.length,
            })
        );

        return result;
    } catch (error) {
        return [];
    }
};
