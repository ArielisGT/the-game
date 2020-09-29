//Nueva lógica
//Crear objetos paddles y pelota
/* const paddle01 = {
  width: 4,
  height: 1,
  x: 200,
  y: 50,
  speed: 1,
}
const paddle02 = {
  width: 4,
  height: 1,
  x: 200,
  y: 750,
  speed: 1,
};
const ball = {
  width: 1,
  height: 1,
  x: 200,
  y: 200,
  speed: 1,
};
const fieldGame = {
  width: 400 ,
  height: 800,
  }
 */

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
//Definimos una funcion para que la pelota se mueva sola
const timer = setInterval((event) => {
  event = moveFwBall(ballPosition); 
}, Infinity);


//Definimos una función para que evalue si se puede seguir moviendo la bola

addBall(ballPosition);
addPlayer01(paddlePosition01);
addPlayer02(paddlePosition02);
timer();

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




window.addEventListener('load', timer(ballPosition));
window.addEventListener('keydown', handleKeyPress);
