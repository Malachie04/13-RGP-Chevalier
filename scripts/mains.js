
class Personnage {
    constructor(name, life = 100, mana = 50, potions = 2) {
        this.name = name;
        this.life = life;
        this.mana = mana;
        this.potions = potions;
    }

    shout() {
        return `${this.name} entre en scène !`;
    }

    getDamages(damage) {
        this.life -= damage;
        if (this.life < 0) this.life = 0;
        return `${this.name} subit ${damage} dégâts. Vie restante : ${this.life}`;
    }

    usePotion() {
        if (this.isDead()) return `${this.name} est mort et ne peut pas utiliser de potion !`;
        if (this.potions <= 0) return `${this.name} n'a plus de potions !`;
        this.potions -= 1;
        this.life = Math.min(this.life + 30, 100);
        return `${this.name} utilise une potion. Vie : ${this.life}, Potions : ${this.potions}`;
    }

    isDead() {
        return this.life <= 0;
    }

    attack(target) {
        throw new Error("La méthode attack doit être implémentée dans la classe dérivée");
    }

    specialAttack(target) {
        throw new Error("La méthode specialAttack doit être implémentée dans la classe dérivée");
    }
}

// Classe dérivée : Chevalier
class Chevalier extends Personnage {
    constructor(name, strength, magic) {
        super(name);
        this.strength = strength;
        this.magic = magic;
    }

    attack(target) {
        if (this.isDead()) return `${this.name} est mort et ne peut pas attaquer !`;
        if (target.isDead()) return `${target.name} est déjà mort !`;
        const damage = this.strength;
        return `${this.name} attaque ${target.name} avec force (${damage}) ! ${target.getDamages(damage)}`;
    }

    specialAttack(target) {
        if (this.isDead()) return `${this.name} est mort et ne peut pas lancer de sort !`;
        if (this.mana < 20) return `${this.name} n'a pas assez de mana !`;
        if (target.isDead()) return `${target.name} est déjà mort !`;
        this.mana -= 20;
        const damage = this.magic;
        return `${this.name} lance un sort sur ${target.name} (${damage} dégâts) ! ${target.getDamages(damage)} Mana restant : ${this.mana}`;
    }
}

// Classe Game
class Game {
    constructor(player1, player2) {
        this.players = [player1, player2];
        this.currentPlayerIndex = 0;
        this.isGameOver = false;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    getOpponent() {
        return this.players[1 - this.currentPlayerIndex];
    }

    nextTurn() {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
        this.updateUI();
    }

    performAction(action) {
        if (this.isGameOver) return "Le jeu est terminé !";
        const currentPlayer = this.getCurrentPlayer();
        const opponent = this.getOpponent();
        let message;

        switch (action) {
            case 'attack':
                message = currentPlayer.attack(opponent);
                break;
            case 'specialAttack':
                message = currentPlayer.specialAttack(opponent);
                break;
            case 'usePotion':
                message = currentPlayer.usePotion();
                break;
            default:
                message = "Action inconnue !";
        }

        this.checkGameOver();
        this.nextTurn();
        return message;
    }

    checkGameOver() {
        if (this.players.some(player => player.isDead())) {
            this.isGameOver = true;
            const winner = this.players.find(player => !player.isDead());
            return `${winner ? winner.name : "Personne"} a gagné !`;
        }
        return null;
    }

    updateUI() {
        const playersContainer = document.getElementById('players');
        playersContainer.innerHTML = '';
        this.players.forEach((player, index) => {
            const isCurrentPlayer = index === this.currentPlayerIndex;
            playersContainer.appendChild(createPlayerCard(player, isCurrentPlayer));
        });

        const gameOverMessage = this.checkGameOver();
        if (gameOverMessage) {
            document.getElementById('game-over').style.display = 'block';
            document.getElementById('game-over').textContent = gameOverMessage;
        }
    }
}

// Générer les cartes des joueurs
function createPlayerCard(player, isCurrentPlayer) {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'joeur1';
    playerDiv.id = `player-${player.name}`;
    if (isCurrentPlayer) playerDiv.style.border = '2px solid green';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'joeur-content';

    const playerName = document.createElement('h2');
    playerName.className = 'playerName';
    playerName.textContent = player.name;

    const propertiesDiv = document.createElement('div');
    propertiesDiv.className = 'playerProperties';

    const forceP = document.createElement('p');
    forceP.className = 'Force';
    forceP.innerHTML = `💪 Force : <span class="stringt">${player.strength}</span>`;

    const magicP = document.createElement('p');
    magicP.className = 'magic';
    magicP.innerHTML = `🪄 Magie : <span class="magic">${player.magic}</span>`;

    const manaP = document.createElement('p');
    manaP.className = 'Mana';
    manaP.innerHTML = `🔮 Mana : <span class="Mana">${player.mana}</span>`;

    const vieP = document.createElement('p');
    vieP.className = 'Vie';
    vieP.innerHTML = `❤️ Vie : <span class="vie">${player.life}</span>`;

    const barP = document.createElement('p');
    barP.className = 'bar';

    const actionsDiv = document.createElement('div');
    if (isCurrentPlayer && !game.isGameOver) {
        const attackBtn = document.createElement('button');
        attackBtn.textContent = 'Attaquer';
        attackBtn.onclick = () => performAction('attack');

        const specialAttackBtn = document.createElement('button');
        specialAttackBtn.textContent = 'Sort';
        specialAttackBtn.onclick = () => performAction('specialAttack');

        const potionBtn = document.createElement('button');
        potionBtn.textContent = 'Potion';
        potionBtn.onclick = () => performAction('usePotion');

        actionsDiv.append(attackBtn, specialAttackBtn, potionBtn);
    }

    propertiesDiv.append(forceP, magicP, manaP, vieP, barP, actionsDiv);
    contentDiv.append(playerName, propertiesDiv);
    playerDiv.append(contentDiv);

    return playerDiv;
}

// Effectuer une action
function performAction(action) {
    const message = game.performAction(action);
    logAction(message);
}

// Journal des actions
function logAction(message) {
    const log = document.getElementById('log');
    const p = document.createElement('p');
    p.textContent = message;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
}

// Initialisation du jeu
const player1 = new Chevalier("Lancelot", 20, 15);
const player2 = new Chevalier("Arthur", 18, 20);
const game = new Game(player1, player2);

logAction(player1.shout());
logAction(player2.shout());
game.updateUI();
