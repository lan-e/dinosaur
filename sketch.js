let obstacles;
let randint;
let score, pointPopup;
let lost;
let next;
let spread;
let slider,
  sliderLabel,
  sliderCount,
  sliderGrav,
  sliderGravLabel,
  sliderCountGrav;
let settingsIcon, closeIcon;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight / 2);
}

function preload() {
  soundFormats("mp3", "wav");
  music = loadSound("assets/sound/music");
  jumpSound = loadSound("assets/sound/jump.wav");
  pointSound = loadSound("assets/sound/point");
  gameOverSound = loadSound("assets/sound/game-over");
}

function playAudio() {
  music.play();
  soundOn.show();
  soundOff.hide();
  loop();
}

function pauseAudio() {
  music.pause();
  soundOn.hide();
  soundOff.show();
}

function setup() {
  createCanvas(windowWidth, windowHeight / 2);
  textSize(24);

  soundOn = createImg("assets/soundOn.svg");
  soundOn.position(10, windowHeight / 2 + 45);
  soundOn.hide();
  soundOn.addClass("sound-on");

  soundOff = createImg("assets/soundOff.svg");
  soundOff.position(10, windowHeight / 2 + 45);
  soundOff.addClass("sound-off");

  document.querySelector(".sound-off").addEventListener("click", () => {
    playAudio();
  });
  document.querySelector(".sound-on").addEventListener("click", () => {
    pauseAudio();
  });

  //Jump slider
  slider = createSlider(10, 20, 12, 1);
  slider.position(50, windowHeight / 2 + 35);
  sliderLabel = createDiv("Jump");
  sliderLabel.position(50, windowHeight / 2 + 15);
  sliderCount = createDiv("");
  sliderCount.position(95, windowHeight / 2 + 15);
  sliderLabel.hide();
  slider.hide();
  sliderCount.hide();

  //Gravity slider
  sliderGrav = createSlider(0.2, 1, 0.6, 0.1);
  sliderGrav.position(50, windowHeight / 2 + 80);
  sliderGravLabel = createDiv("Gravity");
  sliderGravLabel.position(50, windowHeight / 2 + 65);
  sliderCountGrav = createDiv("");
  sliderCountGrav.position(105, windowHeight / 2 + 65);
  sliderGravLabel.hide();
  sliderGrav.hide();
  sliderCountGrav.hide();

  settingsIcon = createImg("assets/settings.svg");
  settingsIcon.position(10, windowHeight / 2 + 10);
  settingsIcon.addClass("settings");

  closeIcon = createImg("assets/close.svg");
  closeIcon.position(10, windowHeight / 2 + 10);
  closeIcon.addClass("close");
  closeIcon.hide();

  document.querySelector(".settings").addEventListener("click", () => {
    sliderLabel.show();
    slider.show();
    sliderCount.show();
    sliderGravLabel.show();
    sliderGrav.show();
    sliderCountGrav.show();
    settingsIcon.hide();
    closeIcon.show();
  });

  document.querySelector(".close").addEventListener("click", () => {
    sliderLabel.hide();
    slider.hide();
    sliderCount.hide();
    sliderGravLabel.hide();
    sliderGrav.hide();
    sliderCountGrav.hide();
    settingsIcon.show();
    closeIcon.hide();
  });

  document
    .querySelector("html")
    .addEventListener(
      "click",
      () => (document.querySelector(".introMsg").style.display = "none")
    );

  resetSketch();
}

function keyPressed() {
  if (key == " ") {
    dinosaur.jump();
    jumpSound.play();
    document.querySelector(".introMsg").style.display = "none";

    if (lost) {
      resetSketch();
    }
  }
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    if (!lost) {
      dinosaur.jump();
      jumpSound.play();
    }
    if (lost) {
      resetSketch();
    }
  }
}

function resetSketch() {
  score = 0;
  lost = false;
  obstacles = [];
  next = 0;
  dinosaur = new Dinosaur();
  new Obstacle();
  randint = int(random(50, 150));
  loop();
}

function draw() {
  sliderCount.html(slider.value());
  sliderCountGrav.html(sliderGrav.value());

  background(237);
  text(score, 4, 25);

  next += 1;
  if (next == randint) {
    obstacles.push(new Obstacle());
    next = 0;
    randint = int(random(40, width / 5));
  }

  for (let o of obstacles) {
    if (o.x < 0) {
      if (obstacles.length > 3) {
        obstacles.shift();
      }
    }
    o.move();
    o.show();

    //jump
    if (o.x < dinosaur.x && !o.passed) {
      o.passed = true;
      score += 1;
      pointPopup = createDiv("+1");
      pointPopup.position(5, 28);
      pointPopup.show();
      pointSound.play();

      setTimeout(() => {
        pointPopup.hide();
      }, 500);
    }

    //game over
    if (dinosaur.hits(o)) {
      lost = true;
      gameOverSound.play();
      document.querySelector(".introMsg").style.display = "block";
      document.querySelector(
        ".introMsg"
      ).innerHTML = `Game Over! Your score: <b>${score}</b>. <br> Start over by pressing space or click.`;

      noLoop();
    }
  }

  dinosaur.show();
  dinosaur.move();
}
