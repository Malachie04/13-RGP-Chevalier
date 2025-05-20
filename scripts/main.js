

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

//Variables globales
let playerNumber=0;
let message="";

let mana1='',vie1='',bar1='';
let mana2='',vie2='',bar2='';

//Selection des composants

function createPlayerCard(playerData,playerNumber) {
    const playerDiv = document.createElement('div');
    playerDiv.className = 'joeur1';
    playerDiv.classList.add(`playerID${playerNumber}`);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'joeur-content';

    const playerName = document.createElement('h2');
    playerName.className = 'playerName';
    playerName.textContent = playerData.name;

    const propertiesDiv = document.createElement('div');
    propertiesDiv.className = 'playerProperties';

    const forceP = document.createElement('p');
    forceP.className = `Force${playerNumber}`;
    forceP.innerHTML = `💪 Force : <span class="stringt">${playerData.strength}</span>`;

    const magicP = document.createElement('p');
    magicP.className = `magic${playerNumber}`;
    magicP.innerHTML = `🪄 Magie : <span class="magic">${playerData.magic}</span>`;

    const manaP = document.createElement('p');
    manaP.className = `Mana${playerNumber}`;
    manaP.innerHTML = `🔮 Mana : <span class="Mana">${playerData.mana}</span>`;

    const vieP = document.createElement('p');
    vieP.className = `Vie${playerNumber}`;
    vieP.innerHTML = `❤️ Vie : <span class="vie">${playerData.life}</span>`;

    const divBar=document.createElement('div');
    divBar.className='barDiv';

    const barP = document.createElement('p');
    barP.className = `bar${playerNumber}`;

    divBar.append(barP);

    propertiesDiv.append(forceP, magicP, manaP, vieP, divBar);
    contentDiv.append(playerName, propertiesDiv);
    playerDiv.append(contentDiv);

    document.getElementById('players').appendChild(playerDiv);
}

//Selection objects
const bouttonAjouter=document.querySelector('.ajouterJoueur');
const msgElement=document.querySelector('.message');
const chevaliers = [];
let [nomPayer,forcePayer,spellpowerPayer]=document.querySelectorAll('input');
let [attaquant,defensuer,attacttype]=document.querySelectorAll('select');
const lancer=document.querySelector('.lancer');

let attaker1=0,defender1=0;

// const playingAttacker='',playingdefender='';

console.log(attaquant.value,defensuer.value,attacttype.value);

[forcePayer,spellpowerPayer].forEach((input) => {
    input.addEventListener('input', (event) => {
        if(isNaN(event.target.value)){
            event.target.value = '';
            event.target.style.borderColor = 'red';
        }else {
            event.target.style.borderColor = 'green';
        }
    });
}
);
//Affectation des défenseurs et attaquants
[attaquant, defensuer].forEach((select) => { 
    select.addEventListener('change', (event) => {
        let nameclasse = event.target.className;
        
        if (nameclasse.includes("playerSelect")) {
            attaker1 = event.target.options[event.target.selectedIndex].textContent;
             afficherMessage(`Je suis ${attaker1} l'attanquant 🔫`);
        } else if (nameclasse.includes("oponentSelect")) {
            defender1 = event.target.options[event.target.selectedIndex].textContent;
            afficherMessage(`Je suis ${defender1} le défenseur💪`);
        }
        lancer.style.display = "none";
    });
});


//Affcetation des roles

attacttype.addEventListener('change', (event) => {

    if(attaquant.value === defensuer.value) {
        event.target.style.borderColor = 'red';
        message="Vous ne pouvez pas attaquer le même joueur !";
        afficherMessage(message);
        lancer.style.display="none";
        return;  
    }else{
        lancer.style.display="block";
    }

});

//Boutton lancer
lancer.addEventListener('click', (event) => {
    event.preventDefault();
    
    const playingAttacker = chevaliers.find(c => c.name === attaker1);
    const playingDefender = chevaliers.find(c => c.name === defender1);


    let selectedIndex = attacttype.selectedIndex;
    let onGoingAttack = attacttype.options[selectedIndex].textContent;


    if(onGoingAttack==='Attaque classique'){
        afficherMessage(playingAttacker.attack(playingDefender));
    }else{
        afficherMessage(playingAttacker.magicAttack(playingDefender));
        afficherMessage(playingDefender.getDamages(playingAttacker.strength));
    }
    





    console.log(onGoingAttack);

    console.log(playingAttacker);
    console.log(playingDefender);

    console.log(playingAttacker.shout());
    console.log(playingDefender.shout());
    
    rafresh(playingAttacker,playingDefender);

 
});

