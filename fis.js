window.addEventListener("DOMContentLoaded", function () {
    var background = document.querySelector("#bg");
    var buttons = document.querySelector("#buttons");
    var splash = document.querySelector("#splash");
    var game = document.querySelector("#game");
    var rocks = document.querySelector("#rocks");
    var gameover = document.querySelector("#gameover");
    var button1 = document.querySelector(".button-1");
    var button2 = document.querySelector(".button-2");
    var button3 = document.querySelector(".button-3");
    var exit = document.querySelector(".button-exit");
    var missiles = [];
    var enemies = [];
    var opacity = 1;
    var pos = 0;
    var pos2 = 0;
    var pos3 = 0;
    var bg4;
    var bg5;
    game.addEventListener("click", function (event) {
        createLaser(event);
        missileShoot();
    });
    splash.style.opacity = opacity.toString();
    window.setInterval(function () {
        pos++;
        background.style.backgroundPositionX = pos + "px";
    }, 40);
    window.setInterval(function () {
        pos2 -= 2;
        game.style.backgroundPositionX = pos2 + "px";
    }, 40);
    window.setInterval(function () {
        pos3 -= 3;
        rocks.style.backgroundPositionX = pos3 + "px";
    }, 40);
    function createLaser(event) {
        var laser1 = new Laser(game, event.screenX + 60, event.screenY - 85);
        missiles.push(laser1);
    }
    function missileShoot() {
        var _loop_1 = function (i) {
            var pos4 = parseInt(missiles[i].element.style.left);
            window.setInterval(function () {
                pos4 += 5;
                missiles[i].element.style.left = pos4 + "px";
                if (pos4 > game.offsetLeft + 710) {
                    missiles[i].element.classList.add("no-display");
                    missiles[i].element.remove();
                }
            }, 40);
        };
        for (var i = 0; i < missiles.length; i++) {
            _loop_1(i);
        }
        ;
    }
    function createEnemy() {
        var enemy1 = new EnemyShip(game, game.offsetLeft + 690, game.offsetTop + Math.random() * 500);
        enemies.push(enemy1);
        var _loop_2 = function (i) {
            var pose = parseInt(enemies[i].element.style.left);
            var bge = window.setInterval(function () {
                pose -= Math.floor((Math.random() + 2) * 3);
                enemies[i].element.style.left = pose + "px";
                if (pose < game.offsetLeft) {
                    enemies[i].element.classList.add("no-display");
                    enemies[i].element.remove();
                }
            }, 40);
        };
        for (var i = 0; i < enemies.length; i++) {
            _loop_2(i);
        }
    }
    function fadeOut() {
        window.setInterval(function () {
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
    var Laser = /** @class */ (function () {
        function Laser(element, x, y) {
            this.element = document.createElement("div");
            this.element.classList.add("missile");
            var missile = element.appendChild(this.element);
            missile.style.left = x + "px";
            missile.style.top = y + "px";
        }
        return Laser;
    }());
    var EnemyShip = /** @class */ (function () {
        function EnemyShip(element, x, y) {
            this.element = document.createElement("div");
            this.element.classList.add("enemy");
            this.element.addEventListener("mouseover", function () {
                game.style.cursor = "default";
                this.style.backgroundImage = "url('explosion.gif')";
                endGame();
            });
            var missile = element.appendChild(this.element);
            missile.style.left = x + "px";
            missile.style.top = y + "px";
        }
        return EnemyShip;
    }());
    function startGame() {
        buttons.classList.add("no-display");
        background.classList.add("no-display");
        game.style.cursor = "url('spaceship2.png'), auto";
        game.classList.remove("no-display");
        bg4 = setInterval(createEnemy, 2000);
        bg5 = setInterval(function () {
            for (var i = 0; i < missiles.length; i++) {
                var _loop_3 = function (j) {
                    var miss1 = missiles[i].element.getBoundingClientRect();
                    var enem1 = enemies[j].element.getBoundingClientRect();
                    if ((Math.abs((enem1.left - miss1.right)) < 5 || (Math.abs(enem1.left - miss1.left)) < 80) && enem1.bottom > miss1.bottom && enem1.bottom < miss1.bottom + 100 && enem1.left != 0 && miss1.right != 0) {
                        enemies[j].element.style.backgroundImage = "url('explosion.gif')";
                        missiles[i].element.remove();
                        setTimeout(function () {
                            enemies[j].element.remove();
                        }, 600);
                    }
                };
                for (var j = 0; j < enemies.length; j++) {
                    _loop_3(j);
                }
            }
        }, 10);
    }
    ;
    function endGame() {
        clearInterval(bg4);
        clearInterval(bg5);
        gameover.classList.remove("no-display");
        setTimeout(function () {
            gameover.classList.add("no-display");
        }, 1200);
        setTimeout(function () {
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
    }
    ;
    game.addEventListener("mousemove", function (event) {
        if (event.pageY - 10 < game.offsetTop || event.pageY + 10 > game.offsetTop + 600) {
            endGame();
        }
    });
    button1.addEventListener("click", startGame);
    button2.addEventListener("click", startGame);
    button3.addEventListener("click", startGame);
    exit.addEventListener("click", function () {
        window.location.href = "http://google.com";
    });
});
