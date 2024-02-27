// Importation de l'instance axios configurée et des actions Redux
import api from '../api';
import { updateSuccess, updateFailed } from '../features/userSlice';

// Définition de l'action asynchrone pour mettre à jour les informations de l'utilisateur
const updateUserInformation =
  ({ userId, pseudo, email, password, username }) =>
  async (dispatch) => {
    try {
      // Récupération du token depuis le localStorage
      const token = localStorage.getItem('token');

      // Tentative de mise à jour des informations de l'utilisateur via l'API
      const response = await api.put(
        `/users/${userId}/edit`,
        { pseudo, email, password, username },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token à l'en-tête de la requête
          },
        }
      );

      // En cas de succès, dispatch de l'action updateSuccess avec les nouvelles informations de l'utilisateur
      dispatch(
        updateSuccess({
          pseudo: response.data.pseudo,
          email: response.data.email,
          password: response.data.password,
          username: response.data.username,
          // Ajoutez d'autres champs au besoin
        })
      );

      // Mise à jour optionnelle du localStorage avec les nouvelles informations
      localStorage.setItem('pseudo', response.data.pseudo);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('username', response.data.username);
    } catch (error) {
      // En cas d'erreur, dispatch de l'action updateFailed avec le message d'erreur
      dispatch(updateFailed(error.response.data.message || error.message));
    }
  };

// Exportation de l'action de mise à jour des informations de l'utilisateur
export default updateUserInformation;
