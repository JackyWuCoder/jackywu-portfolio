const blackCatIdleSrc = "./cat-mode/sprites/black-cat/cat_black_idle.png";
const blackCatRunSrc = "./cat-mode/sprites/black-cat/cat_black_run.png";

export function setupCat(canvasId = "cat-canvas") {
    if (window.catSpriteSpawned) return;
    window.catSpriteSpawned = true; // Prevent multiple spawns;

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
    let speed = 10;
    const keys = {};
    let moving = false;
    let facingLeft = false;

    window.addEventListener("keydown", (e) => keys[e.key.toLowerCase()] = true);
    window.addEventListener("keyup", (e) => keys[e.key.toLowerCase()] = false);

    function update() {
        moving = false;

        if (keys["arrowup"] || keys["w"]) {
            if (y > 0) {
                y -= speed;
                moving = true;
            } else {
                window.scrollBy(0, -speed); // Scroll the page up
            }
            
        }
        if (keys["arrowdown"] || keys["s"]) {
            if (y < canvas.height - 32) {
                y += speed;
                moving = true;
            } else {
                window.scrollBy(0, speed); // Scroll the page down
            }
        }
        if (keys["arrowleft"] || keys["a"]) {
            x -= speed;
            moving = true;
            facingLeft = true;
        }
        if (keys["arrowright"] || keys["d"]) {
            x += speed;
            moving = true;
            facingLeft = false;
        }

        // Prevent walking off screen horizontally}
        x = Math.max(0, Math.min(x, canvas.width - 32));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const sprite = moving ? runImg : idleImg;

        frameTimer++;
        if (frameTimer > 10) {
            currentFrame = (currentFrame + 1) % IDLE_FRAMES;
            frameTimer = 0;
        }

        ctx.save(); // Save the current canvas state

        if (facingLeft) {
            ctx.scale(-1, 1); // Flip the canvas horizontally
            ctx.drawImage(sprite, currentFrame * 32, 0, 32, 32, -x - 32, y, 32, 32);
        } else {
            ctx.drawImage(sprite, currentFrame * 32, 0, 32, 32, x, y, 32, 32);
        }

        ctx.restore(); // Restore the canvas state

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