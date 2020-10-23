const ATTACK_VALLUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('masimum life for You and Monster.', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPleyerHealth = chosenMaxLife;
let hasBonusLive = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife)

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    if (ev === LOG_EVENT_PLAYER_ATTACK) {

        logEntry.target = 'MONSTER';

    } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        }
    } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        }
    } else if (ev === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: ev,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        }
    } else if (ev === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: ev,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        }
    }
    battleLog.push(logEntry);
}


function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPleyerHealth = chosenMaxLife;
    resetGame(chosenMaxLife)
}

function endRound() {
    const initialPlayerHealth = currentPleyerHealth
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPleyerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPleyerHealth
    );

    if (currentPleyerHealth <= 0 && hasBonusLive) {
        hasBonusLive = false;
        removeBonusLife();
        currentPleyerHealth = initialPlayerHealth
        setPlayerHealth(initialPlayerHealth)
        alert('You would be dead but the bonus life saved you!')
    }

    if (currentMonsterHealth <= 0 && currentPleyerHealth > 0) {
        alert('Player won');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'Player won',
            currentMonsterHealth,
            currentPleyerHealth
        );
        reset()
    } else if (currentPleyerHealth <= 0 && currentMonsterHealth > 0) {
        alert('Monster win');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'Monster win',
            currentMonsterHealth,
            currentPleyerHealth
        );
        reset()
    } else if (currentMonsterHealth <= 0 && currentPleyerHealth <= 0) {
        alert('You have a draw');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'You have a draw',
            currentMonsterHealth,
            currentPleyerHealth
        );
        reset()
    }

}

function attackMonster(mode) {
    let maxDamage;
    let logEvent;
    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALLUE
        logEvent = LOG_EVENT_PLAYER_ATTACK
    } else if (mode === MODE_STRONG_ATTACK) {
        maxDamage = STONG_ATTACK_VALUE
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
    }
    console.log(mode)
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPleyerHealth
    );
    endRound();

}


function attackHandler() {
    attackMonster(MODE_ATTACK)
}

function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK)
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
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPleyerHealth
    );
    endRound();
    endRound();
}

function printLogHandler() {
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);