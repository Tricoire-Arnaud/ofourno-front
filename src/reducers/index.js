// Importation de la fonction combineReducers de Redux
import { combineReducers } from 'redux';

// Importation du reducer pour l'authentification
import authReducer from './authReducer';

// Combinaison de tous les reducers en un seul reducer racine
const rootReducer = combineReducers({
  // Le reducer d'authentification est mappé à la clé 'auth'
  auth: authReducer,
});

// Exportation du reducer racine
export default rootReducer;
