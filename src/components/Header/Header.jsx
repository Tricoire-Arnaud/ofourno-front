// Importation des dépendances nécessaires
import React from 'react'; // Bibliothèque React
import MenuBurger from '../../assets/Vector1.svg'; // Image SVG pour le menu burger
import Logo from '../../assets/logo.svg'; // Image SVG pour le logo
import Connexion from '../../assets/Vector2.svg'; // Image SVG pour le bouton de connexion

import './Header.scss'; // Importation du fichier de styles CSS pour ce composant

// Définition du composant Header
function Header() {
  // Le composant retourne une structure JSX
  return (
    // Un div parent avec la classe "Header"
    <div className="Header">
      {/* Un div pour la liste avec une image pour le menu burger */}
      <div className="List">
        <img className="Vector1" src={MenuBurger} alt="Vector1" />
      </div>
      {/* Un div pour le logo */}
      <div>
        <img className="logo" src={Logo} alt="Logo" />
      </div>
      {/* Un div pour le bouton de connexion avec une image */}
      <div className="ConnexionButton">
        <img className="Vector2" src={Connexion} alt="Vector2" />
      </div>
    </div>
  );
}

// Exportation du composant Header pour qu'il puisse être utilisé dans d'autres fichiers
export default Header;
