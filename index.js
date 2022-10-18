import characterData from "./data.js";
import Character from "./Character.js"

let monstersArray = ["orc", "demon", "goblin"];
let isWaiting=false

document.getElementById("attack-button").addEventListener("click",attack)

function getNewMonster(){
    const nextMonsterData=characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData):{}

}

const wizard = new Character(characterData.hero)
let monster= getNewMonster()

function render() {
    document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
    document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}

function attack(){
    if(!isWaiting){
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
    
        if(wizard.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting=true
            if(monstersArray.length>0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting=false
                },1500)
            }
            else{
                endGame()
            }
        }
    }
}

function endGame(){
    isWaiting=true
    const endMessage = (wizard.health===0 &&  monster.health===0) ?
        "No victors - all creatures are dead" : (wizard.health===0) ?
        "The Monster are Victorious" :"The Wizard Wins" 
    const endEmoji = wizard.health>0 ? "🔮" : "☠️"
    setTimeout(()=>{
        document.body.innerHTML = 
            `<div class="end-game">
                <h2>Game Over</h2>
                <h3>${endMessage}</h3>
                <p class="end-emoji">${endEmoji}</p>
            </div>` 
    }, 1500)
    
}

render()
