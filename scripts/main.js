//Classes
class Chevalier{
    constructor(name,strenght,magic,life,mana,position){
        this.name = name;
        this.strenght = strenght;
        this.magic = magic;
        this.life = life;
        this.mana = mana;
        this.position = position;
    }
    shout(){
        return this.name;
    }
    classicAttack(){
        return this.strenght;
    }
    magicAttack(){
        return 20;
    }
    getDamage(damage){
        this.life -= damage;
        return this.name + " a pris " + damage + " et son état de santé est !"+ this.life;
    }
    userPosition(life){

        if(this.position <=100){
         this.life+=30;
        }

    }

    heal(){
        return this.name + " se soigne de " + this.life + " !";
    }
    manaAttack(){
        return this.name + " attaque avec une mana de " + this.mana + " !";
    }
    isDead(){   
        if(this.life <= 0){
            return true;
        }else{
            return false;
        }
    }
      
}