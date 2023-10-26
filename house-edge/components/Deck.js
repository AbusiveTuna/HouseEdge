import React from 'react';
import Card from './Card';

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const createDeck = () => {
  const deck = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }

  return deck;
};

const Deck = ({ deck, className }) => {
  const placeholdersCount = Math.max(0, 2 - deck.length);
  const placeholders = new Array(placeholdersCount).fill("/CardBack.png");

  return (
    <div className={`card-container ${className}`}>
      {deck.map((card, index) => (
        <Card key={index} suit={card.suit} value={card.value} />
      ))}
      {placeholders.map((placeholder, index) => (
        <div key={index} className="card placeholder">
          <img src={placeholder} alt="Placeholder" />
        </div>

      ))}
    </div>
  );
};

export default Deck;
