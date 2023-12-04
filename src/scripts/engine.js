const state = {
    view : {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector(".time-left"),
        scorePoints: document.querySelector(".score-points"),
        lifePoints: document.querySelector(".life-points")
    },
    values: {
        tick: 1000,
        hitPosition: 0,
        score: 0,
        clicked: false,
        lives: 3,
        timer: 10
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

function addHitListenerOnSquares(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition && state.values.clicked === false){
                registerClickedState(true);
                state.values.score++;
                state.view.scorePoints.innerHTML = state.values.score;
            }else if(square.id != state.values.hitPosition){
                missClickDamage();
            }
        })
    })
}

function registerClickedState(clicked){
    state.values.clicked = clicked;
}

function moveEnemy(){
    setInterval(addEnemyToRandomSquare, state.values.tick);
}

function timer(){
    setInterval(() => {
        if(state.values.timer <= 1){
            gameOver("win");
        }
        state.values.timer--;
        state.view.timeLeft.innerHTML = state.values.timer
    }, state.values.tick)
}

function missClickDamage(){
    state.values.lives--;
    state.view.lifePoints.innerHTML = state.values.lives;
    if(state.values.lives <= 0){
        gameOver("lose");
    }
}

function gameOver(condition){
    if(condition === "win"){
        alert("Parabéns! Você chegou ao final sem perder todas as vidas. Sua pontuação foi: " + state.values.score);
    }else if(condition === "lose"){
        alert("Você perdeu todas as suas vidas! Sua pontuação foi: " + state.values.score);
    }
    reset();
}

function reset(){
    state.values.clicked = false;
    state.values.hitPosition = 0;
    state.values.lives = 3;
    state.values.score = 0;
    state.values.tick = 1000;
    state.values.timer = 10;
    state.view.timeLeft.innerHTML = state.values.timer;
    state.view.scorePoints.innerHTML = state.values.score;
    state.view.lifePoints.innerHTML = state.values.lives;
}

function init(){
    state.view.timeLeft.innerHTML = state.values.timer;
    state.view.scorePoints.innerHTML = state.values.score;
    state.view.lifePoints.innerHTML = state.values.lives;
    moveEnemy();
    addHitListenerOnSquares();
    timer();
}

init();