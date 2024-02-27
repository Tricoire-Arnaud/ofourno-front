import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { restoreSession, logout } from '../../features/authSlice';
import { restoreFavorites } from '../../features/favoritesSlice';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import MultiSearchBar from '../MultiSearchBar/MultiSearchBar';
import Registration from '../../pages/Registration/Registration';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';
import Legal from '../Legal/Legal';
import Terms from '../Terms/Terms';
import ConnexionModal from '../ConnexionModal/ConnexionModal';
import Profil from '../Profil/Profil';
import CategoryPage from '../../pages/CategoryPage/CategoryPage';
import HomePage from '../../pages/HomePage/HomePage';
import Recipe from '../../pages/Recipe/Recipe';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Filters from '../Filters/Filters';
import Results from '../../pages/Results/Results';
import '../../styles/_variables.scss';

import './App.scss';

// Définition du composant App
function App() {
  // Utilisation du hook useDispatch pour accéder à la fonction dispatch de Redux
  const dispatch = useDispatch();
  // Utilisation du hook useLocation pour accéder à l'objet location de react-router
  const location = useLocation();
  // Définition d'un état pour stocker le chemin actuel
  const [currentPath, setCurrentPath] = useState(location.pathname);

  // Utilisation du hook useEffect pour mettre à jour le chemin actuel lorsque l'objet location change
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  // Utilisation du hook useEffect pour restaurer les informations d'authentification et les favoris à partir du localStorage
  useEffect(() => {
    const storedAuthInfo = localStorage.getItem('auth');
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      dispatch(restoreFavorites(favorites));
    }
    if (storedAuthInfo) {
      const { token } = JSON.parse(storedAuthInfo);
      // Dispatch de l'action restoreSession avec le token récupéré
      dispatch(restoreSession(token));
    }
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout()); // Assurez-vous que cela ne crée pas une boucle infinie
    }
  }, [dispatch]);

  // Ajout d'un état pour contrôler l'affichage de la modale de connexion
  const [isModalOpen, setModalOpen] = useState(false);

  // Fonction pour ouvrir la modale de connexion
  const handleOpenModal = () => setModalOpen(true);

  // Fonction pour fermer la modale de connexion
  const handleCloseModal = () => setModalOpen(false);

  // Rendu du composant App
  return (
    <div className="home-phone">
      <Header onOpenModal={handleOpenModal} />
      <div className="main-content">
        {currentPath === '/profil' ? (
          <MultiSearchBar />
        ) : (
          <SearchBar className="searchBar-mobile" />
        )}
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<Results />} />
          <Route
            path="/profil"
            element={
              <PrivateRoute>
                <Profil />
              </PrivateRoute>
            }
          />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Routes>
        {isModalOpen && <ConnexionModal onClose={handleCloseModal} />}
      </div>
      <Footer />
    </div>
  );
}

// Export du composant App
export default App;
