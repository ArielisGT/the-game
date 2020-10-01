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
let paddlePosition02 = 94;
let ballPosition = 55;
let scorePlayer01 = 0;
let scorePlayer02 = 0;
//Agrego los elementos a la pantalla.
const addPlayer01 = (index) => units[index].classList.add('paddle01');
const removePlayer01 = (index) => units[index].classList.remove('paddle01');
const addPlayer02 = (index) => units[index].classList.add('paddle02');
const removePlayer02 = (index) => units[index].classList.remove('paddle02');

//Funciones para la bola
const addBall = (index) => units[index].classList.add('ball');
const removeBall = (index) => units[index].classList.remove('ball');

//Funcion mover bola

let ballDirection = 'forwards';
let directionValue = 10;
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
// Para saber que la bola esta tocando el borde izquierdo tenemos que:
// Calcular el valor de X en el eje cartesiano
// const x = ballPosition % width;
// Para saber que esta en el borde izquierdo
// x === 0

// Para saber que la bola esta tocando el borde derecho tenemos que:

// !(x < width -1)

//Dirección de la bola
//array de opciones de angulo de bola.
const x = ballPosition % width;

function wallLeft() {
  if (x === 0) {
    if (ballDirection === 'forwards') {
      directionValue = 11;
      ballForwards();
    } else if (ballDirection === 'backwards') {
      directionValue = 11;
      ballBackwards();
    }
  }
}
function wallRight() {
  if (!(x < width - 1)) {
    if (ballDirection === 'forwards') {
      directionValue = 1;
      ballForwards();
    } else if (ballDirection === 'backwards') {
      directionValue = 1;
      ballBackwards();
    }
 }
}

function movingBall() {
  const ballAngleOptions = [0, 1, 2];
  let ballAngle = 0; 


  wallLeft();
  wallRight();
  console.log(ballAngle);
  console.log(directionValue);


  switch (ballAngle) {
    case 0:
      /*       if (x === 0) {
        wallLeft();
      } else if (!(x < width - 1)) {
        wallRight();
      } else { */
      if (ballDirection === 'forwards') {
        directionValue = 10;
        ballForwards();
        if (ballPosition === paddlePosition02) {
          ballAngle = Math.floor(Math.random(ballAngleOptions) * 3);
          ballDirection = 'backwards';
          // debugger;
          ballBackwards();
        }
        if (ballPosition >= 90) {
          removeBall(ballPosition);
          scorePlayer01++;
          clearInterval(countTimer);
        }
      }
      if (ballDirection === 'backwards') {
        directionValue = 10;
        ballBackwards();
        if (ballPosition === paddlePosition01) {
          ballAngle = Math.floor(Math.random(ballAngleOptions) * 3);
          ballDirection = 'forwards';
          ballForwards();
        }
        if (ballPosition <= 10) {
          removeBall(ballPosition);
          scorePlayer02++;
          clearInterval(countTimer);
        }
      }
      // }
      break;
    case 1:
      directionValue = 9;
      if (ballDirection === 'forwards') {
        ballForwards();
        if (ballPosition === paddlePosition02) {
          ballBackwards();
        }
        if (ballPosition >= 90) {
          removeBall(ballPosition);
          scorePlayer01++;
          clearInterval(countTimer);
        }
      }
      if (ballDirection === 'backwards') {
        ballBackwards();
        if (ballPosition === paddlePosition01) {
          ballForwards();
        }
        if (ballPosition <= 10) {
          removeBall(ballPosition);
          scorePlayer02++;
          clearInterval(countTimer);
        }
      }
      break;
    case 2:
      directionValue = 11;
      if (ballDirection === 'forwards') {
        ballForwards();
        if (ballPosition === paddlePosition02) {
          ballBackwards();
        }
        if (ballPosition >= 90) {
          removeBall(ballPosition);
          scorePlayer01++;
          clearInterval(countTimer);
        }
      }
      if (ballDirection === 'backwards') {
        ballBackwards();
        if (ballPosition === paddlePosition01) {
          ballForwards();
        }
        if (ballPosition <= 10) {
          removeBall(ballPosition);
          scorePlayer02++;
          clearInterval(countTimer);
        }
      }
      break;
    default:
      break;
  }
}
let countTimer;
function timer() {
  addBall(ballPosition);
  countTimer = setInterval(movingBall, 500);
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

// Para saber que la bola esta tocando el borde izquierdo tenemos que:
// Calcular el valor de X en el eje cartesiano
// const x = ballPosition % width;
// Para saber que esta en el borde izquierdo
// x === 0

// Para saber que la bola esta tocando el borde derecho tenemos que:

// !(x < width -1)
