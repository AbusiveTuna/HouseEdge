// pages/LetItRide.js
import React, { useEffect, useState } from 'react';
import Deck, { createDeck } from '../../components/Deck';
import shuffle from '../../utils/shuffle';
import calculateResult from '../../utils/handResults';

export default function LetItRide() {
  let [deck, setDeck] = useState([]);
  let [hand, setHand] = useState([]);
  let [communityCards, setCommunityCards] = useState([]);
  let [gameState, setGameState] = useState('START');
  let [result, setResult] = useState(null);

  // Shuffle and set the deck when the component mounts
  useEffect( 
    function initalizeStart(){
      initializeGame();
    }, []);

  // Start the game once the deck is set
  useEffect(
    function startOnDeckSet() {
    if (deck.length > 0) {
      startGame();
    }
  }, [deck]);

  // Handle game state changes
  useEffect(
    function handleStateChange() {
    handleGameStateChange();
  }, [gameState]);

  function initializeGame () {
    const newDeck = shuffle(createDeck());
    setDeck(newDeck);
  }

  function startGame () {
    setHand(deck.slice(0, 3));
    setGameState('HAND_DEALT');
  }

  function handleGameStateChange () {
    if (gameState === 'HAND_DEALT') {
      //user should be able to pull or let it ride.
    } else if (gameState === 'CC_ONE_DEALT') {
      setCommunityCards(deck.slice(3, 4)); // Show only the first community card
    } else if (gameState === 'CC_TWO_DEALT') {
      const finalHand = deck.slice(0,3);
      const finalCommunityCards = deck.slice(3,5);
      setCommunityCards(finalCommunityCards); // Show both community cards

      const result = calculateResult(finalHand,finalCommunityCards);
      setResult(result);
    }
  }

  function handleChoice (choice) {
    if (gameState === 'HAND_DEALT') {
      setGameState('CC_ONE_DEALT');
    } else if (gameState === 'CC_ONE_DEALT') {
      setGameState('CC_TWO_DEALT');
    }
  }

  function resetGame() {
    initializeGame();
    setHand([]);
    setCommunityCards([]);
    setGameState('START');
    setResult(null);
  }

  return (
    <div>
      <h1>Let It Ride</h1>
      <h2>Your Hand</h2>
      <Deck deck={hand} />
      <h2>Community Cards</h2>
      <Deck deck={communityCards} />
      {result && (
        <div>
          <h2>Result</h2>
          <p>{result}</p> {/* Display the result */}
        </div>
      )}
      {(gameState === 'HAND_DEALT' || gameState === 'CC_ONE_DEALT') && (
        <div>
          <button onClick={() => handleChoice('PULL')}>Pull</button>
          <button onClick={() => handleChoice('LET_IT_RIDE')}>Let It Ride</button>
        </div>
      )}
      <button onClick={resetGame}>Reset Game</button> { }
    </div>
  );
}