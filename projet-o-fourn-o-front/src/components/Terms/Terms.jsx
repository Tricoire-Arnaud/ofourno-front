import React from 'react';
import './Terms.scss';

// Définition du composant Terms
function Terms() {
  return (
    <div className="terms">
      {/* Titre principal des conditions générales d'utilisation */}
      <h2 className="terms-title">Conditions générales d&apos;utilisation</h2>

      {/* Paragraphe d'introduction des conditions générales d'utilisation */}
      <p className="terms-paragraph">
        En accédant et en utilisant le site web Ofourno, vous acceptez les
        présentes conditions générales d&apos;utilisation dans leur intégralité.
        Si vous n&apos;acceptez pas ces conditions, vous ne devez pas utiliser
        ce site.
      </p>

      {/* Sous-titre de la section sur la propriété intellectuelle */}
      <h3 className="terms-subtitle">Propriété intellectuelle</h3>

      {/* Paragraphe sur la propriété intellectuelle */}
      <p className="terms-paragraph">
        Le contenu du site web Ofourno, y compris, mais sans s&apos;y limiter,
        les textes, graphiques, images, vidéos, logos et icônes, est la
        propriété de Ofourno SAS et est protégé par les lois françaises et
        internationales sur le droit d&apos;auteur.
      </p>

      {/* Sous-titre de la section sur l'utilisation autorisée */}
      <h3 className="terms-subtitle">Utilisation autorisée</h3>

      {/* Paragraphe sur l'utilisation autorisée */}
      <p className="terms-paragraph">
        Vous pouvez accéder au contenu du site web Ofourno à des fins
        personnelles et non commerciales. Vous ne pouvez pas copier, reproduire,
        modifier, distribuer, afficher, publier ou vendre toute partie du
        contenu sans l&apos;autorisation préalable écrite de Ofourno SAS.
      </p>

      {/* Sous-titre de la section sur les limitations de responsabilité */}
      <h3 className="terms-subtitle">Limitations de responsabilité</h3>

      {/* Paragraphe sur les limitations de responsabilité */}
      <p className="terms-paragraph">
        Ofourno SAS ne garantit pas l&apos;exactitude, l&apos;actualité ou
        l&apos;exhaustivité du contenu du site web Ofourno. L&apos;utilisation
        de ce site se fait à vos propres risques. Ofourno SAS ne sera pas
        responsable des dommages directs, indirects, accessoires, consécutifs ou
        spéciaux résultant de l&apos;utilisation ou de l&apos;incapacité à
        utiliser ce site.
      </p>

      {/* Sous-titre de la section sur la modification des conditions */}
      <h3 className="terms-subtitle">Modification des conditions</h3>

      {/* Paragraphe sur la modification des conditions */}
      <p className="terms-paragraph">
        Ofourno SAS se réserve le droit de modifier ces conditions générales
        d&apos;utilisation à tout moment. En continuant à utiliser ce site web
        après la publication de modifications, vous acceptez les conditions
        modifiées.
      </p>
    </div>
  );
}

// Exportation du composant Terms par défaut
export default Terms;
