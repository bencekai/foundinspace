window.addEventListener("DOMContentLoaded", function() {

  var background: HTMLElement = document.querySelector("#bg");
  var buttons: HTMLElement = document.querySelector("#buttons");
  var splash: HTMLElement = document.querySelector("#splash");
  var game: HTMLElement = document.querySelector("#game");
  var rocks: HTMLElement = document.querySelector("#rocks");
  var gameover: HTMLElement = document.querySelector("#gameover");
  var button1: HTMLElement = document.querySelector(".button-1");
  var button2: HTMLElement = document.querySelector(".button-2");
  var button3: HTMLElement = document.querySelector(".button-3");
  var exit: HTMLElement = document.querySelector(".button-exit");
  var missiles: any[] = [];
  var enemies: any[] = [];
  var opacity: number = 1;
  var pos: number = 0;
  var pos2: number = 0;
  var pos3: number = 0;
  var bg4: any;
  var bg5: any;

  game.addEventListener("click", function(event) {
    createLaser(event);
    missileShoot();
  });

  splash.style.opacity = opacity.toString();

  window.setInterval(function() {
    pos++;
    background.style.backgroundPositionX = pos + "px";
  }, 40);

  window.setInterval(function() {
    pos2 -= 2;
    game.style.backgroundPositionX = pos2 + "px";
  }, 40);

  window.setInterval(function() {
    pos3 -= 3;
    rocks.style.backgroundPositionX = pos3 + "px";
  }, 40);

  function createLaser(event): void {
    var laser1 = new Laser(game, event.screenX + 60, event.screenY - 85);
    missiles.push(laser1);
  }

  function missileShoot(): void {
    for (let i = 0; i < missiles.length; i++) {
      let pos4: number = parseInt(missiles[i].element.style.left);
      window.setInterval(function() {
        pos4 += 5;
        missiles[i].element.style.left = pos4 + "px";
        if (pos4 > game.offsetLeft + 710) {
          missiles[i].element.classList.add("no-display");
          missiles[i].element.remove();
        }
      }, 40);
    };
  }

  function createEnemy(): void {
    var enemy1 = new EnemyShip(game, game.offsetLeft + 690, game.offsetTop + Math.random() * 500);
    enemies.push(enemy1);
    for (let i = 0; i < enemies.length; i++) {
      let pose: number = parseInt(enemies[i].element.style.left);
      let bge = window.setInterval(function() {
        pose -= Math.floor((Math.random() + 2) * 3);
        enemies[i].element.style.left = pose + "px";
        if (pose < game.offsetLeft) {
          enemies[i].element.classList.add("no-display");
          enemies[i].element.remove();
        }
      }, 40);
    }
  }

  function fadeOut(): void {
    window.setInterval(function() {
      splash.style.opacity = opacity.toString();
      if (opacity > 0) {
        opacity -= 0.005;
      }
      if (opacity < 0) {
        splash.remove();
      }
      10;
    });
  }

  setTimeout(fadeOut, 2000);

  class Laser {

    element: HTMLElement;

    constructor(element: HTMLElement, x: number, y: number) {
      this.element = document.createElement("div");
      this.element.classList.add("missile");
      let missile = element.appendChild(this.element);
      missile.style.left = x + "px";
      missile.style.top = y + "px";
    }
  }

  class EnemyShip {

    element: HTMLElement;

    constructor(element: HTMLElement, x: number, y: number) {
      this.element = document.createElement("div");
      this.element.classList.add("enemy");
      this.element.addEventListener("mouseover", function(){
        game.style.cursor = "default";
        this.style.backgroundImage = "url('explosion.gif')";
        endGame();
      });
      let missile = element.appendChild(this.element);
      missile.style.left = x + "px";
      missile.style.top = y + "px";
    }
  }

  function startGame(): void {
    buttons.classList.add("no-display");
    background.classList.add("no-display");
    game.style.cursor = "url('spaceship2.png'), auto";
    game.classList.remove("no-display");
    bg4 = setInterval(createEnemy, 2000);
    bg5 = setInterval(function(): void {
      for (let i = 0; i < missiles.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
          let miss1 = missiles[i].element.getBoundingClientRect();
          let enem1 = enemies[j].element.getBoundingClientRect();
          if ((Math.abs((enem1.left - miss1.right)) < 5 || (Math.abs(enem1.left - miss1.left)) < 80) && enem1.bottom > miss1.bottom && enem1.bottom < miss1.bottom + 100 && enem1.left != 0 && miss1.right != 0) {
            enemies[j].element.style.backgroundImage = "url('explosion.gif')";
            missiles[i].element.remove();
            setTimeout(function() {
              enemies[j].element.remove()
            }, 600);
          }
        }
      }
    }, 10);
  };

  function endGame(): void {
    clearInterval(bg4);
    clearInterval(bg5);
    gameover.classList.remove("no-display");
    setTimeout(function(){
      gameover.classList.add("no-display");
    },1200);
    setTimeout(function() {
      game.innerHTML = "";
      game.appendChild(rocks);
      game.appendChild(gameover);
      pos = 0;
      pos2 = 0;
      pos3 = 0;
      buttons.classList.remove("no-display");
      background.classList.remove("no-display");
      game.classList.remove("game-started");
      game.classList.add("no-display");
    }, 2000);
  };

  game.addEventListener("mousemove", function(event) {
    if (event.pageY - 10 < game.offsetTop || event.pageY + 10 > game.offsetTop + 600) {
      endGame();
    }
  });

  button1.addEventListener("click", startGame);
  button2.addEventListener("click", startGame);
  button3.addEventListener("click", startGame);

  exit.addEventListener("click", function() {
    window.location.href = "http://google.com";
  });

});
