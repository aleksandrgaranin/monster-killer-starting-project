const ATTACK_VALLUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const enteredValue = prompt('masimum life for You and Monster.', '100');

let chosenMaxLife = parseInt(enteredValue);

if ( isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPleyerHealth = chosenMaxLife;
let hasBonusLive = true

adjustHealthBars(chosenMaxLife)

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPleyerHealth = chosenMaxLife;
    resetGame(chosenMaxLife)
}

function endRound() {
    const initialPlayerHealth = currentPleyerHealth
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPleyerHealth -= playerDamage;

    if (currentPleyerHealth <= 0 && hasBonusLive) {
        hasBonusLive = false;
        removeBonusLife();
        currentPleyerHealth = initialPlayerHealth
        setPlayerHealth(initialPlayerHealth)
        alert('You would be dead but the bonus life saved you!')
    }

    if (currentMonsterHealth <= 0 && currentPleyerHealth > 0) {
        alert('Player won');
        reset()
    } else if (currentPleyerHealth <= 0 && currentMonsterHealth > 0) {
        alert('Monster win');
        reset()
    } else if (currentMonsterHealth <= 0 && currentPleyerHealth <= 0) {
        alert('You have a draw');
        reset()
    }

}

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALLUE
    } else if (mode === 'STONG_ATTACK') {
        maxDamage = STONG_ATTACK_VALUE
    }
    console.log(mode)
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();

}


function attackHandler() {
    attackMonster('ATTACK')
}

function strongAttackHandler() {
    attackMonster('STONG_ATTACK')
}

function healPlayerHandler() {
    let healValue;
    if (currentPleyerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You cant't heal to more than max initial health.")
        healValue = chosenMaxLife - currentPleyerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPleyerHealth += healValue;
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);