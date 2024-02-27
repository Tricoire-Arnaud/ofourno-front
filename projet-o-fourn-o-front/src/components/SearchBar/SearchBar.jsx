// Importation des dépendances nécessaires
import React, { useState } from 'react'; // Importation de React et du Hook useState
import { useNavigate, useLocation } from 'react-router-dom'; // Importation des Hooks useNavigate et useLocation de react-router-dom
import iconSearch from '../../assets/img/iconSearch.svg'; // Importation de l'icône de recherche
import './SearchBar.scss'; // Importation du style

// Définition du composant SearchBar
function SearchBar({ className }) {
  const navigate = useNavigate(); // Utilisation du Hook useNavigate pour la navigation programmée
  const location = useLocation(); // Utilisation du Hook useLocation pour accéder à l'emplacement actuel
  const [searchTerm, setSearchTerm] = useState(''); // Définition de l'état local pour le terme de recherche

  // Ne pas afficher la barre de recherche sur la page de profil
  if (location.pathname === '/profil') {
    return null; // Si l'emplacement actuel est la page de profil, ne rien rendre
  }

  // Définition de la fonction de gestion de la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut de la soumission du formulaire
    if (searchTerm.trim() === '') {
      return; // Si le terme de recherche est vide, ne rien faire
    }
    setSearchTerm(''); // Réinitialiser le terme de recherche
    navigate('/results', { state: { searchTerm: searchTerm.trim() } }); // Naviguer vers la page de résultats avec le terme de recherche comme état
  };

  // Rendu du composant
  return (
    <form onSubmit={handleSubmit} className={`search-bar ${className}`}>
      {/* Lorsque le formulaire est soumis, appeler la fonction handleSubmit */}
      <div className="search-bar-wrapper">
        <div className="div">
          <input
            type="text"
            placeholder="Rechercher une recette..." // Placeholder pour l'input
            onChange={(e) => setSearchTerm(e.target.value)} // Lorsque la valeur de l'input change, mettre à jour le terme de recherche
            className="search-input"
          />
          <button type="submit" className="search-button">
            {/* Bouton pour soumettre le formulaire */}
            <img
              className="iconSearch"
              alt="Loupe pour recherche" // Texte alternatif pour l'image
              src={iconSearch} // Source de l'image
            />
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar; // Exportation du composant SearchBar par défaut
