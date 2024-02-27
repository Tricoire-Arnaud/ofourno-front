/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { addFavorite, removeFavorite } from '../../features/favoritesSlice';
import { HeartSwitch } from '@anatoliygatt/heart-switch';
import api from '../../api'; // Assurez-vous que ce chemin est correct
import './Cardresult.scss';

// Définition du composant CardResult
function CardResult({ id, imageUrl, dishName, rating }) {
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState(null);
  const [reviewCount, setReviewCount] = useState(0); // État pour stocker le nombre d'avis
  const auth = useSelector((state) => state.auth); // Ajout pour accéder à l'état d'authentification

  // Utilisation du hook useSelector pour accéder aux favoris dans le state de Redux
  const favorites = useSelector((state) => state.favorites);
  const isFavorited = favorites.some((item) => item.id === id);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isFavorited);
  }, [isFavorited]);

  // Fonction pour gérer le clic sur le bouton favori
  const handleFavoriteClick = () => {
    // Vérification de l'état de connexion de l'utilisateur
    if (auth.status === 'pending' || auth.status === 'idle') {
      // Si l'utilisateur n'est pas connecté, affichez une popup d'erreur
      toast.error('Vous devez être connecté pour ajouter des favoris !', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Arrêtez l'exécution de la fonction ici
    }

    const item = { id, imageUrl, dishName, rating };
    if (isFavorited) {
      dispatch(removeFavorite(item));
      toast.error('Favoris supprimé !', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(addFavorite(item));
      toast.success('Favoris ajouté !', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    setChecked(!checked);
  };

  // Construction de l'URL de l'image de la recette
  const recipeImageUrl = `${import.meta.env.VITE_IMAGE_BASE_URL}${
    recipe?.picture
  }`;

  // Utilisation du hook useEffect pour récupérer les détails de la recette et le nombre d'avis
  useEffect(() => {
    const fetchRecipeAndReviewCount = async () => {
      try {
        // Récupérer les détails de la recette
        const recipeResponse = await api.get(`/recipe/${id}`);
        setRecipe(recipeResponse.data);

        // Récupérer le nombre d'avis de la recette
        const reviewResponse = await api.get(`/recipes/${id}/review/count`);
        setReviewCount(reviewResponse.data.count);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchRecipeAndReviewCount();
  }, [id]);

  // Création d'un tableau d'étoiles pour représenter la note
  const stars = [];
  for (let i = 0; i < rating; i += 1) {
    stars.push(
      <span key={i} className="card-result-star">
        ★
      </span>
    );
  }

  // Rendu du composant CardResult
  return (
    <div className="card-result-container">
      <img className="card-result-image" src={recipeImageUrl} alt={dishName} />
      <div className="card-result-content">
        <div className="card-result-header">
          <h2 className="card-result-title">
            <Link to={`/recipes/${id}`}>{dishName}</Link>
            <div style={{ transform: 'scale(0.7)' }}>
              {/* Ajustez la valeur de scale selon le besoin */}
              <HeartSwitch
                size="sm" // Utilisez la plus petite taille disponible
                inactiveTrackFillColor="#E0E0E0"
                inactiveTrackStrokeColor="#BDBDBD"
                activeTrackFillColor="#FF5252"
                activeTrackStrokeColor="#FF1744"
                inactiveThumbColor="#F5F5F5"
                activeThumbColor="#FFCDD2"
                checked={checked}
                onChange={handleFavoriteClick}
              />
            </div>
          </h2>
          <div className="card-result-rating-container">
            {reviewCount} {stars}
          </div>
        </div>
        <Link to={`/recipes/${id}`}>
          {recipe && (
            <div className="card-result-details">
              <div className="card-result-detail-row">
                <p>
                  <span role="img" aria-label="difficulty level">
                    💪
                  </span>{' '}
                  {recipe.difficulty}
                </p>
                <p>
                  <span role="img" aria-label="number of people">
                    👤
                  </span>{' '}
                  {recipe.servings}
                  Pers.
                </p>
              </div>
              <div className="card-result-detail-row">
                <p>
                  <span role="img" aria-label="preparation time">
                    ⏱️
                  </span>{' '}
                  {recipe.preparationTime}
                  min.
                </p>
                <p>
                  <span role="img" aria-label="cooking time">
                    ⏳
                  </span>{' '}
                  {recipe.cookingTime}
                  min.
                </p>
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

// Définition des propTypes pour le composant CardResult
CardResult.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  dishName: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default CardResult;
