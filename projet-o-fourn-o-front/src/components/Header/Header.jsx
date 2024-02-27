import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuBurger from './MenuBurger/MenuBurger';
import MenuProfil from '../Profil/MenuProfil';
import Logo from '../../assets/img/logo.svg';
import iconConnexion from '../../assets/img/iconConnexion.svg';
import SearchBar from '../SearchBar/SearchBar';

import './Header.scss';

// Ce composant représente l'en-tête de l'application
function Header({ onOpenModal }) {
  // Utilisation du hook useSelector pour accéder à l'état d'authentification
  const auth = useSelector((state) => state.auth);
  return (
    <div className="header">
      <div className="burgerButton">
        {/* Le bouton du menu burger */}
        <MenuBurger />
      </div>
      <div>
        {/* Le logo de l'application, qui est un lien vers la page d'accueil */}
        <Link to="/" className="logo-link">
          <img className="logo" src={Logo} alt="Logo du site" />
        </Link>
      </div>
      <div className="searchBar-desktop">
        <SearchBar />
      </div>
      {/* Si l'utilisateur est authentifié, affiche le bouton de profil */}
      {auth.status === 'succeeded' && (
        <div className="profilButton">
          <MenuProfil />
        </div>
      )}
      {/* Si l'utilisateur n'est pas authentifié, affiche le bouton de connexion */}
      {(auth.status === 'pending' ||
        auth.status === 'idle' ||
        auth.status === 'failed') && (
        <button type="button" className="connexionButton" onClick={onOpenModal}>
          <img src={iconConnexion} alt="Se connecter" /> Connexion
        </button>
      )}
    </div>
  );
}

// Définition des propTypes pour le composant Header
Header.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};

export default Header;
