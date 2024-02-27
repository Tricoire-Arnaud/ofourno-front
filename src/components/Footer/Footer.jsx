// Importation des dépendances nécessaires
import React from 'react';
import { NavLink } from 'react-router-dom'; // Pour la navigation entre les pages
import Facebook from '../../assets/img/Facebook.svg'; // Importation de l'image Facebook
import Instagram from '../../assets/img/Instagram.svg'; // Importation de l'image Instagram
import Xlogo from '../../assets/img/Xlogo.svg'; // Importation de l'image Xlogo
import './Footer.scss'; // Importation du fichier de style

// Définition du composant Footer
function Footer() {
  return (
    // Conteneur principal du pied de page
    <div className="footer">
      {/* Conteneur pour les icônes des réseaux sociaux */}
      <div className="social">
        {/* Lien vers la page Facebook */}
        <a
          href="https://www.facebook.com"
          target="_blank" // Ouvre le lien dans un nouvel onglet
          rel="noopener noreferrer" // Mesures de sécurité pour l'ouverture de nouveaux onglets
        >
          {/* Image Facebook */}
          <img className="Facebook" alt="Facebook" src={Facebook} />
        </a>
        {/* Lien vers la page Instagram */}
        <a
          href="https://www.instagram.com"
          target="_blank" // Ouvre le lien dans un nouvel onglet
          rel="noopener noreferrer" // Mesures de sécurité pour l'ouverture de nouveaux onglets
        >
          {/* Image Instagram */}
          <img className="Instagram" alt="Instagram" src={Instagram} />
        </a>
        {/* Lien vers la page Twitter */}
        <a
          href="https://twitter.com/"
          target="_blank" // Ouvre le lien dans un nouvel onglet
          rel="noopener noreferrer" // Mesures de sécurité pour l'ouverture de nouveaux onglets
        >
          {/* Image Xlogo */}
          <img className="Xlogo" alt="Xlogo" src={Xlogo} />
        </a>
      </div>
      {/* Conteneur pour le texte du pied de page */}
      <div className="text-footer">
        {/* Lien vers les mentions légales */}
        <NavLink className="text-wrapper" to="/legal">
          Mentions légales
        </NavLink>
        {/* Lien pour contacter l'entreprise */}
        <NavLink className="text-wrapper" to="/contact">
          Nous contacter
        </NavLink>
        {/* Lien vers les conditions générales d'utilisation */}
        <NavLink className="text-wrapper" to="/terms">
          Conditions générales d&apos;utilisation
        </NavLink>
      </div>
    </div>
  );
}

// Exportation du composant Footer pour qu'il puisse être utilisé dans d'autres composants
export default Footer;
