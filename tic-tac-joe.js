const symbols = ['O', 'X']
const filledCells = {
    player1: [],
    player2: []
}
let cFilledCells = []
let check = 0
const winCon = ['012', '048', '036', '345', '678', '147', '258', '246',]

const resultSec = document.querySelector('#result_sec')
const h2 = document.createElement('h2')
const secondSec = document.querySelector('#tic_second_sec')
const gameDiv = document.querySelector('#game_div')
const playerChoose = document.querySelector('#player_choose')
const cells = document.querySelectorAll('.cell')
const diffs = document.querySelectorAll('.game_diff_level')

const scores = document.querySelectorAll('.scores')
const round = document.querySelector('#round')
const mainBtn = document.querySelector('#main_btn')

let gameDifficulty = 'easy'
let playerOneSymbol;
let playerTwoSymbol;
let turnToPlay = 0;
let currentPlayer = '';
let playCount = 0;  

mainBtn.addEventListener('click', () => {
    mainBtn.innerHTML == 'Reset' && ( location.reload() )
})

secondSec.addEventListener('click', e => {
    const id = e.target.id;
    const clas = e.target.className

    if(clas == 'symbol'){
        playerOneSymbol = symbols.findIndex(it => it === id)
        playerOneSymbol === 0 ? playerTwoSymbol = 1 : playerTwoSymbol = 0

        playerChoose.classList.add('hidden')
        cells.forEach(cell => {
            cell.classList.remove('hidden')
        })

    }
})

diffs.forEach(diff => {
    diff.addEventListener('click', () => {
        gameDifficulty = diff.innerHTML
        console.log(gameDifficulty)
        
    })
})

function handleCells(field, value, setField, setValue) {
    let int;
    playCount = playCount + 1

    int = setInterval(() => {
        cells.forEach(cell => {
            cell[field] == value  &&  (
                cell[setField] = setValue
            )
        })

        clearInterval(int)
    }, 800);

}

function cpuPlayer() {
    const allPlays = '012345678'
    let freeCells = []
    let invalidPlays = []

    const cpuPlays = {
        possiblePlays: [],
        optimalPlays: '',
        urgentPlay: '',
    } //
    const playerPlays = {
        possiblePlays: '',
        optimalPlays: '',
    }  //

    getPlays()
     console.log(playerPlays.optimalPlays)
     console.log(cpuPlays.optimalPlays)

    if(playCount < 9 )  {
        switch(true) {
            case (cpuPlays.urgentPlay !== '' && currentPlayer === 'player2') : 
                const use = getCpuPlayValue(cpuPlays.urgentPlay)
                handleCells('id', use, 'innerHTML', symbols[playerTwoSymbol]);
    
                filledCells.player2.push(use);
                currentPlayer = 'player1';
                turnToPlay = playerOneSymbol
                playGame()
                break ;
    
            case (cpuPlays.optimalPlays  !== '') : 
                console.log('play to wun')
                break;
    
            case (currentPlayer == 'player2' && cpuPlays.urgentPlay == ''): 
                const play = freeCells[Math.floor(Math.random() * freeCells.length)];
                handleCells('id', play, 'innerHTML', symbols[playerTwoSymbol] );
    
                filledCells.player2.push(play);
                currentPlayer = 'player1';
                turnToPlay = playerOneSymbol;
                playGame()
                break;
    
            default: 
                console.log('def')
        }
    }



//               helper functions                                             //
    function updFreeCells (){
        let s = [...filledCells.player1, ...filledCells.player2]
        freeCells = allPlays.split('').filter(it =>  !s.find(its => its == it) ).join('')

        console.log(freeCells)
    }  //
 
    function getPlays (){
        let p1 = []
        let p2 = []
        let crossPlays = []

        winCon.map(con => {
            let obj = {weight: 0, con: 0}
            let obj2 = {weight: 0, con: 0}

            filledCells.player1.map(str => {
                con.includes(str)  &&  (
                    obj.weight = obj.weight + 1,  obj.con = con,          
                    !p1.some(it => it === obj) && ( p1 = [...p1, obj] )
                )
            })
            
            filledCells.player2.map(str => {
                con.includes(str)  &&  (
                    obj2.weight = obj2.weight + 1,  obj2.con = con,  
                    !p2.some(it => it == obj2)  &&  ( p2 = [...p2, obj2] )      
                ) 
            })

        })  //

        p1.map(it => {
            playerPlays.possiblePlays = [...playerPlays.possiblePlays, it.con]
        })
        p2.map(it => {
            cpuPlays.possiblePlays = [...cpuPlays.possiblePlays, it.con]
        })

        const filteredPlays = p1.filter(play => p2.some(it => it.con == play.con) )
        .map(play => {
            crossPlays = [...crossPlays, play.con]
        })
        invalidPlays = crossPlays

        p1.map(it => {
            if(it.weight >= 2 && !crossPlays.includes(it.con) ) {
                playerPlays.optimalPlays = it.con,
                cpuPlays.urgentPlay = it.con
            }
            
        })

        p2.map(it => {
            if(it.weight >= 2 && !crossPlays.includes(it.con) ) {
                cpuPlays.optimalPlays = it.con
            }

        })

        updFreeCells()
    }  //

    function getCpuPlayValue(str){
        let r;
        str.split('').map(char => {
            !filledCells.player1.includes(char)  &&  (
                 r = char
            )
        })
        return r

    }  //

    function cpuLevel() {

    }  //

    cpuLevel()

//

}

