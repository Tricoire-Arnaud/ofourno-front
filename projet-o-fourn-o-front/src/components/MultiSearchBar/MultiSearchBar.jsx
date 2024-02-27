// Import des modules React nécessaires
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Import de l'action addSearchTerm depuis le fichier d'actions searchActions
import { addSearchTerm } from '../../actions/searchActions';

// Import de l'icône de recherche depuis le fichier d'images
import iconSearch from '../../assets/img/iconSearch.svg';

// Import du fichier de style 'MultiSearchBar.scss'
import './MultiSearchBar.scss';

// Définition du composant 'MultiSearchBar'
function MultiSearchBar() {
  // Utilisation du hook useState pour gérer l'état de la barre de recherche
  const [searchTerm, setSearchTerm] = useState('');

  // Utilisation du hook useDispatch pour obtenir la fonction de dispatch Redux
  const dispatch = useDispatch();

  // Fonction de gestion de la soumission du formulaire de recherche
  const handleSubmit = (event) => {
    // Empêche le comportement par défaut du formulaire
    event.preventDefault();
    // Vérifie si le terme de recherche n'est pas vide
    if (searchTerm.trim() !== '') {
      // Dispatch de l'action addSearchTerm avec le terme de recherche comme argument
      dispatch(addSearchTerm(searchTerm));
      // Réinitialisation du terme de recherche à une chaîne vide
      setSearchTerm('');
    }
  };

  // Rendu JSX du composant 'MultiSearchBar'
  return (
    <div>
      <form onSubmit={handleSubmit} className="search-bar">
        <div className="search-bar-wrapper">
          <div className="div">
            <input
              type="text"
              placeholder="Rechercher par ingrédient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              {/* Icône de loupe pour la recherche */}
              <img
                className="iconSearch"
                alt="Loupe pour la recherche"
                src={iconSearch}
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Exportation du composant 'MultiSearchBar'
export default MultiSearchBar;
