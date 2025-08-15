const score = document.getElementById('score');
const startScreen = document.getElementById('startScreen');
const gameArea = document.getElementById('gameArea');

let player = { speed: 5, score: 0 };
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

document.addEventListener('keydown', pressOn);
document.addEventListener('keyup', pressOff);
startScreen.addEventListener('click', start);

function pressOn(e) {
  e.preventDefault();
  keys[e.key] = true;
}

function pressOff(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function start() {
  startScreen.classList.add('hide');
  gameArea.classList.remove('hide');
  player.start = true;
  player.score = 0;
  gameArea.innerHTML = '';

  for (let x = 0; x < 5; x++) {
    let line = document.createElement('div');
    line.classList.add('line');
    line.y = x * 150;
    line.style.top = line.y + 'px';
    gameArea.appendChild(line);
  }

  let car = document.createElement('div');
  car.setAttribute('class', 'car');
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  for (let x = 0; x < 3; x++) {
    let enemy = document.createElement('div');
    enemy.classList.add('car', 'enemy');
    enemy.y = -(x * 300);
    enemy.style.top = enemy.y + 'px';
    enemy.style.left = Math.floor(Math.random() * 350) + 'px';
    gameArea.appendChild(enemy);
  }

  window.requestAnimationFrame(playGame);
}

function playGame() {
  let car = document.querySelector('.car');
  moveLines();
  moveEnemy(car);

  if (player.start) {
    if (keys.ArrowUp && player.y > 70) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < gameArea.offsetHeight - 100) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < gameArea.offsetWidth - 50) {
      player.x += player.speed;
    }

    car.style.top = player.y + 'px';
    car.style.left = player.x + 'px';

    player.score++;
    score.innerText = 'Score: ' + player.score;
    window.requestAnimationFrame(playGame);
  }
}

function moveLines() {
  let lines = document.querySelectorAll('.line');
  lines.forEach(function (item) {
    item.y += player.speed;
    item.style.top = item.y + 'px';
    if (item.y > 600) {
      item.y -= 750;
    }
  });
}

function moveEnemy(car) {
  let enemies = document.querySelectorAll('.enemy');
  enemies.forEach(function (item) {
    if (isCollide(car, item)) {
      endGame();
    }
    item.y += player.speed;
    item.style.top = item.y + 'px';
    if (item.y > 600) {
      item.y = -200;
      item.style.left = Math.floor(Math.random() * 350) + 'px';
    }
  });
}

function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function endGame() {
  player.start = false;
  startScreen.classList.remove('hide');
  startScreen.innerHTML =
    'Game Over<br>Score: ' + player.score + '<br>Click to Restart';
}
