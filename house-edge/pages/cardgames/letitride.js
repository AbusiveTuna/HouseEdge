// pages/LetItRide.js
import React, { useEffect, useState } from 'react';
import Deck, { createDeck } from '../../components/Deck';
import shuffle from '../../utils/shuffle';
import { calculateResult } from '../../utils/handResults';
import handProbability from '../../utils/handProbability';
import { calculateWin } from '../../utils/payTable';
import { createSearchParamsBailoutProxy } from 'next/dist/client/components/searchparams-bailout-proxy';

export default function LetItRide() {
  let [deck, setDeck] = useState([]);
  let [hand, setHand] = useState([]);
  let [communityCards, setCommunityCards] = useState([]);
  let [gameState, setGameState] = useState('START');
  let [result, setResult] = useState(null);
  let [probability, setProbability] = useState(null);
  let [handBet, setHandBet] = useState(null);
  let [bonusBet, setBonusBet] = useState(null);
  let [remainingBet, setRemainingBet] = useState(null);
  let [isDealt, setIsDealt] = useState(false);

  // Shuffle and set the deck when the component mounts
  useEffect(
    function initalizeStart() {
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

  function initializeGame() {
    let newDeck = shuffle(createDeck());
    setDeck(newDeck);
  }

  function startGame() {
    setHandBet(15);
    setBonusBet(5);
    setIsDealt(false);
  }

  function dealHand() {
    setHand(deck.slice(0, 3));
    setGameState('HAND_DEALT');
    setIsDealt(true);
    setRemainingBet(handBet);
  }

  function handleGameStateChange() {
    if (gameState === 'HAND_DEALT') {
      //user should be able to pull or let it ride.
      const dealtHand = deck.slice(0, 3);
      let handProb = handProbability(dealtHand);
      setProbability(handProb);
    } else if (gameState === 'CC_ONE_DEALT') {
      setCommunityCards(deck.slice(3, 4)); // Show only the first community card
      const dealtHand = deck.slice(0, 4);
      let handProb = handProbability(dealtHand);
      setProbability(handProb);
    } else if (gameState === 'CC_TWO_DEALT') {
      const finalCommunityCards = deck.slice(3, 5);
      setCommunityCards(finalCommunityCards); // Show both community cards
      const finalHand = deck.slice(0, 3);
      const result = calculateResult(finalHand, finalCommunityCards);
      let winnings = calculateWin(result, remainingBet);
      let bonusWinnings = calculateWin(deck.slice(0, 3), bonusBet);
      let resultString = result + " You won $" + winnings;
      setResult(resultString);
    }
  }

  function handleChoice(choice) {
    if (choice === 'PULL') {
        setRemainingBet(remainingBet - (handBet * 1 / 3));
    }
    console.log("REMAINING BET");
    console.log(remainingBet);
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
    setIsDealt(false);
    setBonusBet(0);
    setHandBet(0);
  }

  return (
    <div>
      <div className="community-cards">
        <h2>Community Cards</h2>
        <Deck deck={communityCards} />
      </div>
      <div className="player-hand">
        <h2>Your Hand</h2>
        <Deck deck={hand} />
      </div>
      {result && (
        <div className="result-container">
          <h2 className="result-text">{result}</h2>
        </div>
      )}
      {(gameState === 'HAND_DEALT' || gameState === 'CC_ONE_DEALT') && (
        <div className="probability-container">
          <h2 className="probability-text">Probability: {probability}</h2>
        </div>
      )}
      {(gameState === 'HAND_DEALT' || gameState === 'CC_ONE_DEALT') && (
        <div className="button-container">
          <button className="game-button" onClick={() => handleChoice('PULL')}>Pull</button>
          <button className="game-button" onClick={() => handleChoice('LET_IT_RIDE')}>Let It Ride</button>
        </div>
      )}
      {!isDealt && (
        <button className="deal-button" onClick={dealHand}>Deal</button>
      )}
      {isDealt && (
        <button className="reset-button" onClick={resetGame}>Reset Game</button>
      )}
    </div>
  );

}