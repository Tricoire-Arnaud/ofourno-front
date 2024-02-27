import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../api'; // Assurez-vous que ce chemin est correct
import 'react-toastify/dist/ReactToastify.css';

import './Contact.scss';

// Définition du composant Contact
function Contact() {
  // Définition des états pour le nom, l'email, le sujet et le message
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi du message via l'API
      await api.post('/contact/send', {
        name,
        email,
        subject,
        message,
      });
      // Affichage d'un toast en cas de succès
      toast.success('Votre message a été envoyé avec succès !');
    } catch (error) {
      // Affichage d'un toast en cas d'erreur
      toast.error("Erreur lors de l'envoi du message !");
    }
  };

  // Rendu du composant Contact
  return (
    <div>
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="contact-form">
        <div className="form-title">Envoyez-nous un message</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Votre nom *"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre e-mail *"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Sujet *"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="input-group">
            <textarea
              id="message"
              name="message"
              placeholder="Votre message *"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
            />
          </div>
          <button type="submit" className="contact-button">
            Envoyer le message
          </button>
        </form>
      </div>
      {/* Vous pouvez ajuster ou supprimer les sections d'informations suivantes selon vos besoins */}
    </div>
  );
}

export default Contact;
