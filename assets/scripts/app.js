const ATTACK_VALLUE = 10;
const MONSTER_ATTACK_VALUE = 10;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPleyerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife)

function attackHandler() {
    const damage = dealMonsterDamage(ATTACK_VALLUE);
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

attackBtn.addEventListener('click', attackHandler);