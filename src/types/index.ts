export type USE_STATE_T = React.Dispatch<React.SetStateAction<any>>

export type LOADING_STATE_T = "En cours de chargement."
    | "Chargement finit."
    | "Chargement échoué."
    | "Chargememnt reussi"
    | "En attente"
    | null;


//  interface User
export type Contact = {
    id?: number;
    telephone: string;
    email?: string | null;
    whatsapp?: string | null;
    address?: string;
    created_at?: string;
    updated_at?: string;
};


export type Role = {
    id: number;
    nom: string;
    description: string;
    created_at: string | null;
    updated_at: string | null;
};

export type CATEGORIE_T = {
    id: number;
    nom: string;
    description?: string;
    created_at?: string | null;
    updated_at?: string | null;
}

export type User = {
    id: number;
    nomComplet: string;
    login: string;
    created_at: string;
    updated_at: string;
    id_role: number;
    id_contact: number;
    contact: Contact;
    role: Role;
    boutiques: Boutique[];
};

export type Proprietaire = {
    id: number;
    nomComplet: string;
    login: string;
    created_at: string;
    updated_at: string;
    id_role: number;
    id_contact: number;
    laravel_through_key: number;
    contact: Contact;
    role: Role;
};

export type UserPayload = {
    nomComplet: string;
    login: string;
    password: string;
    id_role: number;
    telephone: string;
    address?: string;
    email?: string;
    whatsapp?: string;
};



export type Boutique = {
    id: number;
    nom: string;
    image: File | null;
    pourcentageProduit?: number | null;
    debutAbonnement: string;
    finAbonnement: string;
    isPartenaire: boolean;
    typeAbonnement?: number | null
    created_at: string;
    updated_at: string;
    id_contact: number;
    contact: Contact;
    proprietaire: Proprietaire[];
};


export interface BoutiquePayload {
    nom: string;
    image?: File | null;
    telephone?: string;
    email?: string;
    address?: string;
    whatsapp?: string;
    id_user?: number;
    nbrMoisAbonnement?: number | null;
    isPartenaire?: boolean;
    pourcentageProduit?: number | null;
    typeAbonnement?: number | null
}

export interface UptatedBoutique {
    nom: string;
    image?: File | null;
    telephone?: string;
    email?: string;
    address?: string;
    whatsapp?: string;
    pourcentageProduit?: number | null;
    debutAbonnement?: string;
    finAbonnement?: string
    isPartenaire: boolean;
}

export interface Employer {
    id: number;
    nomComplet: string;
    login: string;
    password: string;
    telephone: string;
    adress: string;
    email: string;
    whatsapp: string;
    id_role: number;
    role: Role;
    contact: Contact;
}

// Pour la création ou mise à jour : sans `id`, `role` et `contact` complets
export interface EmployerPayload {
    nomComplet: string;
    login: string;
    password: string;
    telephone: string;
    adress: string;
    email: string;
    whatsapp: string;
    id_role: number;
}

export type IMAGE_T = {
    id: number;
    image: string;
    id_produit: number;
};

export type PRODUIT_T = {
    id: number;
    nom: string;
    prixAchat: number;
    prixVenteDetails: number;
    prixVenteEngros: number;
    quantite: number;
    id_boutique: number;
    id_categorie: number;
    images: IMAGE_T[];
    categorie: CATEGORIE_T;
    description?: string;
};


// types.ts
export type ProductFormData = {
    nom: string; // Le nom du produit
    prixAchat: number; // Prix d'achat (type number pour un prix en float)
    prixVenteDetails: number; // Prix de vente au détail
    prixVenteEngros: number; // Prix de vente en gros
    quantite: number; // Quantité en stock
    id_categorie: number; // ID de la catégorie
    image: string | null; // Image du produit, peut être une URL ou binaire (ici on le garde en string pour gérer l'upload d'image)
    description: string; // Description du produit
};



export type ImageProduit = {
  id: number;
  image: string;
  id_produit: number;
};

export type Categorie = {
  id: number;
  nom: string;
  description: string;
  id_boutique: number;
};

export type Produit = {
  id: number;
  nom: string;
  prixAchat: number;
  prixVenteDetails: number;
  prixVenteEngros: number;
  quantite: number;
  id_boutique: number;
  id_categorie: number;
  images: ImageProduit[];
  categorie: Categorie;
};

export type TypeAbonnement = {
  id: number;
  nom: string;
  description: string;
  prix: number;
};


export type Client = {
  id: number;
  nomComplet: string;
  id_contact: number;
  contact: Contact;
};

export type VenteProduit = {
  id: number;
  id_vente: number;
  id_produit: number;
  quantite: number;
  montant: number;
  produit: Produit;
};

// Type principal pour une vente
export type Vente = {
  id: number;
  montant: number;
  date: string; // Date de la vente au format ISO
  reduction?: number;
  id_boutique: number;
  id_client: number;
  boutique: Boutique;
  client: Client;
  vente_produits: VenteProduit[];
    created_at?: string;
};

export type VentPayload = {
  client: {
    nomComplet: string;
    telephone: string;
    email: string;
    adresse: string;
    whatsapp: string;
  };
  produitsList: {
    id: number;
    quantite: number;
    montant: number;
  }[];
  is_detail: boolean;
};
