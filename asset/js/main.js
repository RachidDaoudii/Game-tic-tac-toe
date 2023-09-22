var size = 20;
var totalCells = size * size;
var game = document.getElementById("game");
var firstAction = "X";
let Actions = Array(totalCells).fill("");
var player = document.querySelectorAll(".player")
var getScorePlayer1 = document.getElementById('scorePlayer1')
var getScorePlayer2 = document.getElementById('scorePlayer2')
var StartGame = document.getElementById('StartGame')
var namePlayer1 = document.getElementById("namePlayer1");
var namePlayer2 = document.getElementById("namePlayer2");
var Score = document.getElementById('Score');

var listScore = localStorage.getItem("scoreGame")

var ListAray = JSON.parse(listScore);



if(localStorage.getItem('scoreGame') == null){
    localStorage.setItem("scoreGame", JSON.stringify([]));
}

createGame()
getAllScore()

function getAllScore(){
    ListAray.sort((a,b)=> b.score - a.score)
    document.getElementById("ul").innerHTML = ""
    for (let i = 0; i < ListAray.length; i++) {
        let li = document.createElement("li");
        li.classList.add("text-justify")
        li.innerText = ListAray[i].namePlayer +" " +ListAray[i].score
        document.getElementById("ul").append(li);
    }
}



function createGame() {
    game.innerHTML = "";
    for (let i = 0; i < totalCells; i++) {
        let cell = document.createElement("div");
        cell.classList.add("border", "border-gray-300", "w-6","h-6" ,"text-xs", "flex", "items-center", "justify-center", "cursor-pointer","action");
        cell.id = i;
        cell.addEventListener("click", function() {
            if (cell.innerText == "") {
                Actions[i] = firstAction;
                cell.innerText = firstAction;
                firstAction = firstAction == "X" ? "O" : "X";

                if (cell.innerText === "X" ) {
                    cell.classList.add("text-sky-700")
                }else{
                    cell.classList.add("text-red-700")
                }
                
                checkWinner()
                computer(cell)
            }
        });
        game.appendChild(cell);        
    }
    
}

function checkWinner() {
    let winner = "";
    let scoreX = 0;
    let scoreO = 0;
    for (let j = 0; j < totalCells; j+=20) {
        for (let i = 0; i < 16; i++) {
            if (Actions[i+j] != "") {
                if (Actions[i+j] === Actions[(i+j)+ 1] && Actions[(i+j)] === Actions[(i+j) + 2] && Actions[(i+j)] === Actions[(i+j) + 3] && Actions[(i+j)] === Actions[(i+j) + 4] ) {
                    winner = Actions[i+j];
                    if(winner == "X"){
                        scoreX+=1;
                        getScorePlayer1.innerText = scoreX
                    }else{
                        scoreO+=1;
                        getScorePlayer2.innerText = scoreO
                    }
                    break;
                }
            }
        }
    } 

    for (let j = 0; j < 16; j++) {
        for (let i = 0; i < totalCells; i+=20) {
            if (Actions[i+j] != "") {
                if (Actions[i+j] === Actions[(i+j)+ 20] && Actions[(i+j)] === Actions[(i+j) + 40] && Actions[(i+j)] === Actions[(i+j) + 60] && Actions[(i+j)] === Actions[(i+j) + 80] ) {
                    winner = Actions[i+j];
                    if(winner == "X"){
                        scoreX+=1;
                        getScorePlayer1.innerText = scoreX
                    }else{
                        scoreO+=1;
                        getScorePlayer2.innerText = scoreO
                    }
                    break;
                }
            }
        }
    }
    
    for (let j = 0; j < totalCells; j+=20) {
        for (let i = 0; i < 16; i++) {
            if (Actions[i+j] != "") {
                if (Actions[i+j] === Actions[(i+j)+ 21] && Actions[(i+j)] === Actions[(i+j) + 42] && Actions[(i+j)] === Actions[(i+j) + 63] && Actions[(i+j)] === Actions[(i+j) + 84] ) {
                    winner = Actions[i+j];
                    if(winner == "X"){
                        scoreX+=1;
                        getScorePlayer1.innerText = scoreX
                    }else{
                        scoreO+=1;
                        getScorePlayer2.innerText = scoreO
                    }
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
                    if(winner == "X"){
                        scoreX+=1;
                        getScorePlayer1.innerText = scoreX
                    }else{
                        scoreO+=1;
                        getScorePlayer2.innerText = scoreO
                    }
                    break;
                }
            }
        }
    }

    if (winner != "") {

        if (scoreX || scoreO != 0){

            playerWinner1 = {
                "namePlayer" : namePlayer1.value,
                "score": scoreX
            }
        
            playerWinner2 = {
                "namePlayer" : namePlayer2.value,
                "score": scoreO
            }

            ListAray.forEach((element,index) => {

                if (playerWinner1.namePlayer == element.namePlayer &&  winner == "X") {
                    ListAray[index].score = ListAray[index].score + 1
                }
                if (playerWinner2.namePlayer == element.namePlayer &&  winner == "O") { 
                    ListAray[index].score = ListAray[index].score + 1
                }
                
            });

            if (!ListAray.some(element => element.namePlayer === playerWinner1.namePlayer)) {
                ListAray.push(playerWinner1);
            }
            if (!ListAray.some(element => element.namePlayer === playerWinner2.namePlayer)) {
                ListAray.push(playerWinner2);
            }

            localStorage.setItem("scoreGame", JSON.stringify(ListAray));        
            
        }

        if (winner == "X") {
            winner = namePlayer1.value
        }else{
            winner = namePlayer2.value
        }
        
        setTimeout(function() {
            Swal.fire({
                title: 'Congratulations!',
                html: 'Player <i class="fas fa-trophy"></i> '+ winner +' <i class="fas fa-trophy"></i> has won the Tic Tac Toe game!',
                buttons: ["OK"],
                confirmButtonText: 'Play again',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              }).then(() => {
                restGame()
                getAllScore()
              })
                
        }, 500);


    }
}

function computer(cell){
    console.log(Actions);
    for (let j = 0; j < totalCells; j+=20) {
        for (let i = 0; i < 16; i++) {
            if (Actions[i+j] == "X") {
                // document.getElementById(parseInt(cell.getAttribute("id"))+1).innerText = firstAction
            }
        }
    } 
}

StartGame.addEventListener("click", function (){
    let boardGame = document.querySelector('.boardGame')
    let boardUser = document.querySelector('.boardUser')

    if(namePlayer1.value && namePlayer2.value != ""){

        boardUser.classList.add("hidden")
        boardGame.classList.add("block")
        
        var Players = {
            "namePlayer1" : namePlayer1.value,
            "namePlayer2" : namePlayer2.value
        };

        localStorage.setItem("Players", JSON.stringify(Players));

        if(localStorage.getItem('Players') != null){
            let getPlayers = localStorage.getItem("Players")
            getPlayers = JSON.parse(getPlayers)
            document.querySelector('.players__item__name1').innerText = getPlayers.namePlayer1
            document.querySelector('.players__item__name2').innerText = getPlayers.namePlayer2
        }
    }
})

function restGame(){
    Actions = Array(totalCells).fill("");
    firstAction = "X";
    for (let i = 0; i < totalCells; i++) {
        document.getElementById(i).innerText = "";
    }
}

