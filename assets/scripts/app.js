const ATTACK_VALLUE = 10;
const MONSTER_ATTACK_VALUE = 10;
const STONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPleyerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife)

function endRound() {
   
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPleyerHealth -= playerDamage;
    if (currentMonsterHealth <= 0 && currentPleyerHealth > 0) {
        alert('Player won');
    } else if (currentPleyerHealth <= 0 && currentMonsterHealth > 0) {
        alert('Monster win');
    } else if (currentMonsterHealth <= 0 && currentPleyerHealth <= 0) {
        alert('You have a draw');
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