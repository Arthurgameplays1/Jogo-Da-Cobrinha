const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const tileCount = 20;
const tileSize = canvas.width / tileCount;
let headX = 10;
let headY = 10;
let xVelocity = 0;
let yVelocity = 0;
let appleX = 5;
let appleY = 5;
let tailLength = 2;
const snakeParts = [];

function clearScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGame() {
  clearScreen();
  changeSnakePosition();
  checkCollision();
  drawSnake();
  drawApple();
  setTimeout(drawGame, 100);
}

function checkCollision() {
  if (headX === appleX && headY === appleY) {
    // A cobra colidiu com a maçã
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
  }

  // Verificar colisão com a parede
  if (headX < 0 || headY < 0 || headX >= tileCount || headY >= tileCount) {
    // A cobra colidiu com a parede, reiniciar o jogo
    resetGame();
  }

  // Verificar colisão com o próprio corpo
  for (let i = 0; i < snakeParts.length; i++) {
    const part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      // A cobra colidiu consigo mesma, reiniciar o jogo
      resetGame();
    }
  }
}

function resetGame() {
  headX = 10;
  headY = 10;
  xVelocity = 0;
  yVelocity = 0;
  appleX = 5;
  appleY = 5;
  tailLength = 2;
  snakeParts.length = 0; // Limpar partes da cobra
}

function drawSnake() {
  ctx.fillStyle = 'green';
  for (let i = 0; i < snakeParts.length; i++) {
    const part = snakeParts[i];
    ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
  }
  snakeParts.push({ x: headX, y: headY });

  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = 'blue';
  ctx.fillRect(headX * tileSize, headY * tileSize, tileSize, tileSize);
}

function drawApple() {
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
  switch (event.keyCode) {
    case 38: // Seta para cima
      if (yVelocity !== 1) {
        xVelocity = 0;
        yVelocity = -1;
      }
      break;
    case 40: // Seta para baixo
      if (yVelocity !== -1) {
        xVelocity = 0;
        yVelocity = 1;
      }
      break;
    case 37: // Seta para a esquerda
      if (xVelocity !== 1) {
        xVelocity = -1;
        yVelocity = 0;
      }
      break;
    case 39: // Seta para a direita
      if (xVelocity !== -1) {
        xVelocity = 1;
        yVelocity = 0;
      }
      break;
  }
}

resetGame(); // Iniciar o jogo
drawGame(); // Começar o loop do jogo
