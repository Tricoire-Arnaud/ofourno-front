import React from 'react';
import list from '../../assets/list.svg';
import Logo from '../../assets/logo.svg';
import Connexion from '../../assets/connexion.svg';

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

<div className="Header" style={{width: '100%', height: '100%', paddingLeft: 42, paddingRight: 42, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
    <div className="List" style={{height: 37, paddingLeft: 10, paddingRight: 10, paddingTop: 12, paddingBottom: 12, background: '#9CB7C9', borderRadius: 10, overflow: 'hidden', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
        <div className="Vector" style={{width: 16.45, height: 13.45, background: 'white', borderRadius: 50}}></div>
    </div>
    <div className="ConnexionButton" style={{width: 37, height: 37, padding: 6, background: '#9CB7C9', borderRadius: 10, overflow: 'hidden', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
        <div className="Vector" style={{alignSelf: 'stretch', flex: '1 1 0', background: 'white'}}></div>
    </div>
</div>
