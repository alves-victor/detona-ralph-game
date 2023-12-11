const state = {
    view : {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector(".time-left"),
        scorePoints: document.querySelector(".score-points"),
        lifePoints: document.querySelector(".life-points"),
        modalMessage: document.querySelector(".modal-result"),
        modalScore: document.querySelector(".modal-score"),
        modalVisibility: document.querySelector(".modal")
    },
    values: {
        tick: 1000,
        hitPosition: 0,
        score: 0,
        clicked: false,
        lives: 3,
        timer: 60
    },
    intervals: {
        moveEnemyId: null,
        timerId: null,
    }
}

function randomNum(){
    let randomNum = Math.floor(Math.random() * 9);
    return randomNum;
}

function addEnemyToRandomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomSquare = state.view.squares[randomNum()];

    if(state.values.hitPosition === randomSquare.id){
        return addEnemyToRandomSquare();
    }

    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
    registerClickedState(false);
}

function playSound(soundName){
    let audio = new Audio(`./src/sounds/${soundName}.m4a`);
    audio.volume = 0.01;
    audio.play();
}

function addHitListenerOnSquares(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition && state.values.clicked === false){
                hit();
            }else if(square.id != state.values.hitPosition){
                miss();
            }
        })
    })
}

function registerClickedState(clicked){
    state.values.clicked = clicked;
}

function moveEnemy(){
    state.intervals.moveEnemyId = setInterval(addEnemyToRandomSquare, state.values.tick);
}

function timer(){
    state.intervals.timerId = setInterval(() => {
        if(state.values.timer <= 1){
            gameOver("win");
        }
        state.values.timer--;
        state.view.timeLeft.innerHTML = state.values.timer
    }, state.values.tick)
}

function hit(){
    playSound("hit");
    registerClickedState(true);
    state.values.score++;
    state.view.scorePoints.innerHTML = state.values.score;
}

function miss(){
    playSound("miss");
    state.values.lives--;
    state.view.lifePoints.innerHTML = state.values.lives;
    if(state.values.lives <= 0){
        gameOver("lose");
    }
}

function gameOver(condition){
    if(condition === "win"){
        state.view.modalMessage.innerHTML = "You Won";
        state.view.modalScore.innerHTML = ("Your Score Was: " + state.values.score);
        clearIntervals()
        state.view.modalVisibility.classList.add("visible");
    }else if(condition === "lose"){
        state.view.modalMessage.innerHTML = "You Lost";
        state.view.modalScore.innerHTML = ("Your Score Was: " + state.values.score);
        clearIntervals()
        state.view.modalVisibility.classList.add("visible");
    }
}

function clearIntervals(){
    clearInterval(state.intervals.moveEnemyId);
    clearInterval(state.intervals.timerId);
}

function reset(){
    state.values.clicked = false;
    state.values.hitPosition = 0;
    state.values.lives = 3;
    state.values.score = 0;
    state.values.tick = 1000;
    state.values.timer = 60;
    state.view.timeLeft.innerHTML = state.values.timer;
    state.view.scorePoints.innerHTML = state.values.score;
    state.view.lifePoints.innerHTML = state.values.lives;
    clearIntervals()
    state.view.modalVisibility.classList.remove("visible");
    init();
}

function init(){
    state.view.timeLeft.innerHTML = state.values.timer;
    state.view.scorePoints.innerHTML = state.values.score;
    state.view.lifePoints.innerHTML = state.values.lives;
    addEnemyToRandomSquare();
    moveEnemy();
    timer();
}

addHitListenerOnSquares();
init();