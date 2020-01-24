let round = 0;
let userScore = 0;
let cpuScore = 0;

const playBtn = document.getElementById('play-btn');
const home = document.getElementById('home');
const game = document.getElementById('game');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const movesUl = document.querySelector('.moves');
const roundDisplay = document.getElementById('currentRound');
const userScoreDisplay = document.getElementById('userScore');
const cpuScoreDisplay = document.getElementById('cpuScore');
const moves = ['rock','paper','scissors'];

const winMsg = [
	'You win! Rock beats scissors!',
	'You win! Scissors beats papper!',
	'You win! Paper beats rock!',
];

const loseMsg = [
	'You lose! Paper beats rock!',
	'You lose! Rock beats scissors!',
	'You lose! Scissors beats paper!',
];

function getCpuMove() {
	const index = Math.floor(Math.random() * 3);

	return moves[index];
}

function playRound(userMove, cpuMove) {
	switch (userMove) {
		case cpuMove: {
			return 'Tie! Try again!';
			break;
		}
		case 'rock': {
			return cpuMove === 'scissors' ? winMsg[0] : loseMsg[0];
			break;
		}
		case 'scissors': {
			return cpuMove === 'paper' ? winMsg[1] : loseMsg[1];
			break;
		}
		case 'paper': {
			return cpuMove === 'rock' ? winMsg[2] : loseMsg[2];
			break;
		}
	}
}

function showResult(result) {
	if (winMsg.includes(result)) {
		modal.classList.remove('red-bg', 'yellow-bg');
		modal.classList.add('green-bg');
	}

	if (loseMsg.includes(result)) {
		modal.classList.remove('green-bg', 'yellow-bg');
		modal.classList.add('red-bg');
	}

	if (!winMsg.includes(result) && !loseMsg.includes(result)) {
		modal.classList.remove('red-bg', 'green-bg');
		modal.classList.add('white-bg');
	}

	modalText.textContent = result;
	modal.classList.remove('hidden');
	modal.classList.add('flex');
}

function hideResult() {
	modal.classList.remove('flex');
	modal.classList.add('hidden');
}

function updateStats(result) {
	if (winMsg.includes(result)) {
		round++;
		userScore++;
	}

	if (loseMsg.includes(result)) {
		round++;
		cpuScore++;
	}

}

function refreshWindow() {
	setTimeout(function() {
		window.location.reload();
	}, 4000);
}

function checkForGameOver() {
	if (cpuScore === 3) {
		showResult('Game over. You lose.');
		refreshWindow();
	}

	if (userScore === 3) {
		refreshWindow();
		showResult('Game over. You win!');
	}
}

function showStats() {
	roundDisplay.textContent = round;
	userScoreDisplay.textContent = userScore;
	cpuScoreDisplay.textContent = cpuScore;
}

movesUl.addEventListener('click', function(e) {
	if (e.target.classList.contains('moves__item')) {
		const userMove = e.target.textContent;
		const cpuMove = getCpuMove();
		const result = playRound(userMove, cpuMove);

		showResult(result);
		updateStats(result);
		showStats();

		setTimeout(function() {
			hideResult();
			checkForGameOver();
		}, 2000);
	}
});


playBtn.addEventListener('click', function() {
	home.classList.add('hidden');
	home.classList.remove('flex');
	game.classList.add('flex');
	game.classList.remove('hidden');
});

