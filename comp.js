let userChoice = "X";
let compChoice = "O";
let gameActive = true;
let userScore = 0;
let compScore = 0;
let boxes = document.querySelectorAll(".boxes button");
let newButton = document.querySelector(".newgame-button button");
let msg = document.querySelector(".msg");
let compMsg = document.querySelector("#comp-score");
let userMsg = document.querySelector("#user-score");
let userOption = document.querySelectorAll(".choice button");
let choiceClass = document.querySelector(".choice");
let container = document.querySelector(".container-player");

let winCondition = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6]
]

const disableButton = () =>{
    boxes.forEach((box) =>{
        box.disabled = "disabled";
        gameActive = false;
    })
}

const enableButton = () =>{
    boxes.forEach((box) =>{
        box.disabled = false;
        box.innerText = "";
    })
}

newButton.addEventListener("click", () =>{
    gameActive = true;
    enableButton();
    msg.classList.add("hide");
    choiceClass.classList.remove("hide");
    container.classList.add("hide");
});

const checkDraw = () =>{
    let draw = true;

    boxes.forEach((box) => {
        if(box.innerText == ""){
            draw = false;
        }
    })

    if(draw){
        msg.classList.remove("hide");
        msg.innerText = "It is a Draw";
        gameActive = false;
    }
}

const checkWin = (ele) =>{
    for(let pos of winCondition){
        let pos1 = boxes[pos[0]].innerText;
        let pos2 = boxes[pos[1]].innerText;
        let pos3 = boxes[pos[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 == pos2 && pos2 == pos3){
                disableButton();            
                gameActive = false;
                return true;
            }
        }
    }
    return false;
}

const compPlay = () =>{
    let idx = Math.floor(Math.random()*9);
    while(boxes[idx].innerText != ""){
        idx = Math.floor(Math.random()*9);
    }

    boxes[idx].innerText = compChoice;
    boxes[idx].disabled = true;

    if(checkWin()){
        compScore++;
        compMsg.innerText = `Comp-${compScore}`;
        msg.classList.remove("hide");
        msg.innerText = "Comp Won";
    }else{
        checkDraw();
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", (evt)=>{
        if(!gameActive) return;

        box.innerText = userChoice;
        box.disabled = true;

        if(checkWin()){
            userScore++;
            userMsg.innerText = `Player-${userScore}`;
            msg.classList.remove("hide");
            msg.innerText = "User Won";
        }else{
            checkDraw();    
            if(gameActive){
                compPlay();
            }
        }
    })  
})

userOption.forEach((btn) =>{
    btn.addEventListener("click", ()=>{
        userChoice = btn.innerText;
        compChoice = (userChoice == "X") ? "O" : "X";
        choiceClass.classList.add("hide");
        container.classList.remove("hide");
    })
})