// obiekt przechowujący dane o podsumowaniu gry
const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}
// obiekt przechowujący dane o grze w trakcie jej trwania
const game = {
    playerHand: '',
    aiHand: '',


}
// zamieniamy zawartość zmiennej na tablicę
const hands = [...document.querySelectorAll('.select img')];

function handSelection() {

    // dataset przechowuje różne informacje do których można się
    // odnieść. odnosimy się do data-option i przypisujemy papier, kamien lub nozyczki do 
    // game.playerHand
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px yellow';
}
// nasłuchiwanie na każdy elemend z hands czyli img papier nozyczki kamien
hands.forEach(hand => hand.addEventListener('click', handSelection))

// losowanie hand dla ai
function aiChoice() {
    const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;
    return aiHand;
}
// funkcja z rezultatem gry. Tu przekazujemy informacje o wyborze gracza i ai
function checkResult(player, ai) {
    if (player === ai) {
        return 'draw';
        // możliwości dla wygranej gracza
    } else if ((player === 'papier' && ai === 'kamień') ||
        (player === 'kamień' && ai === 'nożyczki') ||
        (player === 'nożyczki' && ai === 'papier')) {
        return 'win';


    } else {
        return 'loss';


    }
}

// Publikacja wyniku 

function publishResult(player, ai, result) {

    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    document.querySelector('[data-summary="who-win"]').textContent = player;

    document.querySelector('.numbers span').textContent = ++gameSummary.numbers;
    if (result === 'win') {
        document.querySelector('.wins span').textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = 'Wygrał Gracz!';
    } else if (result === 'draw') {
        document.querySelector('.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = 'Remis!';
    } else {
        document.querySelector('.losses span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = 'Wygrał komputer!';
    }


}

function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = '';

}
// funkcja sterująca

function startGame() {
    // sprawdzamy czy coś zostało wybrane
    // jesli game.playerHand jest pusta to :
    if (game.playerHand === '') {

        return alert('wybierz dłoń!');

    }
    game.aiHand = aiChoice();

    const gameResult = checkResult(game.playerHand, game.aiHand);
    console.log(gameResult);
    publishResult(game.playerHand, game.aiHand, gameResult)
    endGame();
}


document.querySelector('.start').addEventListener('click', startGame)