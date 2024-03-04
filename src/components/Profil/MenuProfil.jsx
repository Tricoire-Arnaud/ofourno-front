// Importation des dépendances nécessaires
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../features/authSlice';
import iconConnexion from '../../assets/img/iconConnexion.svg';
import './MenuProfil.scss'; // Importation des styles CSS pour le composant
import 'react-toastify/dist/ReactToastify.css'; // Importation des styles CSS pour les notifications toast

// Définition du composant Menu Profil
function MenuProfil() {
  // Déclaration de l'état isOpen avec useState pour gérer l'ouverture et la fermeture du menu
  const [isOpen, setIsOpen] = useState(false);

  // Récupération du pseudo et des rôles de l'utilisateur depuis le localStorage
  const pseudo = localStorage.getItem('pseudo');
  const rolesString = localStorage.getItem('roles');
  const roles = rolesString ? rolesString.split(',') : [];
  const hasAdminOrModeratorRole =
    roles.includes('ROLE_ADMIN') ||
    roles.includes('ROLE_MODERATOR') ||
    roles.includes('ROLE_VISITOR');

  // Utilisation du hook useNavigate pour gérer la navigation
  const navigate = useNavigate();

  // Utilisation du hook useDispatch pour obtenir la fonction de dispatch Redux
  const dispatch = useDispatch();

  // Fonction pour basculer l'état isOpen du menu
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fonction pour fermer le menu si le clic est en dehors de .item-list et .profil-button
  const handleOnClose = (e) => {
    if (
      !e.target.closest('.item-list2') &&
      !e.target.closest('.profil-button')
    ) {
      setIsOpen(false);
    }
  };

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    // Dispatch de l'action de déconnexion
    dispatch(logout());
    localStorage.removeItem('token'); // Suppression du token du localStorage
    // Affichage d'une notification toast pour indiquer que la déconnexion est réussie
    toast.success('Déconnexion réussie.', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // Redirection vers la page de profil après une délai de 2,5 secondes
    const timer = setTimeout(() => {
      navigate('/profil?tab=Cuisine');
    }, 2500);
    // Nettoyage du timer
    return () => clearTimeout(timer);
  };

  // Fonction pour fermer le menu lorsqu'un lien est cliqué
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Ajout d'un écouteur d'événements pour fermer le menu lorsqu'un clic est effectué en dehors de .item-list2 et .profil-button
  useEffect(() => {
    document.addEventListener('mousedown', handleOnClose);
    return () => {
      // Suppression de l'écouteur d'événements lors du démontage du composant
      document.removeEventListener('mousedown', handleOnClose);
    };
  }, []);

  // Rendu JSX du composant MenuProfil
  return (
    <div className="menu-profil">
      {/* Bouton pour ouvrir et fermer le menu */}
      <button
        type="button"
        className="profil-button"
        onClick={handleToggleMenu}
      >
        <img src={iconConnexion} alt="Menu Profil" />
      </button>
      {/* Affichage du menu si isOpen est vrai */}
      {isOpen && (
        <div className="list-profil2">
          <div className="list-menu2">
            {/* Message de bienvenue avec le pseudo de l'utilisateur s'il est connecté */}
            <div className="welcomeProfil">
              <p>
                {pseudo ? (
                  <>
                    Bienvenue <span>{pseudo}</span>
                  </>
                ) : (
                  'Bonjour'
                )}{' '}
                !
              </p>
            </div>
            {/* Liens du menu */}
            {/* Pour chaque lien, nous avons un div.item-list2 avec un gestionnaire de clic pour fermer le menu et des attributs pour l'accessibilité */}
            <div className="item-list2">
              <div className="list-Arrow2">{'<'}</div>
              {/* Lien vers la page de profil avec l'onglet 'Cuisine' sélectionné */}
              <NavLink
                to="/profil?tab=Cuisine"
                className="list-text"
                onClick={handleLinkClick}
              >
                Mon Profil
              </NavLink>
            </div>
            <div
              className="item-list2"
              onClick={handleLinkClick}
              onKeyDown={handleLinkClick}
              role="button"
              tabIndex={0}
            >
              <div className="list-Arrow2">{'<'}</div>
              {/* Lien vers la page des favoris */}
              <NavLink
                to="/profil?tab=favoris"
                className="list-text2"
                onClick={handleOnClose}
              >
                Mes favoris
              </NavLink>
            </div>
            {/* Affichage du lien vers le backoffice si l'utilisateur a le rôle admin ou modérateur */}
            {hasAdminOrModeratorRole && (
              <div className="item-list2">
                <div className="list-Arrow2">{'<'}</div>
                <a
                  href="https://ofourno-back.arnaudtricoire.com"
                  className="list-text"
                  onClick={handleLinkClick}
                >
                  BackOffice
                </a>
              </div>
            )}
            {/* Lien pour se déconnecter */}
            <div
              className="item-list2"
              onClick={handleLinkClick}
              onKeyDown={handleLinkClick}
              role="button"
              tabIndex={0}
            >
              <div className="list-Arrow2">{'<'}</div>
              <NavLink to="/" className="list-text2" onClick={handleLogout}>
                Déconnexion
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Exportation du composant MenuProfil
export default MenuProfil;
