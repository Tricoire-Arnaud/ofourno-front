/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import login from '../../actions/authActions';

import './ConnexionModal.scss';
import 'react-toastify/dist/ReactToastify.css';

// Définition du composant ConnexionModal
function ConnexionModal({ onClose }) {
  // Définition des états pour le courrier électronique et le mot de passe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Utilisation des hooks useDispatch et useSelector pour accéder au store Redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Utilisation du hook useNavigate pour la redirection
  const navigate = useNavigate();

  // Utilisation du hook useEffect pour gérer les effets de bord
  useEffect(() => {
    if (auth.status === 'succeeded') {
      // Stockage des informations d'authentification dans le local storage
      localStorage.setItem(
        'auth',
        JSON.stringify({ email, authStatus: auth.status })
      );

      // Planifie la redirection immédiatement après une connexion réussie
      const timer = setTimeout(() => {
        onClose(); // Ferme le modal de connexion
        navigate('/profil?tab=Cuisine'); // Redirige vers la page de profil
      }, 1100); // Un délai court pour s'assurer que les transitions sont fluides

      return () => {
        clearTimeout(timer);
      }; // Nettoie le timer
    }
    // Pas besoin de gérer auth.status === 'failed' ici si les toasts sont gérés dans l'action Redux
  }, [auth, onClose, navigate]);

  // Fonction pour gérer le clic sur l'arrière-plan
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // Rendu du composant ConnexionModal
  return (
    <div className="modalBackground" onClick={handleBackgroundClick}>
      <div className="modalContainer">
        <form className="connexionForm" onSubmit={handleSubmit}>
          <label htmlFor="email">
            <div className="input-wrapper">
              <div className="icon">&#9993;</div>
              <input
                id="email"
                type="email"
                className="input-email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <div className="icon">&#128274;</div>
              <input
                id="password"
                type="password"
                className="input-password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>
          <div className="Forgotpassword">
            <a href="/Forgotpassword">Mot de passe oublié ?</a>
          </div>
          <button type="submit" className="submitConnexion">
            Connexion
          </button>
          <div className="inscriptionLink">
            Vous n&apos;avez pas de compte ?
            <a href="/registration">Inscrivez-vous</a>
          </div>
        </form>
      </div>
    </div>
  );
}

// Définition des propTypes pour le composant ConnexionModal
ConnexionModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ConnexionModal;
