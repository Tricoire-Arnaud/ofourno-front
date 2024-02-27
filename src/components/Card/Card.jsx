/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { addFavorite, removeFavorite } from '../../features/favoritesSlice';
import { HeartSwitch } from '@anatoliygatt/heart-switch';
import ImageNotFound from '../../assets/img/ImageNotFound.jpg';
import './Card.scss';

// Définition du composant Card
function Card({ imageUrl, id, dishName, rating, reviewCount }) {
  // Utilisation du hook useDispatch pour dispatcher des actions
  const dispatch = useDispatch();
  // Utilisation du hook useSelector pour accéder à l'état du store Redux
  const auth = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites);
  // Vérification si l'élément est déjà dans les favoris
  const isFavorited = favorites.some((item) => item.id === id);

  // Utilisation du hook useEffect pour mettre à jour l'état checked lorsque isFavorited change
  useEffect(() => {
    setChecked(isFavorited);
  }, [isFavorited]);

  // Utilisation du hook useState pour gérer l'état checked
  const [checked, setChecked] = useState(isFavorited);

  // Fonction pour gérer le clic sur le bouton favori
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
      return;
    }

    // Création de l'objet item
    const item = { id, imageUrl, dishName, rating };
    // Vérification si l'élément est déjà dans les favoris
    if (isFavorited) {
      // Si oui, suppression de l'élément des favoris
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
      // Si non, ajout de l'élément aux favoris
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
  };

  // Construction de l'URL de l'image
  const fullImageUrl = `${import.meta.env.VITE_IMAGE_BASE_URL}${imageUrl}`;

  // Rendu du composant
  return (
    <div className="sectionCard">
      <Link to={`/recipes/${id}`}>
        <div className="card">
          <img
            className="vectorImage"
            src={fullImageUrl || ImageNotFound}
            alt={`Plat - ${dishName}`}
          />
          <div className="textDish">{dishName}</div>
          <div className="sectionRateComment">
            <div className="rateComment">
              <div className="rate">
                <div className="reviewCount">({reviewCount})</div>
                {[...Array(Math.floor(rating))].map((_, i) => (
                  <span key={`star-${i}`} className="star">
                    ★
                  </span>
                ))}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{ transform: 'scale(0.7)' }}
                >
                  <HeartSwitch
                    size="sm"
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
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// Définition des propTypes pour le composant Card
Card.propTypes = {
  id: PropTypes.number.isRequired,
  dishName: PropTypes.string,
  imageUrl: PropTypes.string,
  rating: PropTypes.number,
  reviewCount: PropTypes.number,
};

// Définition des defaultProps pour le composant Card
Card.defaultProps = {
  dishName: '',
  imageUrl: '',
  rating: 0,
  reviewCount: 0,
};

// Exportation du composant Card
export default Card;
