var size = 20;
var totalCells = size * size;
var game = document.getElementById("game");
var restGame = document.getElementById("restGame");
var firstAction = "X";
let Actions = Array(totalCells).fill("");
var player = document.querySelectorAll(".player")
var getScore = document.querySelector(".scorePlayer1")
createGame()

function createGame() {
    game.innerHTML = "";
    // player.item(0).classList.add("border-2","border-gray-500" , "rounded" , "w-20" , "text-center")
    for (let i = 0; i < totalCells; i++) {
        let cell = document.createElement("div");
        cell.classList.add("border", "border-gray-300", "h-6" ,"text-xs", "flex", "items-center", "justify-center", "cursor-pointer","action");
        cell.id = i;
        cell.addEventListener("click", function() {
            if (cell.innerHTML == "") {
                Actions[i] = firstAction;
                cell.innerHTML = firstAction;
                firstAction = firstAction == "X" ? "O" : "X";
                checkWinner()
            }
        });
        game.appendChild(cell);
    }
}

restGame.addEventListener('click',function(){
    Actions = Array(totalCells).fill("");
    firstAction = "X";
    for (let i = 0; i < totalCells; i++) {
        document.getElementById(i).innerHTML = "";
    }
})


function checkWinner() {
    let winner = "";
    let score = 0;
    for (let j = 0; j < totalCells; j+=20) {
        for (let i = 0; i < 16; i++) {
            if (Actions[i+j] != "") {
                if (Actions[i+j] === Actions[(i+j)+ 1] && Actions[(i+j)] === Actions[(i+j) + 2] && Actions[(i+j)] === Actions[(i+j) + 3] && Actions[(i+j)] === Actions[(i+j) + 4] ) {
                    winner = Actions[i+j];
                    console.log("winner is : " + winner);
                    score+=1;
                    console.log(score);
                    getScore.innerText = score
                    break;
                }
            }
        }
    } 

    for (let j = 0; j < 20; j++) {
        for (let i = 0; i < totalCells; i+=20) {
            if (Actions[i+j] != "") {
                if (Actions[i+j] === Actions[(i+j)+ 20] && Actions[(i+j)] === Actions[(i+j) + 40] && Actions[(i+j)] === Actions[(i+j) + 60] && Actions[(i+j)] === Actions[(i+j) + 80] ) {
                    winner = Actions[i+j];
                    console.log("winner is : " + winner);
                    score+=1;
                    getScore.innerText = score

                    break;
                }
            }
        }
    }
    
    for (let j = 0; j < totalCells; j+=20) {
        for (let i = 0; i < 20; i++) {
            if (Actions[i+j] != "") {
                if (Actions[i+j] === Actions[(i+j)+ 21] && Actions[(i+j)] === Actions[(i+j) + 42] && Actions[(i+j)] === Actions[(i+j) + 63] && Actions[(i+j)] === Actions[(i+j) + 84] ) {
                    winner = Actions[i+j];
                    console.log("winner is : " + winner);
                    score+=1;
                    getScore.innerText = score

                    break;
                }
            }
        }
    }

    for (let j = 0; j < totalCells; j+=20) {
        for (let i = 0; i < 20; i++) {
            if (Actions[i+j] != "") {
                    if (Actions[i+j] === Actions[(i+j) -19] && Actions[(i+j)] === Actions[(i+j) - 38] && Actions[(i+j)] === Actions[(i+j) - 57] && Actions[(i+j)] === Actions[(i+j) - 76]) {
                    winner = Actions[i+j];
                    console.log("winner is : " + winner);
                    score+=1;
                    getScore.innerText = score

                    break;
                }
            }
        }
    }
}


