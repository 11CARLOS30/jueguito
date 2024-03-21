document.addEventListener("DOMContentLoaded", function() {
    let player1Name = prompt("Ingrese el nombre del Jugador 1:");
    let player2Name = prompt("Ingrese el nombre del Jugador 2:");

    const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Example card values
    const pairs = cards.concat(cards); // Duplicate cards to create pairs
    let shuffledCards = shuffleArray(pairs); // Shuffle the cards
    let flippedCards = [];
    let matchedCards = [];
    let currentPlayer = 1;
    let player1Score = 0;
    let player2Score = 0;

    const gameBoard = document.getElementById('gameBoard');
    const player1ScoreDisplay = document.getElementById('player1Score');
    const player2ScoreDisplay = document.getElementById('player2Score');

    player1ScoreDisplay.textContent = `${player1Name}: ${player1Score}`;
    player2ScoreDisplay.textContent = `${player2Name}: ${player2Score}`;

    // Create and display cards on the game board
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.dataset.value = card;
        cardElement.dataset.flipped = 'false';
        cardElement.addEventListener('click', () => flipCard(cardElement));
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = '';
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = card;
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);
        gameBoard.appendChild(cardElement);
    });

    // Function to flip a card
    function flipCard(cardElement) {
        if (flippedCards.length < 2 && !matchedCards.includes(cardElement)) {
            cardElement.classList.add('flipped');
            flippedCards.push(cardElement);
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    // Function to check if flipped cards match
    function checkMatch() {
        const card1 = flippedCards[0];
        const card2 = flippedCards[1];
        if (card1.dataset.value === card2.dataset.value) {
            matchedCards.push(card1, card2);
            updateScores();
            if (matchedCards.length === pairs.length) {
                alert('El ganador del juego es ');
            }
        } else {
            flippedCards.forEach(card => {
                setTimeout(() => {
                    card.classList.remove('flipped');
                }, 1000);
            });
            switchPlayer();
        }
        flippedCards = [];
    }

    // Function
    // Function to update player scores
    function updateScores() {
        if (currentPlayer === 1) {
            player1Score++;
            player1ScoreDisplay.textContent = `${player1Name}: ${player1Score}`;
        } else {
            player2Score++;
            player2ScoreDisplay.textContent = `${player2Name}: ${player2Score}`;
        }
    }

    // Function to switch player turns
    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        alert(`Turno del Jugador ${currentPlayer === 1 ? player1Name : player2Name}`);
    }

    // Function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});