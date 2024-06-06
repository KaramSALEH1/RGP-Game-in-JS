let xp =0; 
let health =100;
let gold =50;
let currentWeapon =0;
let inventory =["stick"];
let fighting;
let monsterHeath;

const button1 =document.querySelector('#button1');
const button2 =document.querySelector('#button2');
const button3 =document.querySelector('#button3');
const text =document.querySelector('#text');
const xpText =document.querySelector('#xpText');
const healthtext =document.querySelector('#healthText');
const goldText =document.querySelector('#goldText');
const monsterStats =document.querySelector('#monsterStats');
const monsterNameText =document.querySelector('#monsterNameText');
const monsterHealthText =document.querySelector('#monsterHealthText');

const weapons =[
    {
        name : "stick",
        power: 5
    },
    {
        name : "dagger",
        power : 30
    },
    {
        name : "claw hanner",
        power : 50
    },
    {
        name : "sword" ,
        power : 100 
    }
]; 

const monsters = [
    {
        name: "slime",
        level : 2,
        health : 15
    },
    {
        name : "fanged beast",
        level :8 ,
        health :60
    },
    {
        name: "dragon",
        level : 20,
        health : 300
    }
];

const locations =[
    {
        name : "town square",
        "button text": ["Go to store" , "Go to cave" , "Fight the dragon"],
        "button functions": [goStore , goCave, fightDragon],
        text : "you are in the town square"
    },
    {
        name : "store",
        "button text": ["Buy 10 Health (10 gold)", "Buy Weapon (30 gold)", "Go to town square"],
        "button functions" : [buyHealth , buyWeapon , goTown],
        text : "you are in the store"
    },
    {
        name : "cave",
        "button text" : ["Fight Slime", "Fight fanged beast", "Go town square"],
        "button functions" : [fightSlime , fightBeast , goTown ],
        text : "You've entered the Cave"
    },
    {
        name: "fight",
        "button text" : ["Attack", "Dodge", "Run"],
        "button functions" : [attack, dodge ,goTown],
        text : "you're fighting a monster"
    },
    {
        name : "kill monsters",
        "button text" : ["Go town square", "Go town square", "Go town square"],
        "button functions" : [goTown , goTown , goTown],
        text : "hey HERO you killed him , gain your xp and gold please"
    },
    {
        name : "lose",
        "button text": ["REPLAY?","REPLAY?","Go To Town"],
        "button functions" : [restart,restart,goTown],
        text : " You're died!"
    }
]


button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goTown (){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goCave (){
    update(locations[2]);
}

function buyHealth(){
    if (gold >= 10){
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthtext.innerText = health;
    }
    else{
        text.innerText ="you don't have enough gold!"
    }
}

function buyWeapon(){
    if (currentWeapon < weapons.length -1){
        if (gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name ;
            text.innerText = "You now have a " + newWeapon ;
            inventory.push(newWeapon);
            text.innerText += " in your inventory you have :" + inventory;
        }else{
            text.innerText = "You have no enough gold!"
        }
    }else{
        text.innerText = "you have the most power weapon now"
        button2.innerText = "Sell the weakest weapon for 15 gold"
        button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
    if (inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let firstWeapon = inventory[0];
        inventory.shift();
        text.innerText = "you sold" + firstWeapon + "your inventory is :" + inventory;
    }else{
        text.innerText ="you have only this weapon"
    }
}

function goFight(){
    update(locations[3]);
    monsterHeath = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHeath;
}

function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText = " You are attacking with : " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHeath -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) +1 ;
    healthtext.innerText = health;
    monsterHealthText.innerText = monsterHeath;
    if (health <= 0){
        lose();
    }else if (monsterHeath <= 0){
        defeatMonster();
    }
}

function lose(){
    update(locations[5]);
}

function restart(){
    xp =0; 
    health =100;
    gold =50;
    currentWeapon =0;
    inventory =["stick"];
    goldText.innerText = gold ;
    xpText.innerText = xp ;
    healthtext.innerText = health ;
    goTown();
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp+= monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function dodge(){
     text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function fightSlime(){
    fighting =0;
    goFight();
}

function fightBeast(){
    fighting =1;
    goFight();
}

function fightDragon(){
    fighting =2;
    goFight();
}