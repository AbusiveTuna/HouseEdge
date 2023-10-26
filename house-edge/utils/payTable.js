function calculateWin(handValue, totalBet) {
    switch (handValue) {
        case "Royal Flush":
            return (totalBet * 1000) + totalBet;
        case "Straight Flush":
            return (totalBet * 200) + totalBet;
        case "4 of a Kind":
            return (totalBet * 50) + totalBet;
        case "Full House":
            return (totalBet * 11) + totalBet;
        case "Flush":
            return (totalBet * 8) + totalBet;
        case "Straight":
            return (totalBet * 5) + totalBet;
        case "Three of a Kind":
            return (totalBet * 3) + totalBet;
        case "2 Pair":
            return (totalBet * 2) + totalBet;
        case "High Pair":
            return (totalBet * 1) + totalBet;
        default:
            return 0;
    }
}

function calculateBonus(handValue, totalBet) {
    switch (handValue) {
        case "Straight Flush":
            return (totalBet * 40) + totalBet;
        case "3 of a Kind":
            return (totalBet * 30) + totalBet;
        case "Straight":
            return (totalBet * 6) + totalBet;
        case "Flush":
            return (totalBet * 3) + totalBet;
        case "High Pair":
            return (totalBet * 1) + totalBet;
        case "Low Pair":
            return (totalBet * 1) + totalBet;
        default:
            return 0;
    }
}

export { calculateWin, calculateBonus }; 