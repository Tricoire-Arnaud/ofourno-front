import React from 'react';
import PropTypes from 'prop-types';
import SignImage from '../../assets/img/sign.svg';
import './sign.scss';

// Définition du composant Sign qui reçoit une prop 'text'
function Sign({ text }) {
  return (
    <div className="SectionSign">
      {/* Conteneur principal du composant */}
      <div className="SignComplete">
        {/* Conteneur de l'image et du texte */}
        <img className="Sign" src={SignImage} alt="Sign" />
        {/* Image du signe */}
        <div className="TextSign">{text}</div>
        {/* Texte du signe, passé en tant que prop */}
      </div>
    </div>
  );
}

// Définition des propTypes pour le composant Sign
Sign.propTypes = {
  text: PropTypes.string.isRequired, // 'text' est une prop de type string et est requise
};

export default Sign;
// Exportation du composant Sign par défaut
