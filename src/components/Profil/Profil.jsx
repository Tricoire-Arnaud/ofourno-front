/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
// Importation des dépendances nécessaires
import React, { useEffect, useState } from 'react'; // Importation de React et des hooks useEffect et useState
import { useSelector, useDispatch } from 'react-redux'; // Importation des hooks useSelector et useDispatch de Redux
import { useNavigate, useLocation } from 'react-router-dom'; // Importation des hooks useNavigate et useLocation de react-router-dom
import { toast } from 'react-toastify'; // Importation de la fonction toast de react-toastify pour afficher des notifications
import { removeSearchTerm } from '../../actions/searchActions'; // Importation de l'action removeSearchTerm
import updateUserInformation from '../../actions/userActions'; // Importation de l'action updateUserInformation
import { logout } from '../../features/authSlice'; // Importation de l'action logout
import { deleteAccountAsync } from '../../features/deleteSlice'; // Importation de l'action deleteAccount
import {
  fetchAndFilterRecipes,
  clearRecipesResults,
} from '../../features/recipesSlice'; // Importation des actions fetchAndFilterRecipes et clearRecipesResults
import Card from '../Card/Card'; // Importation du composant Card
import ImageNotFound from '../../assets/img/ImageNotFound.jpg'; // Importation de l'image ImageNotFound

import './Profil.scss'; // Importation du fichier de style Profil.scss

