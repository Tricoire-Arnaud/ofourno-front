// Définition des types d'actions
export const ADD_SEARCH_TERM = 'ADD_SEARCH_TERM'; // Type pour l'action d'ajout d'un terme de recherche
export const REMOVE_SEARCH_TERM = 'REMOVE_SEARCH_TERM'; // Type pour l'action de suppression d'un terme de recherche

// Définition de l'action d'ajout d'un terme de recherche
export const addSearchTerm = (term) => ({
  type: ADD_SEARCH_TERM, // Type de l'action
  payload: term, // Données à passer avec l'action
});

// Définition de l'action de suppression d'un terme de recherche
export const removeSearchTerm = (term) => ({
  type: REMOVE_SEARCH_TERM, // Type de l'action
  payload: term, // Données à passer avec l'action
});
