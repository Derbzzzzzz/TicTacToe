
congrats = document.querySelector(".congrats")
blur = document.querySelector(".blur")
victory = document.querySelector(".victory")

const GameBoard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""]
    
    const reset = () => {
        gameBoard.forEach((element, index) => {
            gameBoard[index] = ''
        });
    }

    const changeBoard = (player, index) => {
        gameBoard[index] = player.symbol
        document.querySelector(`[data-index="${index}"`).textContent = player.symbol
    }

    const checkForWinner = (player) => {

        //Check for Row winner
        for (let i = 0; i < 9; i += 3){
            if((gameBoard[i] == gameBoard[i+1]) && (gameBoard[i + 2] == player.symbol) && (gameBoard[i] == player.symbol)){
                displayWinner(player)
                return
            }
        }

        //Check for Column Winner
        for (let i = 0; i < 3; i++) {
            if((gameBoard[i] == gameBoard[i+3]) && (gameBoard[i + 6] == player.symbol) && (gameBoard[i] == player.symbol)){
                displayWinner(player)
                return
            }
        }

        //Check for Diagonal Winner
        if((gameBoard[0] == gameBoard[4]) && (gameBoard[8] == player.symbol) && (gameBoard[0] == player.symbol)){
            displayWinner(player)
            return
        }
        if((gameBoard[2] == gameBoard[4]) && (gameBoard[6] == player.symbol) && (gameBoard[2] == player.symbol)){
            displayWinner(player)
            return
        }

        checkForTie(player);

    }

    const checkForTie = (player) => {
        let tie = true
        gameBoard.forEach(element => {
            if(element == ""){
                tie = false
            }
        });
        if(tie == true){
            displayTrue();
        }
    }

    const displayWinner = (player) => {
        congrats.textContent = `Congratulations ${player.name}!`
        victory.textContent = "You are victorious!"
        blur.style.display = "flex"
    }

    const displayTrue = () => {
        congrats.textContent = "Nobody won"
        victory.textContent = "It was a draw"
        blur.style.display = "flex"
    }


    return{gameBoard, reset, changeBoard, checkForWinner, checkForTie}

})();

const personFactory = (name, symbol) => {
    return {name, symbol}
}

let player1 = personFactory("Player 1", 'X')
let player2 = personFactory("Player 2", 'O')

const gameFlow = (() => {
    let currentPlayer = player1

    const changeCurrentPlayer = () => {
        console.log(currentPlayer)
        if(gameFlow.currentPlayer == player1){
            gameFlow.currentPlayer = player2
        } else{
            gameFlow.currentPlayer = player1
        }
    }

    return{currentPlayer, changeCurrentPlayer}

})();

cells = document.querySelectorAll(".cell")

cells.forEach(cell => {
    cell.addEventListener('click', function(){
        if(cell.textContent == ''){
            console.log(gameFlow.currentPlayer)
            cell.textContent = gameFlow.currentPlayer.symbol
            GameBoard.changeBoard(gameFlow.currentPlayer, cell.dataset.index)
            GameBoard.checkForWinner(gameFlow.currentPlayer)
            gameFlow.changeCurrentPlayer()
            
        }
    } )
});

const form = document.querySelector('#form')
name1 = document.querySelector("#name1")
name2 = document.querySelector("#name2")

form.addEventListener('submit', function(){
    GameBoard.reset()
    player1.name = name1.value
    player2.name = name2.value
    blur.style.display = "none"
    cells.forEach(cell => {
        cell.textContent = "";
    })
    gameFlow.currentPlayer = player1
})