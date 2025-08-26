export type USE_STATE_T = React.Dispatch<React.SetStateAction<any>>

export type LOADING_STATE_T = "En cours de chargement."
  | "Chargement finit."
  | "Chargement échoué."
  | "Chargememnt reussi"
  | "En attente"
  | null;

export interface GET_ALL_VALIDATION_T {
  idValidation: number;
  numFiche: string;
  region: string;
  departement: string;
  arrondissement: string;
  commune: string;
  localite: string;
  marche: string;
  categorie: string;
  sousCategorie: string;
  produit: string;
  qualiteProduit: string | null;
  photo: string;
  dateCollecte: string;
  dateEnregistrement: string;
  dateValidation: string | null;
  prix: string;
  variete: string | null;
  niveauApprovisionnement: string | null;
  enqueteur: string;
  numeroEnqueteur: string;
  superviseur: string;
};
