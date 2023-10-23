import React from 'react';

const cardImages = {};
for (let suit of ['hearts', 'diamonds', 'clubs', 'spades']) {
  for (let value of ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']) {
    cardImages[`${value}${suit}`] = import(`./cards/${value}${suit}.png`);
  }
}

const Card = ({ suit, value }) => {
  const cardImage = cardImages[`${value}${suit}`];
    console.log(cardImage);
  return (
    <div className="card">
      <img src={cardImage} alt={`${value} of ${suit}`} />
    </div>
  );
};

export default Card;
