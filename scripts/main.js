

//La classe Chevalier
class Chevalier {
    constructor(name, strength, magic) {
        this.name = name;
        this.strength = strength;
        this.magic = magic;
        this.life = 100; // Points de vie initiaux
        this.mana = 50;  // Points de mana initiaux
        this.potions = 2; // Nombre de potions initial
    }

    shout() {
        return `Je suis ${this.name} !`;
    }

    attack(target) {
        if (this.isDead()) {
            return `${this.name} est mort et ne peut pas attaquer !`;
        }
        if (target.isDead()) {
            return `${target.name} est déjà mort !`;
        }
        target.getDamages(this.strength);
        return `${this.name} attaque ${target.name} et inflige ${this.strength} dégâts !`;
    }

    magicAttack(target) {
        if (this.isDead()) {
            return `${this.name} est mort et ne peut pas lancer de sort !`;
        }
        if (this.mana < 20) {
            return `${this.name} n'a pas assez de mana pour lancer un sort !`;
        }
        if (target.isDead()) {
            return `${target.name} est déjà mort !`;
        }
        this.mana -= 20;
        target.getDamages(this.magic);
        return `${this.name} lance un sort sur ${target.name} et inflige ${this.magic} dégâts ! Mana restant : ${this.mana}`;
    }

    getDamages(damage) {
        this.life -= damage;
        if (this.life < 0) {
            this.life = 0;
        }
        return `${this.name} a pris ${damage} dégâts. Points de vie restants : ${this.life}`;
    }

    usePotion() {
        if (this.isDead()) {
            return `${this.name} est mort et ne peut pas utiliser de potion !`;
        }
        if (this.potions <= 0) {
            return `${this.name} n'a plus de potions !`;
        }
        this.potions -= 1;
        this.life += 30;
        if (this.life > 100) {
            this.life = 100;
        }
        return `${this.name} utilise une potion et restaure 30 PV. Points de vie : ${this.life}, Potions restantes : ${this.potions}`;
    }

    isDead() {
        return this.life <= 0;
    }
}


//Selection des composants



function createPlayerCard(playerData) {
    
    const playerDiv = document.createElement('div');
    playerDiv.className = 'joeur1';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'joeur-content';

    const playerName = document.createElement('h2');
    playerName.className = 'playerName';
    playerName.textContent = playerData.name;

    const propertiesDiv = document.createElement('div');
    propertiesDiv.className = 'playerProperties';

    const forceP = document.createElement('p');
    forceP.className = 'Force';
    forceP.innerHTML = `💪 Force : <span class="stringt">${playerData.strength}</span>`;

    const magicP = document.createElement('p');
    magicP.className = 'magic';
    magicP.innerHTML = `🪄 Magie : <span class="magic">${playerData.magic}</span>`;

    const manaP = document.createElement('p');
    manaP.className = 'Mana';
    manaP.innerHTML = `🔮 Mana : <span class="Mana">${playerData.mana}</span>`;

    const vieP = document.createElement('p');
    vieP.className = 'Vie';
    vieP.innerHTML = `❤️ Vie : <span class="vie">${playerData.life}</span>`;

    const barP = document.createElement('p');
    barP.className = 'bar';

    propertiesDiv.append(forceP, magicP, manaP, vieP, barP);
    contentDiv.append(playerName, propertiesDiv);
    playerDiv.append(contentDiv);

    document.getElementById('players').appendChild(playerDiv);
}

// Exemple d'utilisation
const playerData = {
    name: "Lancelot",
    strength: 20,
    magic: 15,
    mana: 50,
    life: 100
};
createPlayerCard(playerData);
