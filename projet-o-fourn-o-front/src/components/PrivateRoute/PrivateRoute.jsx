// Importation des modules React nécessaires
import React from 'react';
import { Navigate } from 'react-router-dom'; // Importation de Navigate pour la redirection
import PropTypes from 'prop-types'; // Importation de PropTypes pour la validation des types de props

// Définition du composant PrivateRoute
function PrivateRoute({ children }) {
  // Récupération du token depuis le stockage local (localStorage)
  const token = localStorage.getItem('token');

  // Vérification de l'existence du token
  // Si le token existe, le composant rend les enfants (c'est-à-dire le contenu protégé)
  // Sinon, le composant effectue une redirection vers la route '/' (la page d'accueil)
  return token ? children : <Navigate to="/" replace />;
}

// Définition des types de props attendus par le composant PrivateRoute
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // children doit être un noeud React (comme une chaîne de caractères, un composant, etc.)
};

// Exportation du composant PrivateRoute
export default PrivateRoute;
