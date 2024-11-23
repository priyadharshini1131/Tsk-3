const cardsArray = [
  { id: 1, img: "🍎" },
  { id: 2, img: "🍌" },
  { id: 3, img: "🍇" },
  { id: 4, img: "🍓" },
  { id: 5, img: "🍍" },
  { id: 6, img: "🍉" },
  { id: 7, img: "🍊" },
  { id: 8, img: "🍒" },
  { id: 1, img: "🍎" },
  { id: 2, img: "🍌" },
  { id: 3, img: "🍇" },
  { id: 4, img: "🍓" },
  { id: 5, img: "🍍" },
  { id: 6, img: "🍉" },
  { id: 7, img: "🍊" },
  { id: 8, img: "🍒" },
];

let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");

// Shuffle function to randomize cards
function shuffleCards(cards) {
  return cards.sort(() => Math.random() - 0.5);
}

// Create the game cards dynamically
function createBoard() {
  const shuffledCards = shuffleCards([...cardsArray]);
  gameBoard.innerHTML = "";
  shuffledCards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;

    const cardFront = document.createElement("span");
    cardFront.classList.add("card-front");
    cardFront.textContent = card.img;

    cardElement.appendChild(cardFront);
    gameBoard.appendChild(cardElement);

    cardElement.addEventListener("click", flipCard);
  });
}

// Flip a card
function flipCard(event) {
  if (!canFlip || event.target.classList.contains("flipped")) return;

  const card = event.target;
  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

// Check if the flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.id === card2.dataset.id) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs += 1;
    flippedCards = [];
    if (matchedPairs === cardsArray.length / 2) {
      setTimeout(() => alert("You win!"), 500);
    }
  } else {
    canFlip = false;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      canFlip = true;
    }, 1000);
  }
}

// Restart the game
function restartGame() {
  flippedCards = [];
  matchedPairs = 0;
  canFlip = true;
  createBoard();
}

// Initialize the game
restartBtn.addEventListener("click", restartGame);
createBoard();
