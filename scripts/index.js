//Nueva lógica
//Crear objetos paddles y pelota
const paddle01 = {
  width: 4,
  height: 1,
  x: 0,
  y: 0,
  speed: 1,
}
const paddle02 = {
  width: 4,
  height: 1,
  x: 0,
  y: 0,
  speed: 1,
};
const ball = {
  width: 1,
  height: 1,
  x: 200,
  y: 200,
  speed: 1,
};



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
const addPlayer01 = (index) => units[index].classList.add('paddle01');
const removePlayer01 = (index) => units[index].classList.remove('paddle01');
const addPlayer02 = (index) => units[index].classList.add('paddle02');
const removePlayer02 = (index) => units[index].classList.remove('paddle02');
const addBall = (index) => units[index].classList.add('ball');
const removeBall = (index) => units[index].classList.remove('ball');
const moveFwBall = (index) => units[index].classList.add('move-fw');
const removeFwBall = (index) => units[index].classList.remove('move-fw');

//Definimos una función para que evalue si se puede seguir moviendo la bola
const blockBall = (position) => {
  if (units.includes(position)) {
    return false;
  } else {
    return true;
  }
};

addBall(ballPosition);
addPlayer01(paddlePosition01);
addPlayer02(paddlePosition02);

/*     case 'ArrowLeft':
      if (x > 0) {
        // calculo nueva posicion
        const newPosition = pacmanPosition - 1;
        // evaluo si me puedo mover a esa posicion
        if (canImove(newPosition)) {
          // si me puedo mover a esa posicion me muevo
          pacmanPosition = newPosition;
        }
      }
      break; */

const spacePress = (event) => {
  const { key } = event;
  const yBall = Math.floor(ballPosition / 10);

  if (yBall > 0) {
    removeBall(ballPosition);
    removeFwBall(ballPosition);
    const newPosition = ballPosition + 10;
    if (blockBall(newPosition)) {
      ballPosition = newPosition;
      moveFwBall(newPosition);
    }
  }
}; /*   if (yBall > 0) {
    moveFwBall(ballPosition);
  } else if (yBall > 99) {
    moveBwBall(ballPosition);
  }
 */ /*   if (yBall > 0) {
    ballPosition = ballPosition + 10;
    addBall(ballPosition);
  } else {
    ballPosition = ballPosition;
  }
 */ //Definimos una función para que evalue si se puede seguir moviendo la bola

/*   units.forEach(element => {
    
    if (yBall > 0) {
      const newPosition = ballPosition + 1;
      addBall(ballPosition);
    }
   });
 */ /* const blockBall = (position) => {
  if (units.includes(position)) {
    return false;
  } else {
    return true;
  }
}; */
/* const moveBall = (position) => {
  if (ballPosition > 0) {
    const newPosition = ballPosition + 1;
    if (blockBall(newPosition)) {
      ballPosition = newPosition;
    }
  }
  moveBall(ballPosition);
}; */

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

window.addEventListener('keydown', spacePress);
window.addEventListener('keydown', handleKeyPress);
