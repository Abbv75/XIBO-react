import PrixProduitMarcheParRegion from '../PrixProduitMarcheParRegion'
import PrixCategorieParRegion from '../PrixCategorieParRegion'
import { memo } from 'react'

const ChargeurDePage = memo(() => {
    return (
        <>
            <PrixProduitMarcheParRegion produit="Oignon bulbe" />
            <PrixProduitMarcheParRegion produit="Oignon Local" />
            <PrixCategorieParRegion />
        </>
    )
})

export default ChargeurDePage