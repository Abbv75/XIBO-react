export type USE_STATE_T<T = any> = React.Dispatch<React.SetStateAction<T>>

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
  precedent?: GET_ALL_VALIDATION_T;
  codeProduit: string
};

export interface PAGE_T {
  id: string;
  component: React.ReactNode;
  duration: number;
  preload?: boolean;
};

export interface FILIERE_T {
  id_filiere: number;
  code_filiere: string;
  libelle: string;
  description: string;
  date_ajout: string;
  date_modif: string | null;
  statut: boolean | null;
}

export interface CATEGORIE_PRODUIT_T {
  id_categorie_produit: number;
  code_categorie: string;
  libelle: string;
  description: string;
  date_ajout: string;
  date_modif: string | null;
  filiere: FILIERE_T;
}

export interface FORME_PRODUIT_T {
  id_forme_produit: number;
  code_forme: string;
  libelle: string;
  description: string;
  date_ajout: string;
  date_modif: string | null;
}

export interface PRODUIT_T {
  id_produit: number;
  code_produit: string;
  nom_produit: string;
  image: string;
  description: string;
  date_ajout: string;
  date_modif: string | null;
  statut: boolean;
  categorie_produit: CATEGORIE_PRODUIT_T;
  forme_produit: FORME_PRODUIT_T;
}
