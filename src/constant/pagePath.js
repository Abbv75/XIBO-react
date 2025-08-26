import { faCog, faLifeRing, faUserAstronaut, faHomeAlt, faHouseLaptop } from "@fortawesome/free-solid-svg-icons";

export default [
    {
        label: 'Selection de boutique',
        href: '/accueil',
        icon: faHouseLaptop
    },
    {
        label: 'Gestion des utilisateurs',
        href: '/utilisateur',
        icon: faUserAstronaut,
    },
    {
        label: 'Gestion des boutiques',
        href: '/boutique',
        icon: faHomeAlt,
    },
    {
        label: 'Gestion des employer',
        href: '/employe',
        icon: faHomeAlt,
    },
    {
        label: 'Inventaire',
        icon: faCog,
        subItems: [
            {
                label: 'Module de paramétrage',
                href: '/parametrage'
            },
            {
                label: 'Gestion des produits',
                href: '/produit'
            },
        ],
    },
    {
        label: 'Assistance & Aide',
        icon: faLifeRing
    },

]