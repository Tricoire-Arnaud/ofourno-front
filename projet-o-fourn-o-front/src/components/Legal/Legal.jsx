// Importation du module React depuis la bibliothèque 'react'
import React from 'react';

// Importation du fichier de style 'Legal.scss'
import './Legal.scss';

// Définition du composant 'Legal' sous forme de fonction
function Legal() {
  // La fonction 'Legal' retourne du JSX qui représente la structure de la section des mentions légales
  return (
    <div className="legal">
      {' '}
      {/* Div principale avec la classe 'legal' */}
      <h2 className="legal-title">Mentions légales</h2>{' '}
      {/* Titre avec la classe 'legal-title' */}
      <p className="legal-paragraph">
        Ce site web est édité par Ofourno SAS, une société par actions
        simplifiée au capital de 50 000 euros, immatriculée au registre du
        commerce et des sociétés sous le numéro 123456789, dont le siège social
        est situé 123 Rue des Saveurs, 75000 Ville Gourmande.
      </p>{' '}
      {/* Paragraphe avec la classe 'legal-paragraph' */}
      <p className="legal-paragraph">
        Directeur de la publication : Emma Martin <br /> Adresse e-mail :
        contact@ofourno.com <br /> Numéro de téléphone : +33 1 23 45 67 89
      </p>{' '}
      {/* Paragraphe avec la classe 'legal-paragraph' */}
      <p className="legal-paragraph">
        Hébergeur du site web : Hébergement Web International, 456 Avenue du
        Net, 10000 VilleServeur, +33 1 23 45 67 89, contact@hebergementweb.com.
      </p>{' '}
      {/* Paragraphe avec la classe 'legal-paragraph' */}
      <p className="legal-paragraph">
        Ce site web est soumis au respect de la loi n° 78-17 du 6 janvier 1978
        relative à l&apos;informatique, aux fichiers et aux libertés.
        Conformément à cette loi, vous disposez d&apos;un droit d&apos;accès, de
        rectification et de suppression des données vous concernant. Pour
        exercer ce droit, veuillez contacter contact@ofourno.com.
      </p>{' '}
      {/* Paragraphe avec la classe 'legal-paragraph' */}
      <p className="legal-paragraph">
        Les informations fournies sur ce site le sont à titre informatif
        uniquement. Ofourno SAS ne saurait être tenu responsable de
        l&apos;exactitude, de l&apos;exhaustivité ou de la pertinence des
        informations fournies sur ce site. En conséquence, l&apos;utilisateur
        reconnaît utiliser ces informations sous sa responsabilité exclusive.
      </p>{' '}
      {/* Paragraphe avec la classe 'legal-paragraph' */}
      <p className="legal-paragraph">
        Les recettes publiées sur ce site sont la propriété intellectuelle de
        Ofourno SAS et/ou de leurs auteurs respectifs. Toute reproduction,
        diffusion ou utilisation des recettes à des fins commerciales est
        strictement interdite sans l&apos;autorisation préalable de Ofourno SAS
        et/ou de l&apos;auteur concerné.
      </p>{' '}
      {/* Paragraphe avec la classe 'legal-paragraph' */}
    </div>
  );
}

// Exportation du composant 'Legal' comme composant par défaut pour pouvoir l'utiliser ailleurs
export default Legal;
