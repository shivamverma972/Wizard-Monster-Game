function getDiceRollArray(diceCount) {
    return new Array(diceCount).fill(0).map(()=>
        Math.floor(Math.random() * 6) + 1
    )
}

function getDicePlaceholderHtml(diceCount){
    return new Array(diceCount).fill(0).map(()=>
        `<div class="placeholder-dice"></div>`
    ).join('')
}

const getPercentage = (remaingHealth,maxHealth) => (remaingHealth*100 )/maxHealth 


export {getDiceRollArray, getDicePlaceholderHtml,getPercentage}