const blackCatIdleSrc = "./cat-mode/sprites/black-cat/cat_black_idle.png";
const blackCatRunSrc = "./cat-mode/sprites/black-cat/cat_black_run.png";

export function setupCat(canvasId = "cat-canvas") {

    // Create a canvas element
    const canvas = document.createElement("canvas");
    canvas.id = canvasId;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    // Animate idle sprite loop
    const ctx = canvas.getContext("2d");

    // Idle sprite image
    const idleImg = new Image();
    idleImg.src = blackCatIdleSrc;
    
    // Run sprite image
    const runImg = new Image();
    runImg.src = blackCatRunSrc;

    const IDLE_FRAMES = 8;
    let currentFrame = 0;
    let frameTimer = 0;

    // Keyboard input & movement
    let x = 100;
    let y = 100;
    const keys = {};
    let moving = false;

    window.addEventListener("keydown", (e) => keys[e.key.toLowerCase()] = true);
    window.addEventListener("keyup", (e) => keys[e.key.toLowerCase()] = false);

    function update() {
        moving = false;

        if (keys["arrowup"] || keys["w"]) {
            y -= 2;
            moving = true;
        }
        if (keys["arrowdown"] || keys["s"]) {
            y += 2;
            moving = true;
        }
        if (keys["arrowleft"] || keys["a"]) {
            x -= 2;
            moving = true;
        }
        if (keys["arrowright"] || keys["d"]) {
            x += 2;
            moving = true;
        }

        // Prevent walking off screen}
        x = Math.max(0, Math.min(x, canvas.width - 32));
        y = Math.max(0, Math.min(y, canvas.height - 32));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const sprite = moving ? runImg : idleImg;

        frameTimer++;
        if (frameTimer > 10) {
            currentFrame = (currentFrame + 1) % IDLE_FRAMES;
            frameTimer = 0;
        }

        ctx.drawImage(sprite, currentFrame * 32, 0, 32, 32, x, y, 32, 32);
        requestAnimationFrame(draw);
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    idleImg.onload = () => {
        runImg.onload = () => {
            loop();
        };
    };
}