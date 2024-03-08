import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import Sign from '../../assets/img/sign2.png';
import ingredientImage from '../../assets/img/ingredients.png';
import chefImage from '../../assets/img/chef.png';
import cookingImage from '../../assets/img/cooking.png';
import dishImage from '../../assets/img/dish.png';

import './Registration.scss';
import 'react-toastify/dist/ReactToastify.css';

// Définition du composant Registration
function Registration() {
  // Utilisation du hook useState pour gérer l'état local des champs du formulaire
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: 'Vide',
  });
  // Evaluation de la force du mot de passe
  const evaluatePasswordStrength = () => {
    let strength = 0;

    if (!password) {
      return { score: 0, label: 'Vide' };
    }

    // Critères d'évaluation
    const lengthCriteria = password.length > 8;
    const digitCriteria = /\d/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);

    // Calcul du score
    strength += lengthCriteria ? 1 : 0;
    strength += digitCriteria ? 1 : 0;
    strength += specialCharCriteria ? 1 : 0;
    strength += uppercaseCriteria ? 1 : 0;
    strength += lowercaseCriteria ? 1 : 0;

    // Attribution de l'étiquette en fonction du score
    let label = 'Faible';
    if (strength >= 4) {
      label = 'Fort';
    } else if (strength === 3) {
      label = 'Moyen';
    }

    return { score: strength, label };
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword); // Met à jour l'état du mot de passe
    const strength = evaluatePasswordStrength(newPassword); // Évalue la force du mot de passe
    setPasswordStrength(strength); // Met à jour l'état de la force du mot de passe
  };
  const handleUsernameChange = (e) => {
    const newValue = e.target.value;
    // Vérifie si la valeur contient uniquement des lettres (et autorise les espaces)
    if (/^[a-zA-Z\s]*$/.test(newValue)) {
      setUsername(newValue);
    }
  };
  // Fonction pour valider le formulaire
  const validateForm = () => {
    const isEmailValid = email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i
    );
    const isPasswordStrong = password.length > 8;
    // Ajoutez d'autres règles selon le besoin

    if (!isEmailValid) {
      toast.error('Veuillez entrer une adresse email valide.');
      return false;
    }

    if (!isPasswordStrong) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères.');
      return false;
    }

    // Validez d'autres champs si nécessaire...

    return true;
  };
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Arrête la soumission si la validation échoue
    }
    try {
      // Faire une requête POST à l'API pour créer un nouvel utilisateur
      await api.post('/user/create', {
        email,
        username,
        pseudo,
        password,
      });
      // Afficher un toast de succès si la requête est réussie
      toast.success('Inscription réussie !');
    } catch (error) {
      // Afficher un toast d'erreur si la requête échoue
      toast.error("Erreur lors de l'inscription !");
    }
  };

  return (
    <div>
      <div className="banner">
        <div className="banner-text-container">
          <div className="banner-text">Rejoignez-nous !</div>
          <div className="banner-text">On s&apos;occupe de tout</div>
        </div>
        <img className="banner-img" src={Sign} alt="Banner" />
      </div>
      <div className="registration-form">
        <div className="form-title">À vous les bons petits plats !</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail *"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="icon email-icon" />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username *"
              required
              value={username}
              onChange={handleUsernameChange}
            />
            <span className="icon user-icon" />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="pseudo"
              name="pseudo"
              placeholder="Pseudo *"
              required
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
            />
            <span className="icon user-icon" />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe *"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <div />
            <span className="icon lock-icon" />

            {password && ( // N'affichez la barre et le label que si le mot de passe est non vide
              <>
                <div
                  className={`password-strength-bar ${(() => {
                    switch (passwordStrength.label) {
                      case 'Fort':
                        return 'strong';
                      case 'Moyen':
                        return 'medium';
                      default:
                        return 'weak';
                    }
                  })()}`}
                />
                <span>{passwordStrength.label}</span>
              </>
            )}
          </div>
          <button type="submit" className="register-button">
            Je m’inscris
          </button>
        </form>
      </div>
      <div className="info-sections">
        <section className="info-section">
          <img src={ingredientImage} alt="Ingrédients" />
          <div className="text-content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Nulla sed suscipit odio, non iaculis quam. Maecenas posuere
              commodo finibus. Suspendisse potent. Maecenas malesuada leo
              feugiat lorem sollicitudin, ut eleifend purus gravida.
            </p>
          </div>
        </section>
        <section className="info-section right-aligned">
          <div className="text-content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Nulla sed suscipit odio, non iaculis quam. Maecenas posuere
              commodo finibus. Suspendisse potent. Maecenas malesuada leo
              feugiat lorem sollicitudin, ut eleifend purus gravida.
            </p>
          </div>
          <img src={chefImage} alt="Chef" />
        </section>
        <section className="info-section">
          <img src={cookingImage} alt="Cooking" />
          <div className="text-content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Nulla sed suscipit odio, non iaculis quam. Maecenas posuere
              commodo finibus. Suspendisse potent. Maecenas malesuada leo
              feugiat lorem sollicitudin, ut eleifend purus gravida.
            </p>
          </div>
        </section>
        <section className="info-section right-aligned">
          <div className="text-content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Nulla sed suscipit odio, non iaculis quam. Maecenas posuere
              commodo finibus. Suspendisse potent. Maecenas malesuada leo
              feugiat lorem sollicitudin, ut eleifend purus gravida.
            </p>
          </div>
          <img src={dishImage} alt="Dish" />
        </section>
      </div>
    </div>
  );
}

export default Registration;
