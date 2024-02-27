// Importation des bibliothèques nécessaires
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// Importation du store Redux
import store from './store';

// Importation du composant principal de l'application
import App from './components/App/App';

// Importation des styles globaux
import './styles/index.scss';

// Création de la racine de l'application React
ReactDOM.createRoot(document.getElementById('root')).render(
  // Utilisation de BrowserRouter pour gérer le routage de l'application
  <BrowserRouter>
    {/* Utilisation de Provider pour rendre le store Redux disponible à tous les composants de l'application */}
    <Provider store={store}>
      {/* Rendu du composant principal de l'application */}
      <App />
    </Provider>
  </BrowserRouter>
);
