// Definir celdas del field
const width = 10;
const height = 10;
const area = width * height;
const field = document.querySelector('.field');
const units = [];
for (let index = 0; index < area; index++) {
  const cell = document.createElement('div');
  cell.innerText = index;
  cell.classList.add('cell');
  field.appendChild(cell);
  units.push(cell);
}
//Posiciones iniciales de los elementos.
let paddlePosition01 = 4;
let paddlePosition02 = 95;
let ballPosition = 55;
//Agrego los elementos a la pantalla.
const addPlayer01 = (index) => units[index].classList.add('paddle01');
const removePlayer01 = (index) => units[index].classList.remove('paddle01');
const addPlayer02 = (index) => units[index].classList.add('paddle02');
const removePlayer02 = (index) => units[index].classList.remove('paddle02');
//Funciones para la bola
const addBall = (index) => units[index].classList.add('ball');
const removeBall = (index) => units[index].classList.remove('ball');

//Funciones de score:
let scorePlayer01 = 0;
let scorePlayer02 = 0;
let winner01 = '';
let winner02 = '';
let matchResult = false;
//Player 01:
const divScore = document.querySelector('.score');
const divPlayers = document.querySelector('.players');
const counter01 = document.querySelector('.counter01');
const counter02 = document.querySelector('.counter02');

const addScorePlayer01 = () => {
  counter01.innerText = `${scorePlayer01}`;
}
//Player 02:
const addScorePlayer02 = () => {
  counter02.innerText = `${scorePlayer02}`;
};
//Mostrar el ganador en pantalla:
//Winner 01:
const addWinner01 = () => {
  const winner01 = document.createElement('p');
  winner01.innerText = `WINNER!`;
  winner01.classList.add('winner01');
  divPlayers.appendChild(winner01);
}

//Winner 02:
const addWinner02 = () => {
  const winner02 = document.createElement('p');
  winner02.innerText = `WINNER!`;
  winner02.classList.add('winner02');
  divPlayers.appendChild(winner02);
}
 //Funcion de resultado del juego:
function showWinner() {
  if (scorePlayer01 === 11) { 
    addWinner01();
    matchresult = true;
  } else if (scorePlayer02 === 11) {
    addWinner02();
    matchresult = true;
  }
}

 //Funciones de reset:
function nextPoint() {
  ballPosition = 55;
  removePlayer01(paddlePosition01);
  removePlayer02(paddlePosition02);
  paddlePosition01 = 4;
  paddlePosition02 = 95;
  addPlayer01(paddlePosition01);
  addPlayer02(paddlePosition02);
  ballDirection = 'forwards';
  directionValue = 10;
  ballAngle = 0;
  addScorePlayer01(scorePlayer01);
  addScorePlayer02(scorePlayer02);
  showWinner();
  }
