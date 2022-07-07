    //user and scorecard variable
    // var users = [];
    var scorecard = [];
    var score = document.querySelector('#score');
    var scoreNum = 0;
    var floors = [];
    var hearts = 3;

    function game() {
        document.getElementById('start_page').style = 'display:none';
        document.getElementById('game').style = 'display:flex';
        const canvas = document.querySelector('#canvas');
        const c = canvas.getContext('2d');
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        var player_ = document.getElementById('player_name').value;
        if (player_ == '')
            [
                player_ = 'Max'
            ]
        document.getElementById('user-name').innerHTML = `Player:${player_}`;

        var floors = [];
        var player;
        var left;
        var right;
        var hearts = 3;

        //

        class Tiles {
            constructor(x, y, width, height, color) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.color = color;
                this.vel = 2;
                this.info = 's';
                this.got = 0;

            }

            draw() {
                c.fillStyle = this.color;
                c.fillRect(this.x, this.y, this.width, this.height)
            }

            update() {
                this.draw();
                this.y -= this.vel;
            }
        }

        class Tileh {
            constructor(x, y, width, height, color) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.color = color;
                this.vel = 2;
                this.info = 'h';
                this.got = 0;

            }

            draw() {
                c.fillStyle = this.color;
                c.fillRect(this.x, this.y, this.width, this.height);
            }

            update() {
                this.draw();
                this.y -= this.vel;
            }
        }

        class Tile {
            constructor(x, y, width, height, color) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.color = color;
                this.vel = 2;
                this.info = 'n';

            }

            draw() {
                c.fillStyle = this.color;
                c.fillRect(this.x, this.y, this.width, this.height);
            }

            update() {
                this.draw();
                this.y -= this.vel;
            }
        }

        //
        var random = Math.random() * (canvas.width - 150);
        floors.push(new Tile(random, canvas.height, 300, 30, 'blue'));

        setInterval(function () {
            var random = Math.random() * (canvas.width - 150);
            floors.push(new Tile(random, canvas.height, 300, 30, 'blue'));

            var ran1 = Math.floor(Math.random() * 15);
            if (ran1 == 0) {
                floors.push(new Tileh(random, canvas.height, 300, 30, 'red'));
            }
            var ran2 = Math.floor(Math.random() * 15);
            if (ran2 == 0) {
                floors.push(new Tiles(random, canvas.height, 300, 30, 'green'));
            }

        }, 1500);

        //
        class Player {
            constructor(x, y, radius, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.velocity = 15;
                this.exgravity = 0.3;
                this.gravity = 3;
            }

            draw() {
                c.beginPath();
                c.fillStyle = this.color;
                c.arc(this.x, this.y, this.radius, 0, 360, false);
                c.fill();
                c.closePath();
            }

            update() {
                this.draw();

                if (left) {
                    this.x -= this.velocity;
                }
                if (right) {
                    this.x += this.velocity;
                }

                if (this.x - this.radius < 0) {
                    this.x = this.radius;
                }
                if (this.x + this.radius > canvas.width) {
                    this.x = canvas.width - this.radius;
                }
                this.gravity += this.exgravity;
                if (this.gravity > 8) {
                    this.gravity = 8;
                }
                this.y += this.gravity;
            }
        }
        player = new Player(Math.random() * (((canvas.width - 20) - 20) + 25), 50, 20, 'yellow');

        //score
        setInterval(function () {

            //checking for hit in the upper and lower wall
            if (player.y - player.radius <= 0 || player.y + player.radius >= canvas.height) {
                hearts -= 1;
                document.querySelector('.hearty').innerHTML = "Hearts : " + hearts;
                score.textContent = scoreNum;

                floors = [];
                up = false;
                left = false;
                right = false;
                player.gravity = 4;
                player.x = Math.random() * (((canvas.width - 20) - 20) + 20);
                player.y = 100;

                var random = Math.random() * (canvas.width - 150);
                floors.push(new Tile(random, canvas.height, 300, 30, 'blue'));

                var ran1 = Math.floor(Math.random() * 3);
                if (ran1 == 0) {
                    floors.push(new Tileh(random, canvas.height, 300, 30, 'red'));
                }

                //checking for life
                if (hearts <= 0) {
                    scorecard.push(scoreNum);
                    scorecard.sort(function (a, b) {
                        return b - a
                    });
                    alert("Your score is" + scoreNum);
                    disp_score();
                    hearts = 3;
                    scoreNum = 0;
                    score.textContent = scoreNum;
                    document.querySelector('.hearty').innerHTML = "Hearts : " + hearts;

                    var random = Math.random() * (canvas.width - 150);
                    floors.push(new Tile(random, canvas.height, 300, 30, 'blue'));

                    var ran1 = Math.floor(Math.random() * 3);
                    if (ran1 == 0) {
                        floors.push(new Tileh(random, canvas.height, 300, 30, 'red'));
                    }
                }

            }

            score.textContent = scoreNum;
        });




        //
        function animate() {
            requestAnimationFrame(animate);
            c.clearRect(0, 0, canvas.width, canvas.height);

            floors.forEach((floor, index) => {
                floor.update();
                if (floor.y < 0) {
                    setTimeout(function () {
                        floors.splice(index, 1);
                    }, 0);
                }
                //collision
                if ((player.y + player.radius >= floor.y) && (player.y - player.radius <= floor.y + floor.height)) {
                    if ((player.x + player.radius > floor.x) && (player.x + player.radius < floor.x + floor.width)) {
                        player.y=floor.y-floor.height+player.radius;
                        player.gravity = -floor.vel;
                        player.exgravity = 0;
                        //heart pickups
                        if (floor.info == 'h' && floor.got == 0) {
                            hearts += 1;
                            document.querySelector('.hearty').innerHTML = "Hearts : " + hearts;

                            floor.got = 1;
                        }

                        //toxic tile
                        if (floor.info == 's' && floor.got == 0) {
                            hearts -= 1;
                            document.querySelector('.hearty').innerHTML = "Hearts : " + hearts;
                            floors = [];
                            up = false;
                            left = false;
                            right = false;
                            player.gravity = 4;
                            player.x = Math.random() * (((canvas.width - 20) - 20) + 20);
                            player.y = 100;
                            //checking life value
                            if (hearts <= 0) {
                                scorecard.push(scoreNum);
                                scorecard.sort(function (a, b) {
                                    return b - a
                                });
                                alert("Your score is" + scoreNum);
                                disp_score();
                                scoreNum = 0;
                                score.textContent = scoreNum;
                                hearts = 3;
                                document.querySelector('.hearty').innerHTML = "Hearts : " + hearts;

                                var random = Math.random() * (canvas.width - 150);
                                floors.push(new Tile(random, canvas.height, 300, 30, 'blue'));

                                var ran1 = Math.floor(Math.random() * 3);
                                if (ran1 == 0) {
                                    floors.push(new Tileh(random, canvas.height, 300, 30, 'red'));
                                }
                            }
                            floor.got = 1;
                        }
                    } else {
                        player.gravity = 4;
                        player.exgravity = 0.3;
                        scoreNum++;
                    }
                }

            });
            player.update();
        }
        animate();

        document.addEventListener('keydown', (event) => {
            if (event.key == 'ArrowLeft' || event.key == 'a' || event.key == 'A') {
                left = true;
            }
            if (event.key == 'ArrowRight' || event.key == 'd' || event.key == 'D') {
                right = true;
            }
        });

        document.addEventListener('keyup', () => {
            left = false;
            right = false;
            up = false;
        });

    }

    function disp_score() {
        var tbody = document.getElementById('tbody');
        tbody.innerHTML = ``;
        var k = scorecard.length >= 5 ? 5 : scorecard.length;
        for (i = 0; i < k; i++) {
            var score_temp = scorecard[i];
            tbody.innerHTML += `<tr><td>${score_temp}</td></tr>`;
        }

    }
    document.getElementById('start_btn').addEventListener("click", game);
