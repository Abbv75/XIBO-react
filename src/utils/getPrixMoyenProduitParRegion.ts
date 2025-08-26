import { GET_ALL_VALIDATION_T } from "../types";

interface ProduitMoyenne {
    region: string;
    moyenne: number;
}

export default (res: GET_ALL_VALIDATION_T[]) => {
    // Dernier prix par marché
    try {
        const marcheMap = new Map<string, GET_ALL_VALIDATION_T>();
        res.forEach((p) => {
            const exist = marcheMap.get(p.marche);
            if (!exist || new Date(p.dateCollecte) > new Date(exist.dateCollecte)) {
                marcheMap.set(p.marche, p);
            }
        });

        const dernierPrixParMarche = Array.from(marcheMap.values());

        // Moyenne par région
        const regionMap = new Map<string, { somme: number; count: number }>();
        dernierPrixParMarche.forEach((p) => {
            const prix = parseFloat(p.prix);
            if (!regionMap.has(p.region)) regionMap.set(p.region, { somme: 0, count: 0 });
            const entry = regionMap.get(p.region)!;
            entry.somme += prix;
            entry.count += 1;
        });

        const moyennesParRegion: ProduitMoyenne[] = Array.from(regionMap.entries()).map(
            ([region, { somme, count }]) => ({
                region,
                moyenne: count ? somme / count : 0,
            })
        );

        return moyennesParRegion
    } catch (error) {
        return []
    }
}