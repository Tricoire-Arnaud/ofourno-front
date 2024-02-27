import React from 'react';
import './Error.scss';
import ImageNotFound from '../../assets/img/ImageNotFound.jpg';

// Définition du composant Error
function Error() {
  return (
    // Création d'une div avec la classe "error"
    <div className="error">
      {/* Création d'une div avec la classe "content" */}
      <div className="content">
        {/* Affichage d'un titre "Oops!" */}
        <h1>Oops!</h1>
        {/* Affichage d'un paragraphe de texte */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          euismod, metus nec convallis faucibus, metus massa lacinia elit, at
          bibendum nisi purus id justo.
        </p>
        {/* Création d'un bouton qui, lorsqu'il est cliqué, ramène l'utilisateur
        à la page précédente */}
        <button type="button" onClick={() => window.history.back()}>
          GO BACK
        </button>
      </div>
      {/* Création d'une div avec la classe "chef-illustration" */}
      <div className="chef-illustration" />
      {/* Affichage d'une image avec la classe "img-error" */}
      <img src={ImageNotFound} alt="Error" className="img-error" />
    </div>
  );
}

export default Error;
