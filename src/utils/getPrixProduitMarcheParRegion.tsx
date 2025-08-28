import { GET_ALL_VALIDATION_T } from "../types";

interface MarcheCollectes {
    marche: string;
    collectes: GET_ALL_VALIDATION_T[];
}

interface ProcessedMarketData {
    marche: string;
    prixActuel: number | null;
    dateActuelle: string | null;
    nbrCollecteActuel: number | null;
    prixPrecedent: number | null;
    datePrecedente: string | null;
    nbrCollectePrecedente: number | null;
    evolution: number | null;
}

// Helper function to re-format "DD/MM/YYYY" to "YYYY-MM-DD"
const formatToISODate = (dateStr: string): string | null => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${year}-${month}-${day}`;
    }
    return null;
};

export const getPrixProduitMarcheParRegion = (
    data: MarcheCollectes[]
): ProcessedMarketData[] => {
    // Filter out markets with no valid collections
    const filteredData = data.filter(({ collectes }) => {
        const validCollectes = collectes.filter((p) => {
            const isoDate = formatToISODate(p.dateCollecte);
            if (!isoDate) return false;
            const dateObj = new Date(isoDate);
            return !isNaN(dateObj.getTime());
        });
        return validCollectes.length > 0;
    });

    return filteredData.map(({ marche, collectes }) => {
        // Group valid collections by date
        const validCollectes = collectes.filter((p) => {
            const isoDate = formatToISODate(p.dateCollecte);
            if (!isoDate) return false;
            const dateObj = new Date(isoDate);
            return !isNaN(dateObj.getTime());
        });

        const groupedByDate = validCollectes.reduce((acc, p) => {
            const isoDate = formatToISODate(p.dateCollecte);
            const date = new Date(isoDate!).toISOString().split("T")[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(p);
            return acc;
        }, {} as { [key: string]: GET_ALL_VALIDATION_T[] });

        // Sort collection dates from most recent to oldest
        const sortedDates = Object.keys(groupedByDate).sort().reverse();

        // Extract current data
        const derniereDate = sortedDates[0];
        const collectesActuelles = groupedByDate[derniereDate];
        const prixActuel =
            collectesActuelles.reduce((sum, p) => sum + parseFloat(p.prix), 0) /
            collectesActuelles.length;
        const nbrCollecteActuel = collectesActuelles.length;

        // Extract previous data if it exists
        let prixPrecedent: number | null = null;
        let datePrecedente: string | null = null;
        let nbrCollectePrecedente: number | null = null;

        if (sortedDates.length > 1) {
            const datePrecedenteKey = sortedDates[1];
            const collectesPrecedentes = groupedByDate[datePrecedenteKey];
            prixPrecedent =
                collectesPrecedentes.reduce((sum, p) => sum + parseFloat(p.prix), 0) /
                collectesPrecedentes.length;
            datePrecedente = datePrecedenteKey;
            nbrCollectePrecedente = collectesPrecedentes.length;
        }

        // Calculate evolution
        const evolution =
            prixPrecedent !== null ? ((prixActuel - prixPrecedent) / prixPrecedent) * 100 : null;

        return {
            marche,
            prixActuel,
            dateActuelle: derniereDate,
            nbrCollecteActuel,
            prixPrecedent,
            datePrecedente,
            nbrCollectePrecedente,
            evolution,
        };
    });
};