// Definir celdas del field

const width = 10;
const height = 20.9;

const area = width * height;

const field = document.querySelector('.field');

const units = [];

for (let index = 0; index <= area; index++) {
  const cell = document.createElement('div');

  cell.innerText = index;
  cell.classList.add('cell');
  field.appendChild(cell);
  units.push(cell);
}

//- Setear teclas de movimiento de paddles
//Selecciono el paddle del jugador 01
const player01 = document.querySelector('.paddle01');

let paddlePosition = 0;

const handleKeyDown = (event) => {
  const { key } = event;
};
const xPaddle = paddlePosition % width;
const yPaddle = Math.floor(paddlePosition / height);

/* switch (key) {
  case 'ArrowUp':
    if (y > 0) {
      pikaPosition = pikaPosition - width;
    }
    break;
  case 'ArrowRight':
    if (x < width - 1) {
      pikaPosition++;
    }
    break;
  case 'ArrowDown':
    if (y < width - 1) {
      pikaPosition = pikaPosition + width;
    }
    break;
  case 'ArrowLeft':
    if (x > 0) {
      pikaPosition--;
    }

    break;
  default:
    console.log('Eso no es una flecha flaco');
    break;
}
 */
window.addEventListener('keydown', handleKeyDown);
