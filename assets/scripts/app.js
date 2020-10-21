const ATTACK_VALLUE = 10;
const MONSTER_ATTACK_VALUE = 10;
const STONG_ATTACK_VALUE = 17

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPleyerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife)

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALLUE
    } else if (mode === 'STONG_ATTACK') {
        maxDamage = STONG_ATTACK_VALUE
    }
    const damage = dealMonsterDamage(maxDamage);
    console.log(mode)
    currentMonsterHealth -= damage;
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


function attackHandler() {
    attackMonster('ATTACK')
}

function strongAttackHandler() {
    attackMonster('STONG_ATTACK')
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler)