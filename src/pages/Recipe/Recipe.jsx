/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Importation des dépendances nécessaires
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addFavorite, removeFavorite } from '../../features/favoritesSlice';
import { HeartSwitch } from '@anatoliygatt/heart-switch';
import api from '../../api';
import SignImage from '../../assets/img/sign.svg';
import './Recipe.scss';

// Définition du composant Recipe
function Recipe() {
  // Initialisation des états du composant
  const [recipe, setRecipe] = useState({
    ingredients: [],
    ustensils: [],
    reviews: [],
  });
  const params = useParams();
  const dispatch = useDispatch();
  const [numReviewsToShow, setNumReviewsToShow] = useState(2);
  const [showMore, setShowMore] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    text: '',
    user_id: '',
  });
  const { picture } = recipe;
  const fullImageUrl = `${import.meta.env.VITE_IMAGE_BASE_URL}${picture}`;
  const favorites = useSelector((state) => state.favorites);
  const [checked, setChecked] = useState(false);
  const isFavorited = favorites.some(
    (favorite) => favorite.id === parseInt(params.id, 10)
  );
  const auth = useSelector((state) => state.auth);

  const handleFavoriteClick = () => {
    // Vérification si l'utilisateur est connecté
    if (auth.status === 'pending' || auth.status === 'idle') {
      toast.error('Vous devez être connecté pour ajouter des favoris !', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Arrête l'exécution si l'utilisateur n'est pas connecté
    }

    const item = {
      id: parseInt(params.id, 10),
      imageUrl: picture, // Utilisez 'picture' au lieu de 'fullImageUrl'
      dishName: recipe.name,
      rating: recipe.rating,
    };

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

  // Utilisation de useEffect pour récupérer les données de la recette lors du montage du composant
  useEffect(() => {
    api
      .get(`/recipe/${params.id}`, {})
      .then((response) => {
        setRecipe(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        toast.error(`Échec : ${error}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, [params.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReviewChange = (event) => {
    setNewReview({ ...newReview, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    // Récupération de l'id utilisateur depuis le localStorage
    const userId = localStorage.getItem('id'); // Utilisation de la clé 'id'
    if (userId) {
      setNewReview((prevReview) => ({
        ...prevReview,
        user_id: userId, // Mise à jour du champ user_id avec l'id récupéré
      }));
    }
  }, []);

  const handleReviewSubmit = (event) => {
    event.preventDefault();

    if (!newReview.rating) {
      // eslint-disable-next-line no-alert
      alert('Veuillez choisir une note.');
      return;
    }

    // Soumettez la revue...
    api
      .post(`/recipes/${params.id}/review/create`, {
        rating: parseInt(newReview.rating),
        text: newReview.text,
        user_id: newReview.user_id, // Assurez-vous d'inclure cela
      })
      .then(() => {
        toast.success('Merci pour votre commentaire !', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(newReview);
        return api.get(`/recipe/${params.id}`); // Rechargez les données de la recette
      })
      .then((response) => {
        setRecipe(response.data); // Mettez à jour l'état avec les nouvelles données
      })
      .catch((error) => {
        toast.error(`Échec : ${error}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    // Réinitialisez l'état de newReview pour effacer le formulaire
    setNewReview({ rating: 0, text: '', user_id: newReview.user_id });
  };

  return (
    <div className="recipe">
      <div className="recipe-top">
        <div className="recipe-info">
          <h1>
            {recipe.name || 'Nom de la recette'}
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
          </h1>
          <div className="recipe-details">
            <ul>
              <li>
                <span role="img" aria-label="number of people">
                  👤
                </span>{' '}
                {recipe.servings} personnes
              </li>
              <li>
                <span role="img" aria-label="preparation time">
                  ⏱️
                </span>{' '}
                {recipe.preparationTime || 'Preparation time'} min
              </li>
              <li>
                <span role="img" aria-label="cooking time">
                  ⏳
                </span>{' '}
                {recipe.cookingTime || 'Preparation time'} min
              </li>
              <li>
                <span role="img" aria-label="difficulty level">
                  💪
                </span>{' '}
                {recipe.difficulty || 'Difficulté'}
              </li>
            </ul>
          </div>
        </div>
        <div className="recipe-image">
          <img src={fullImageUrl} alt={recipe.name} />
        </div>
      </div>
      <div className="recipe-middle">
        <div className="ingredients-recipe">
          <div className="sign-image-container">
            <img className="sign-image" src={SignImage} alt="Sign" />
            <h2 className="sign-title">Ingrédients</h2>
          </div>
          <div className="ingredient-list">
            {recipe.ingredients.map((ingredient) => {
              const ingredientImageUrl = `${
                import.meta.env.VITE_IMAGE_BASE_URL
              }${ingredient.picture}`;
              return (
                <div className="ingredient-id" key={ingredient.id}>
                  <img src={ingredientImageUrl} alt={ingredient.name} />
                  <p className="ingredient-text">
                    {ingredient.name} {ingredient.metricUnit}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="utensils-recipe">
          <div className="sign-image-container">
            <img className="sign-image" src={SignImage} alt="Sign" />
            <h2 className="sign-title">Ustensiles</h2>
          </div>
          <div className="ustensil-list">
            {recipe.ustensils.map((ustensil) => {
              const ustensilImageUrl = `${import.meta.env.VITE_IMAGE_BASE_URL}${
                ustensil.picture
              }`;
              return (
                <div className="ustensil-id" key={ustensil.id}>
                  <img src={ustensilImageUrl} alt={ustensil.name} />
                  <p className="ustensil-text">{ustensil.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="preparation">
          <div className="sign-image-container">
            <img className="sign-image" src={SignImage} alt="Sign" />
            <h2 className="sign-title">Préparation</h2>
          </div>
          <div>
            {recipe.instructions &&
              recipe.instructions.split('.').map((instruction) =>
                instruction.trim() !== '' ? (
                  <div
                    key={instruction.trim()}
                    className="instruction-container"
                  >
                    <input type="checkbox" id={`step-${instruction.trim()}`} />
                    <label htmlFor={`step-${instruction.trim()}`}>
                      <p className="instructions-text">{instruction.trim()}.</p>
                    </label>
                  </div>
                ) : null
              )}
          </div>
        </div>
      </div>
      <div className="recipe-bottom">
        <div className="reviews">
          <div className="sign-image-container">
            <img className="sign-image" src={SignImage} alt="Sign" />
            <h2 className="sign-title">Avis</h2>
          </div>
          {recipe.reviews.length === 0 ? (
            <p>Aucun avis sur cette recette</p>
          ) : (
            <div className="review-list">
              {recipe.reviews.slice(0, numReviewsToShow).map((review) => (
                <div className="review-id" key={review.id}>
                  <p className="review-text">
                    {'👤 '}
                    {review.user.pseudo}
                  </p>
                  <p className="review-text review-stars">
                    {'★'.repeat(review.rating)}
                  </p>
                  <p className="review-text review-comment">{review.text}</p>
                </div>
              ))}
              {recipe.reviews.length > 2 && (
                <button
                  type="button"
                  className="round-button"
                  onClick={() => {
                    if (showMore) {
                      setNumReviewsToShow(2);
                      setShowMore(false);
                    } else {
                      const newNumReviewsToShow = numReviewsToShow + 2;
                      setNumReviewsToShow(newNumReviewsToShow);
                      if (newNumReviewsToShow >= recipe.reviews.length) {
                        setShowMore(true);
                      }
                    }
                  }}
                >
                  {showMore ? 'Moins de commentaires' : 'Plus de commentaires'}
                </button>
              )}
            </div>
          )}
          {auth.status === 'succeeded' && (
            <form className="review-form" onSubmit={handleReviewSubmit}>
              <h3>Donnez votre avis</h3>
              <label htmlFor="rating">
                Note :
                <select
                  id="rating"
                  name="rating"
                  value={newReview.rating}
                  onChange={handleReviewChange}
                  required
                >
                  <option value="" />
                  {[...Array(5)].map((_, i) => {
                    const rating = 5 - i;
                    return (
                      <option key={i} value={rating}>
                        {'★'.repeat(rating)}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label>
                Commentaire:
                <textarea
                  name="text"
                  value={newReview.text}
                  onChange={handleReviewChange}
                  required
                />
              </label>
              <button type="submit">Soumettre le commentaire</button>
            </form>
          )}
          {(auth.status === 'pending' ||
            auth.status === 'idle' ||
            auth.status === 'failed') && (
            <p>Vous devez être connecté pour commenter.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