// Définition du composant Profil
function Profil() {
  const navigate = useNavigate(); // Utilisation du hook useNavigate pour naviguer entre les pages
  const dispatch = useDispatch(); // Utilisation du hook useDispatch pour dispatcher des actions Redux
  const location = useLocation(); // Utilisation du hook useLocation pour accéder à l'emplacement actuel
  const favorites = useSelector((state) => state.favorites); // Utilisation du hook useSelector pour accéder aux favoris dans l'état Redux
  // Définition de l'état local pour le formulaire avec useState. Les valeurs initiales sont récupérées depuis le localStorage.
  const [form, setForm] = useState({
    email: localStorage.getItem('email') || '',
    pseudo: localStorage.getItem('pseudo') || '',
    username: localStorage.getItem('username') || '',
    password: '',
  });

  // Cette fonction gère le changement des inputs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target; // Récupère le nom et la valeur de l'input modifié
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Met à jour la clé spécifique basée sur le nom de l'input
    }));
  };

  // Cette fonction gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    // Validation basique (exemple simplifié, à adapter selon les besoins)
    if (!form.email || !form.pseudo || !form.username) {
      return; // Stoppe la fonction si la validation échoue
    }

    const userId = localStorage.getItem('id'); // Récupère l'ID de l'utilisateur depuis le localStorage
    dispatch(updateUserInformation({ ...form, userId })); // Dispatch l'action pour mettre à jour les informations de l'utilisateur
  };

  // Sélectionne les recettes et les termes de recherche de l'état Redux
  const {
    items: recipes,
    isLoading,
    error,
  } = useSelector((state) => state.recipes);
  const reduxSearchTerms = useSelector((state) => state.search.searchTerms);

  const [activeTab, setActiveTab] = useState('Ma Cuisine'); // État pour gérer l'onglet actif

  // Cette fonction gère la déconnexion de l'utilisateur
  const handleLogout = () => {
    dispatch(logout()); // Dispatch l'action de déconnexion
    localStorage.removeItem('token'); // Supprime le token du localStorage
    toast.success('Déconnexion réussie.', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate('/'); // Redirige vers la page d'accueil
  };

  const handleDeleteAccount = () => {
    const isConfirmed = window.confirm(
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
    );

    if (isConfirmed) {
      const userId = localStorage.getItem('id');
      dispatch(deleteAccountAsync(userId));
      dispatch(logout()); // Dispatch l'action de déconnexion
      localStorage.removeItem('token'); // Supprime le token du localStorage
      toast.success('Suppression réussie. Redirection en cours...', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/'); // Redirige vers la page d'accueil
    }
  };

  // Cette fonction supprime un terme de recherche
  const removeTerm = (term) => {
    dispatch(removeSearchTerm(term)); // Dispatch l'action pour supprimer un terme de recherche
  };

  // Cette fonction recherche des recettes basées sur les termes de recherche
  const handleFindRecipes = () => {
    dispatch(fetchAndFilterRecipes(reduxSearchTerms)); // Dispatch l'action pour rechercher et filtrer des recettes
  };

  // Cet effet recherche des recettes chaque fois que les termes de recherche changent
  useEffect(() => {
    if (reduxSearchTerms.length > 0) {
      handleFindRecipes(); // Appelle la fonction handleFindRecipes
    } else {
      dispatch(clearRecipesResults()); // Si aucun terme de recherche, efface les résultats de recettes
    }
  }, [reduxSearchTerms, dispatch]);

  // Cette fonction rend les recettes trouvées
  const renderRecipes = () => {
    if (isLoading) return <div>Chargement...</div>; // Si les recettes sont en cours de chargement, affiche "Chargement..."
    if (error) return <div>Erreur : {error}</div>; // Si une erreur s'est produite, l'affiche
    if (recipes.length > 0) {
      return recipes.map((recipe) => {
        // Si des recettes ont été trouvées, les rend
        const recipeImageUrl = recipe.picture ? recipe.picture : ImageNotFound; // Utilise l'image de la recette si elle existe, sinon utilise une image par défaut
        return (
          <Card
            key={recipe.id}
            id={recipe.id}
            imageUrl={recipeImageUrl}
            dishName={recipe.name}
            rating={recipe.rating}
          />
        );
      });
    }
    return null; // Si aucune recette n'a été trouvée, ne rend rien
  };

  // Cet effet met à jour l'onglet actif en fonction de l'URL
  useEffect(() => {
    const params = new URLSearchParams(location.search); // Crée un objet URLSearchParams à partir de la chaîne de requête de l'URL
    const tab = params.get('tab'); // Récupère la valeur du paramètre 'tab'
    if (tab) setActiveTab(tab.charAt(0).toUpperCase() + tab.slice(1)); // Si 'tab' existe, met à jour l'onglet actif
  }, [location]); // Dépend de l'emplacement
  // Le composant Profil est rendu ici
  return (
    // Le conteneur principal du profil
    <div className="profil">
      {/* Les onglets de navigation du profil */}
      <div className="tabs">
        {/* Onglet de la cuisine */}
        <div className="kitchen">
          <button
            type="button"
            // Ajoute la classe 'active' si l'onglet actif est 'Cuisine'
            className={`tabs ${activeTab === 'Cuisine' ? 'active' : ''}`}
            // Change l'onglet actif en 'Cuisine' lorsqu'il est cliqué
            onClick={() => setActiveTab('Cuisine')}
          >
            Ma Cuisine
          </button>
        </div>
        {/* Onglet des informations personnelles */}
        <div className="personnal">
          <button
            type="button"
            // Ajoute la classe 'active' si l'onglet actif est 'Informations'
            className={`tabs ${activeTab === 'Informations' ? 'active' : ''}`}
            // Change l'onglet actif en 'Informations' lorsqu'il est cliqué
            onClick={() => setActiveTab('Informations')}
          >
            Mes Infos Personnelles
          </button>
        </div>
        {/* Onglet des recettes favorites */}
        <div className="favorites-tabs">
          <button
            type="button"
            // Ajoute la classe 'active' si l'onglet actif est 'Favoris'
            className={`tabs ${activeTab === 'Favoris' ? 'active' : ''}`}
            // Change l'onglet actif en 'Favoris' lorsqu'il est cliqué
            onClick={() => setActiveTab('Favoris')}
          >
            Mes Recettes Favorites
          </button>
        </div>
      </div>
      {/* Affiche le contenu de l'onglet 'Cuisine' si c'est l'onglet actif */}
      {activeTab === 'Cuisine' && (
        <div className="ingredients-profil">
          <div className="ingredient-search-left">
            <div className="add-ingredients" />
            <div className="title-ingredients">
              <h1>Mes ingrédients</h1>
            </div>
            {/* Affiche les termes de recherche de l'utilisateur */}
            {reduxSearchTerms &&
              reduxSearchTerms.map((term) => (
                <div key={term} className="search-term-bubble">
                  {term}
                  <button
                    type="button"
                    // Supprime le terme de recherche lorsqu'il est cliqué
                    onClick={() => removeTerm(term)}
                    className="remove-term"
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
          <div className="ingredient-search-right">
            <div className="search-recipes" />
            <button
              className="button-search"
              type="button"
              // Recherche des recettes lorsqu'il est cliqué
              onClick={handleFindRecipes}
            >
              Trouver une recette
            </button>
            {/* Affiche le nombre de recettes trouvées si des termes de recherche existent */}
            {reduxSearchTerms.length > 0 && (
              <div className="search-results-count">
                {recipes.length > 0
                  ? `Nombre de recettes trouvées : ${recipes.length}`
                  : 'Aucun résultat trouvé'}
              </div>
            )}
          </div>
          {/* Affiche les recettes trouvées */}
          {renderRecipes()}
        </div>
      )}
      {/* Affiche le contenu de l'onglet 'Favoris' si c'est l'onglet actif */}
      {activeTab === 'Favoris' && (
        <div className="recipes-favorites">
          <h1>Mes recettes favorites</h1>
          <div className="recipes-card">
            {/* Affiche les recettes favorites de l'utilisateur s'il en a */}
            {favorites.length > 0 ? (
              favorites.map((item) => {
                if (item && item.imageUrl) {
                  const favoriteImageUrl = item.imageUrl
                    ? item.imageUrl
                    : ImageNotFound;
                  return (
                    <Card
                      key={item.id}
                      id={item.id}
                      imageUrl={favoriteImageUrl}
                      dishName={item.dishName}
                      rating={item.rating}
                    />
                  );
                }
                return null;
              })
            ) : (
              // Affiche un message s'il n'a pas de recettes favorites
              <p>Vous n&apos;avez pas encore de recettes favorites.</p>
            )}
          </div>
        </div>
      )}
      {/* Affiche le contenu de l'onglet 'Informations' si c'est l'onglet actif */}
      {activeTab === 'Informations' && (
        <div className="registration-form">
          <div className="form-title">Modifier mes informations</div>
          {/* Le formulaire pour modifier les informations de l'utilisateur */}
          <form onSubmit={handleSubmit}>
            {/* Les champs du formulaire */}
            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-mail *"
                required
                value={form.email}
                // Met à jour la valeur du champ lorsqu'il est modifié
                onChange={handleChange} // Utilisez directement handleChange ici
              />
              <span className="icon email-icon" />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username *"
                required
                value={form.username}
                // Met à jour la valeur du champ lorsqu'il est modifié
                onChange={handleChange}
              />
              <span className="icon user-icon" />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="pseudo"
                name="pseudo"
                placeholder="Pseudo *"
                required
                value={form.pseudo}
                // Met à jour la valeur du champ lorsqu'il est modifié
                onChange={handleChange}
              />
              <span className="icon user-icon" />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mot de passe *"
                // Met à jour la valeur du champ lorsqu'il est modifié
                onChange={handleChange}
              />
              <span className="icon lock-icon" />
            </div>
            {/* Le bouton pour soumettre le formulaire */}
            <button type="submit" className="register-button">
              Mettre à jour
            </button>
          </form>
        </div>
      )}
      {/* Le bouton pour se déconnecter */}
      <button
        type="button"
        onClick={handleDeleteAccount}
        className="suggest-recipes"
      >
        Supprimer mon compte
      </button>
      <button type="button" onClick={handleLogout} className="suggest-recipes">
        Déconnexion
      </button>
    </div>
  );
}

export default Profil;
