import characterData from './data.js';
import Character from './Character.js';

let monstersArray = ['orc', 'demon', 'goblin'];
let isWaiting = false;

function getNewMonster() {
	const nextMonsterData = characterData[monstersArray.shift()];
	return nextMonsterData ? new Character(nextMonsterData) : {};
}

/*
Challenge
1. Change the attack function so that when a monster dies, 
the next monster replaces it. If there are no more monsters,
call endGame(). 
2. Make sure that endGame() still gets called if the wizard
is killed.
*/

function attack() {
	if (!isWaiting) {
		wizard.setDiceHtml();
		monster.setDiceHtml();
		wizard.takeDamage(monster.currentDiceScore);
		monster.takeDamage(wizard.currentDiceScore);
		render();

		/*change the code below this line*/
		if (wizard.dead) {
			setTimeout(() => endGame(), 1500);
		} else if (monster.dead) {
			if (monstersArray.length > 0) {
				monster = getNewMonster();
				setTimeout(() => render(), 1000);
			} else {
				setTimeout(() => endGame(), 1500);
			}
		}
	}
}

function endGame() {
	isWaiting = true;
	const endMessage = wizard.health === 0 && monster.health === 0 ? 'No victors - all creatures are dead' : wizard.health > 0 ? 'The Wizard Wins' : 'The Orc is Victorious';

	const endEmoji = wizard.health > 0 ? '🔮' : '☠️';
	document.body.innerHTML = `
        <div class="end-game">
            <h2>Game Over</h2> 
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>
        `;
}

document.getElementById('attack-button').addEventListener('click', attack);

function render() {
	document.getElementById('hero').innerHTML = wizard.getCharacterHtml();
	document.getElementById('monster').innerHTML = monster.getCharacterHtml();
}

const wizard = new Character(characterData.hero);
let monster = getNewMonster();
render();