function resetGame() {
  ballPosition = 55;
  removePlayer01(paddlePosition01);
  removePlayer02(paddlePosition02);
  paddlePosition01 = 4;
  paddlePosition02 = 94;
  addPlayer01(paddlePosition01);
  addPlayer02(paddlePosition02);
  ballDirection = 'forwards';
  directionValue = 10;
  ballAngle = 0;
  scorePlayer01 = 0;
  scorePlayer02 = 0;
  winner01 = '';
  winner02 = '';
  matchresult = false;
}
//Funcion mover bola
let ballDirection = 'forwards';
let directionValue = 10;
let x = ballPosition % width;
//Mueve la bola adelante
function ballForwards() {
  if ((ballPosition > 0 || ballPosition < 90) && ballDirection === 'forwards') {
    removeBall(ballPosition);
    ballPosition = ballPosition + directionValue;
    addBall(ballPosition);
  }
}
//Mueve la bola hacia atras
function ballBackwards() {
  if (
    (ballPosition > 10 || ballPosition < 90) &&
    ballDirection === 'backwards'
  ) {
    removeBall(ballPosition);
    ballPosition = ballPosition - directionValue;
    addBall(ballPosition);
  }
}
function wallLeft() {
  x = console.log(x);
  x = ballPosition % width;
  if (x === 0) {
    if (ballDirection === 'forwards') {
      console.log('reached wall left');
      //directionValue = 11;
      ballAngle = 2;
    } else if (ballDirection === 'backwards') {
      console.log('reached wall left');
      //directionValue = 9;
      ballAngle = 2;
    }
  }
}
function wallRight() {
  x = ballPosition % width;
  if (!(x < width - 1)) {
    if (ballDirection === 'forwards') {
      console.log('reached wall right within function');
      ballAngle = 1;
      //directionValue = 9;
    } else if (ballDirection === 'backwards') {
      ballAngle = 1;
      console.log('reached wall right');
      //directionValue = 11;
    }
  }
}
const ballAngleOptions = [0, 1, 2];
let ballAngle = 0;
function movingBall() {
  //Creamos un switch con los casos de cambio de dirección de la bola:
  x = ballPosition % width;
  switch (ballAngle) {
    case 0:
      if (ballDirection === 'forwards') {
        directionValue = 10;
        ballForwards();
        if (x === 0) {
          console.log('reached wall left');
          wallLeft();
        } else if (!(x < width - 1)) {
          console.log('reached wall right');
          wallRight();
        }
      }
      if (ballDirection === 'backwards') {
        directionValue = 10;
        ballBackwards();
        if (x === 0) {
          wallLeft();
        } else if (!(x < width - 1)) {
          wallRight();
        }
      }
      if (ballPosition === paddlePosition02) {
        ballAngle = Math.floor(Math.random(ballAngleOptions) * 3);
        ballDirection = 'backwards';
        ballBackwards();
      }
      if (ballPosition === paddlePosition01) {
        ballAngle = Math.floor(Math.random(ballAngleOptions) * 3);
        ballDirection = 'forwards';
        ballForwards();
      }
      if (ballPosition >= 90) {
        removeBall(ballPosition);
        scorePlayer01 = scorePlayer01 + 1;
        nextPoint();
        clearInterval(countTimer);
      }
      if (ballPosition <= 10) {
        removeBall(ballPosition);
        scorePlayer02 = scorePlayer02 + 1;
        nextPoint();
        clearInterval(countTimer);
      }
      break;
    case 1:
      if (ballDirection === 'forwards') {
        directionValue = 9;
        ballForwards();
        x = ballPosition % width;
        if (x === 0) {
          console.log('reached wall left');
          wallLeft();
        } else if (!(x < width - 1)) {
          console.log('reached wall right');
          wallRight();
        }
      }
      if (ballDirection === 'backwards') {
        directionValue = 11;
        ballBackwards();
        x = ballPosition % width;
        if (x === 0) {
          wallLeft();
        } else if (!(x < width - 1)) {
          wallRight();
        }
      }
      if (ballPosition === paddlePosition02) {
        ballAngle = Math.floor(Math.random(ballAngleOptions) * 3);
        ballDirection = 'backwards';
        ballBackwards();
      }
      if (ballPosition === paddlePosition01) {
        ballAngle = Math.floor(Math.random(ballAngleOptions) * 3);
        ballDirection = 'forwards';
        ballForwards();
      }
      if (ballPosition >= 90) {
        removeBall(ballPosition);
        scorePlayer01 = scorePlayer01 + 1;
        nextPoint();
        clearInterval(countTimer);
      }
      if (ballPosition <= 10) {
        removeBall(ballPosition);
        scorePlayer02 = scorePlayer02 + 1;
        nextPoint();
        clearInterval(countTimer);
      }
      break;
    case 2:
      if (ballDirection === 'forwards') {
        directionValue = 11;
        ballForwards();
        x = ballPosition % width;
        if (x === 0) {
          console.log('reached wall left');
          wallLeft();
        } else if (!(x < width - 1)) {
          console.log('reached wall right');
          wallRight();
        }
      }
      if (ballDirection === 'backwards') {
        directionValue = 9;
        ballBackwards();
        x = ballPosition % width;
        if (x === 0) {
          wallLeft();
        } else if (!(x < width - 1)) {
          wallRight();
        }
      }
      if (ballPosition === paddlePosition02) {
        ballAngle = Math.floor(Math.random(ballAngleOptions) * 3);
        ballDirection = 'backwards';
        ballBackwards();
      }
      if (ballPosition === paddlePosition01) {
        ballAngle = Math.floor(Math.random(ballAngleOptions) * 3);
        ballDirection = 'forwards';
        ballForwards();
      }
      if (ballPosition >= 90) {
        removeBall(ballPosition);
        scorePlayer01 = scorePlayer01 + 1;
        nextPoint();
        clearInterval(countTimer);
      }
      if (ballPosition <= 10) {
        removeBall(ballPosition);
        scorePlayer02 = scorePlayer02 + 1;
        nextPoint();
        clearInterval(countTimer);
      }
      break;
    default:
      break;
  }
}
//Funciones de tiempo:
let countTimer;
function timer() {
  addBall(ballPosition);
  countTimer = setInterval(movingBall, 250);
}
//Agrego los paddles a la pantalla:
addPlayer01(paddlePosition01);
addPlayer02(paddlePosition02);
//Funciones de control de paddles:
const handleKeyPress = (event) => {
  const { key } = event;
  console.log(event);
  const xPaddle01 = paddlePosition01 % 10;
  const xPaddle02 = paddlePosition02 % 10;
  removePlayer01(paddlePosition01);
  removePlayer02(paddlePosition02);
  switch (key) {
    case 'a':
      if (xPaddle01 > 0) {
        paddlePosition01 = paddlePosition01 - 1;
        addPlayer01(paddlePosition01);
      } else {
        paddlePosition01 = paddlePosition01;
      }
      break;
    case 's':
      if (xPaddle01 < width - 1) {
        paddlePosition01 = paddlePosition01 + 1;
        addPlayer01(paddlePosition01);
      } else {
        paddlePosition01 = paddlePosition01;
      }
      break;
    case 'ArrowLeft':
      if (xPaddle02 > 0) {
        paddlePosition02 = paddlePosition02 - 1;
        addPlayer02(paddlePosition02);
      } else {
        paddlePosition02 = paddlePosition02;
      }
      break;
    case 'ArrowRight':
      if (xPaddle02 < width - 1) {
        paddlePosition02 = paddlePosition02 + 1;
        addPlayer02(paddlePosition02);
      } else {
        paddlePosition02 = paddlePosition02;
      }
      break;
    default:
      console.log('You have pressed the wrong key');
      break;
  }
  addPlayer01(paddlePosition01);
  addPlayer02(paddlePosition02);
};
window.addEventListener('keydown', handleKeyPress);
window.addEventListener('dblclick', timer);
