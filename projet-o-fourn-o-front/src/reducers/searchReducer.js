/* eslint-disable default-param-last */
// Importation des types d'actions
import { ADD_SEARCH_TERM, REMOVE_SEARCH_TERM } from '../actions/searchActions';

// Définition de l'état initial
const initialState = {
  searchTerms: [],
};

// Définition du reducer pour la recherche
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    // En cas d'ajout d'un terme de recherche
    case ADD_SEARCH_TERM:
      // Retourne un nouvel état avec le terme de recherche ajouté à la fin
      return {
        ...state,
        searchTerms: [...state.searchTerms, action.payload],
      };
    // En cas de suppression d'un terme de recherche
    case REMOVE_SEARCH_TERM:
      // Retourne un nouvel état sans le terme de recherche supprimé
      return {
        ...state,
        searchTerms: state.searchTerms.filter(
          (term) => term !== action.payload
        ),
      };
    // Par défaut, retourne l'état actuel
    default:
      return state;
  }
};

// Exportation du reducer
export default searchReducer;
