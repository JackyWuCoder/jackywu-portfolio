export function setupCat(canvasId = "cat-canvas") {
    const canvas = document.createElement("canvas");
    canvas.id = canvasId;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const idleImg = new Image();
    idleImg.src = "./cat-mode/sprites/cat_idle.png";

    idleImg.onload = () => {
        ctx.drawImage(idleImg, 0, 0, 32, 32, 100, 100, 32, 32);
    }    
}