function playGame() {
    let int;
    int = setInterval(() => {
        if(filledCells.player1.length >= 3 || filledCells.player2.length >= 3){
            startGame(filledCells.player1, filledCells.player2)
        } 

        clearInterval(int)
    }, 800);

}

async function startGame(p1Data, p2Data) {
    let runCount = 0
    let result;

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

    const clFun = (result, winner) => {
        scores.forEach(score => {
            score.id == winner  &&  (
                console.log(Number(score.innerHTML)),
                score.innerHTML = Number(score.innerHTML) + 1
            )
        })

        round.innerHTML = Number(round.innerHTML) + 1

        h2.innerHTML = result;
        resultSec.classList.remove('hidden');
        resultSec.appendChild(h2);

        cells.forEach(cell => {
            cell.classList.add('hidden')
        })

    }

    let playerOne = `Player One ${helpFunc(p1Data)}`
    let playerTwo = `Player two ${helpFunc(p2Data)}`

    if(playerOne.includes('lost') && playerTwo.includes('lost') && playCount === 9 ) {
        let int;
        result = 'Draw',
        clFun(result)
        
        int = setInterval(() => {
            
            cells.forEach(cell => {
                cell.innerHTML = '',
                resultSec.classList.add('hidden')
                cell.classList.remove('hidden')
                filledCells.player1 = []
                filledCells.player2 = []
                playCount = 0

                clearInterval(int)
            })
        }, 1200);
        
    } else if (playerOne.includes('won')) {
        result = 'Player One Wins',
        clFun(result, 'player1Score')
    }  else if (playerTwo.includes('won') ) {
        result = 'Player Two Wins',
        clFun(result, 'player2Score')
    }

    console.log(playCount)
    console.log(playerOne, playerTwo)
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

        if(content == '') {
            playCount = playCount + 1;
            if(checkCell() === null) {turnToPlay = playerOneSymbol; currentPlayer = 'player1'}
            cell.innerHTML = symbols[turnToPlay],
            filledCells[currentPlayer].push(id)

            turnToPlay == 0 ? turnToPlay = 1 : turnToPlay = 0 ;
            currentPlayer == 'player1' ? currentPlayer = 'player2' : currentPlayer = 'player1';

        } else {
            console.log('filled cell')
        }
        playGame()

        cFilledCells = [...filledCells.player1, ...filledCells.player2]
        cpuPlayer()


        console.log('fill', filledCells)
    })
})

