const symbols = ['O', 'X']
const playerCells = {
    player1: [],
    player2: []
}
let check = 0
const winCon = ['012', '048', '036', '345', '678', '147', '258', '246',]

const secondSec = document.querySelector('#tic_second_sec')
const gameDiv = document.querySelector('#game_div')
const playerChoose = document.querySelector('#player_choose')
const cells = document.querySelectorAll('.cell')


let playerOneSymbol;
let turnToPlay = 0;
let currentPlayer = '';
let playCount = 0;

secondSec.addEventListener('click', e => {
    const id = e.target.id;
    const clas = e.target.className

    if(clas == 'symbol'){
        playerOneSymbol = symbols.findIndex(it => it === id)
        playerChoose.classList.add('hidden')
        cells.forEach(cell => {
            cell.classList.remove('hidden')
        })

        console.log(playerOneSymbol)
    }
})

async function startGame(p1Data, p2Data) {
    let run = 0;
    let runCount = 0

    const helpFunc = (arr) => {
        let uRun = 0;
        do {
            let iCounter = 0

            arr.map(it => {
                let istrue = winCon[uRun].includes(it)
                if(istrue) { iCounter = iCounter + 1 }
            })

            if(iCounter == 3) {
                uRun = false
                return `won`
            } else {
                uRun = uRun + 1
            }

            if(uRun == winCon.length && iCounter !== 3) {
                uRun = false
                return `lost`
            }
            runCount = runCount + 1

        } while (uRun || uRun == 0);

    }
    let result;

    let playerOne = `Player One ${helpFunc(p1Data)}`
    let playerTwo = `Player two ${helpFunc(p2Data)}`

    playerOne.includes('won') && (
        result = 'Player One Wins'
    )
    playerTwo.includes('won') && (
        result = 'Player Two Wins'
    )
    if(playerOne.includes('lost') && playerTwo.includes('lost') && playCount === 9 ) {
        result = 'Draw'
    }

    console.log(result)

}

const checkCell = () => {
    let t2 = [...cells]
    let n = 0
    let t = ''
    do {
        if(n !== t2.length && t == '') {
            t = t2[n].innerHTML 
            n = n + 1
        } else {
            console.log(n, t2.length)
            t = 'stop'
        }
    
    } while (t == '');

    if(t == 'stop') {
        return null
    } else {
        return 'found'
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const content = cell.innerHTML;
        const id = cell.id;
        playCount = playCount + 1;

        console.log('play count:', playCount)
        if(content == '') {
            if(checkCell() === null) {turnToPlay = playerOneSymbol; currentPlayer = 'player1', console.log('this')}
            cell.innerHTML = symbols[turnToPlay],
            playerCells[currentPlayer].push(id)

            turnToPlay == 0 ? turnToPlay = 1 : turnToPlay = 0 ;
            currentPlayer == 'player1' ? currentPlayer = 'player2' : currentPlayer = 'player1';

        } else {
            console.log('filled cell')
        }

        if(playerCells.player1.length >= 3 || playerCells.player2.length >= 3){
            startGame(playerCells.player1, playerCells.player2)
        } 
        console.log(playerCells)
    })
})

