import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import list from '../../assets/list.svg';
import Logo from '../../assets/logo.svg';
import onnexion from '../../assets/connexion.svg';

import './Header.scss';

function Header() {
  return (
    <div className="header">
      <img className="list" src={list} alt="Menu liste déroulante" />
      <img className="logo" src={Logo} alt="Logo" />
      <img className="connexion" src={Connexion} alt="Connexion" />
    </div>
  );
}

export default Header;
