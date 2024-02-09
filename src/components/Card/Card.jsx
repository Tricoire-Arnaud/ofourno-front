import React from 'react';
import Chevron from '../../assets/ChevronRight.svg';
import Rate from '../../assets/Rate.svg';
import VectorImage1 from '../../assets/Vector-image-1.png';
import VectorImage2 from '../../assets/Vector-image-2.png';
import './Card.scss';

function Card() {
  return (
    <div className="SectionCard">
      <div className="Card1">
        <div className="Image1">
          <img
            className="VectorImage1"
            src={VectorImage1}
            alt="Plat de la carte 1"
          />
        </div>
        <div className="TextDish">Nom du plat</div>
        <div className="SectionRateComment">
          <div className="RateComment">
            <div className="Rate">
              <div className="VectorRate" src={Rate} />
            </div>
            <div className="Comment">(57)</div>
          </div>
        </div>
      </div>
      <div className="Card2">
        <div className="Image2">
          <img
            className="VectorImage2"
            src={VectorImage2}
            alt="Plat de la carte 2"
          />
        </div>
        <div className="TextDish">Nom du plat</div>
        <div className="SectionRateComment">
          <div className="RateComment">
            <div className="Rate">
              <div className="VectorRate" src={Rate} />
            </div>
            <div className="Comment">(57)</div>
          </div>
        </div>
      </div>
      <div className="Chevronright">
        <div className="VectorChevronright" src={Chevron} />
      </div>
    </div>
  );
}

export default Card;
