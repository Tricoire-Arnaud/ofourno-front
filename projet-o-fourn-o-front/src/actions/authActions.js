// Importation des dépendances nécessaires
import { toast } from 'react-toastify'; // Importation de toast depuis react-toastify pour afficher des notifications
import api from '../api'; // Importation de l'instance axios configurée
import { loginSuccess, loginFailed } from '../features/authSlice'; // Importation des actions Redux

// Définition de l'action asynchrone de connexion
const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      // Tentative de connexion via l'API
      const response = await api.post('/user/login', { email, password });

      // En cas de succès, dispatch de l'action loginSuccess avec les données de l'utilisateur
      dispatch(
        loginSuccess({
          token: response.data.token,
          pseudo: response.data.pseudo,
          email: response.data.email,
          username: response.data.username,
          id: response.data.id,
          roles: response.data.roles,
        })
      );

      // Stockage des données de l'utilisateur dans le localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('pseudo', response.data.pseudo);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('roles', response.data.roles);

      // Affichage d'un toast de succès
      toast.success('Connexion réussie !', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      // En cas d'erreur, dispatch de l'action loginFailed avec le message d'erreur
      dispatch(loginFailed(error.message));

      // Affichage d'un toast d'erreur
      toast.error(
        'Échec de la connexion. Veuillez vérifier vos identifiants.',
        {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

// Exportation de l'action de connexion
export default login;
