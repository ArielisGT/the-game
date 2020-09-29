//Nueva lógica
//Crear objetos paddles y pelota
/* const paddle01 = {
  this.width: 40px,
  this.height: 10px,
  x: 200px,
  y: 50px,
  speed: 1,
}
const paddle02 = {
  this.width: 40px,
  this.height: 10px,
  x: 200px,
  y: 50px,
  speed: 1,
};
const ball = {
  this.width: 10px,
  this.height: 10px,
  x: 200px,
  y: 400px,
  speed: 1,
};
const fieldGame = {
  width: 400 ,
  height: 800,
  } */

//Lógica anterior
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
//- Setear teclas de movimiento de paddles
//Selecciono el paddle del jugador 01
/* const player01 = document.querySelector('.paddle01');
const player02 = document.querySelector('.paddle02');
 */
let paddlePosition01 = 4;
let paddlePosition02 = 95;
let ballPosition = 54;
let scorePlayer01 = 0;
let scorePlayer02 = 0;

const addPlayer01 = (index) => units[index].classList.add('paddle01');
const removePlayer01 = (index) => units[index].classList.remove('paddle01');
const addPlayer02 = (index) => units[index].classList.add('paddle02');
const removePlayer02 = (index) => units[index].classList.remove('paddle02');

//Funciones para la bola
const addBall = (index) => {
  /*   ballPosition = ballPosition + 10;
   */ units[index].classList.add('ball');
};
const removeBall = (index) => units[index].classList.remove('ball');

let countTimer;
let ballDirection = 'forwards';
//array de opciones de angulo de bola.
const ballAngleOptions = ['-x', '0', '+x'];
let ballAngle = '0';

function movingBall() {
  let key = ballAngle;

  switch (key) {
    case '0':
      if (ballDirection === 'forwards') {
        if (ballPosition > 0 || ballPosition < 90) {
          removeBall(ballPosition);
          ballPosition = ballPosition + 10;
          addBall(ballPosition);
        }
        if (ballPosition === paddlePosition02) {
          console.log(ballPosition);
          console.log(paddlePosition02);
          ballDirection = 'backwards';
          removeBall(ballPosition);
          ballPosition = ballPosition - 10;
          addBall(ballPosition);
        }
        if (ballPosition >= 90) {
          removeBall(ballPosition);
          scorePlayer01++;
          clearInterval(countTimer);
        }
      }
      if (ballDirection === 'backwards') {
        if (ballPosition > 10 || ballPosition < 90) {
          removeBall(ballPosition);
          ballPosition = ballPosition - 10;
          addBall(ballPosition);
        }
        if (ballPosition === paddlePosition01) {
          console.log(ballPosition);
          console.log(paddlePosition01);
          ballDirection = 'forwards';
          removeBall(ballPosition);
          ballPosition = ballPosition + 10;
          addBall(ballPosition);
        }
        if (ballPosition <= 10) {
          removeBall(ballPosition);
          scorePlayer02++;
          clearInterval(countTimer);
        }
      }
      break;
    case '-x':
      if (ballDirection === 'forwards') {
        if (ballPosition > 0 || ballPosition < 90) {
          removeBall(ballPosition);
          ballPosition = ballPosition + 10;
          addBall(ballPosition);
        }
        if (ballPosition === paddlePosition02) {
          console.log(ballPosition);
          console.log(paddlePosition02);
          ballDirection = 'backwards';
          removeBall(ballPosition);
          ballPosition = ballPosition - 10;
          addBall(ballPosition);
        }
        if (ballPosition >= 90) {
          removeBall(ballPosition);
          scorePlayer01++;
          clearInterval(countTimer);
        }
      }
      if (ballDirection === 'backwards') {
        if (ballPosition > 10 || ballPosition < 90) {
          removeBall(ballPosition);
          ballPosition = ballPosition - 10;
          addBall(ballPosition);
        }
        if (ballPosition === paddlePosition01) {
          console.log(ballPosition);
          console.log(paddlePosition01);
          ballDirection = 'forwards';
          removeBall(ballPosition);
          ballPosition = ballPosition + 10;
          addBall(ballPosition);
        }
        if (ballPosition <= 10) {
          removeBall(ballPosition);
          scorePlayer02++;
          clearInterval(countTimer);
        }
      }
      break;
    case '+x':
      break;
    default:
      break;
  }
}
function timer() {
  addBall(ballPosition);
  countTimer = setInterval(movingBall, 300);
}

addPlayer01(paddlePosition01);
addPlayer02(paddlePosition02);

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