//Boutton ajouter
bouttonAjouter.addEventListener('click', (event)=> {
    event.preventDefault();
    
    if(nomPayer.value=="" || forcePayer.value=="" || spellpowerPayer.value==""){
        nomPayer.focus();
        return;
    }
    
    playerNumber++;
    if(playerNumber>2){
        message="Vous avez atteint le nombre maximum de joueurs !";
        return;
    }

    if(playerNumber==1){
        message="Vous avez ajouté un joueur !";
        chevaliers.push((new Chevalier(nomPayer.value, forcePayer.value, spellpowerPayer.value)));
        const playerData = {
        name: chevaliers[0].name,
        strength: chevaliers[0].strength,
        magic: chevaliers[0].magic,
        mana: chevaliers[0].mana,
        life: chevaliers[0].life
        }
        //Creation CARD
        createPlayerCard(playerData,playerNumber);
        //Recupération element
        mana1=document.querySelector('.playerID1 .Mana').textContent;
        vie1=document.querySelector('.playerID1 .vie').textContent;
        bar1=document.querySelector('.playerID1 .barDiv .bar1');
        //Affectation vuie
        bar1.style.width=`${vie1}%`;

        console.log(mana1);
        console.log(vie1);
        clearForm();

     }else if(playerNumber==2){
        message="Vous avez ajouté un joueur !";
        chevaliers.push((new Chevalier(nomPayer.value, forcePayer.value, spellpowerPayer.value)));
        const playerData = {
        name: chevaliers[1].name,
        strength: chevaliers[1].strength,
        magic: chevaliers[1].magic,
        mana: chevaliers[1].mana,
        life: chevaliers[1].life
        }
        createPlayerCard(playerData,playerNumber);
        event.target.style.display="none";


        mana2=document.querySelector('.playerID2 .Mana').textContent;
        vie2=document.querySelector('.playerID2 .vie').textContent;
        // document.getElementsByClassName('bar2')[0].width=`${vie2}%`;

        bar2=document.querySelector('.playerID2 .barDiv .bar2');
        //Affectation vuie
        bar2.style.width=`${vie2}%`
        
        clearForm();

        //Creation des options selects
        chevaliers.forEach((chevalier, index) => {
            const attaquer = document.createElement('option');
            const defender = document.createElement('option');
            attaquer.value = index;
            defender.value = index;
            attaquer.textContent = chevalier.name;
            defender.textContent = chevalier.name;
            attaquant.append(attaquer);
            defensuer.append(defender);
        });

    }   
});

//Vider le formulaire
function clearForm() {
    nomPayer.value = '';
    forcePayer.value = '';
    spellpowerPayer.value = '';
    nomPayer.focus();
}
function afficherMessage(message) {
    msgElement.textContent = message;
    setTimeout(() => {
        msgElement.textContent = '';
    }, 2000);
}



//The rafrecher
function rafresh(attacker, defender) {


    //Selection element joueur
    const Jvie1=document.querySelector('.playerID1 .Vie1 .vie');
    const Jvie2=document.querySelector('.playerID2 .Vie2 .vie');


    // Met à jour les valeurs du joueur attaquant

    const mana1 = attacker.mana;
    const vie1 = attacker.life;
    Jvie1.innerHTML = `${vie1}`;
    bar1.style.width = `${attacker.life}%`;

    // Met à jour les valeurs du joueur défenseur
    const mana2 = defender.mana;
    const vie2 = defender.life;
    Jvie2.innerHTML = `${vie2}`;
    bar2.style.width = `${defender.life}%`;

    // Optionnel : afficher les valeurs
    console.log(`Attaquant - Mana: ${mana1}, Vie: ${vie1}`);
    console.log(`Défenseur - Mana: ${mana2}, Vie: ${vie2}`);
}
