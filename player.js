let Xturn = true;
let Xscore = 0;
let Oscore = 0;
let boxes = document.querySelectorAll(".boxes button");
let newButton = document.querySelector(".newgame-button button");
let msg = document.querySelector(".msg");
let xMsg = document.querySelector("#X-score");
let oMsg = document.querySelector("#O-score");

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
    })
}

const enableButton = () =>{
    boxes.forEach((box) =>{
        box.disabled = false;
        box.innerText = "";
    })
}

newButton.addEventListener("click", () =>{
    Xturn = true;
    enableButton();
    msg.classList.add("hide");
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
    }
}

const checkWin = (ele) =>{
    for(let pos of winCondition){
        let pos1 = boxes[pos[0]].innerText;
        let pos2 = boxes[pos[1]].innerText;
        let pos3 = boxes[pos[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 == pos2 && pos2 == pos3){
                msg.classList.remove("hide");
                msg.innerText = "You Won";
                if(ele.innerText == "X"){
                    Xscore++;
                    xMsg.innerText = `X-${Xscore}`;
                }else{
                    Oscore++;
                    oMsg.innerText = `O-${Oscore}`;
                }
                disableButton();            
            }
        }
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", (evt)=>{
        if(Xturn){
            box.innerText = "X";
            Xturn = false;
        }else{
            box.innerText = "O";
            Xturn = true;
        }
        checkWin(evt.target);
        checkDraw();
        box.disabled = "disabled";
    })  
})