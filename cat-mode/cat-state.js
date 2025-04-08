export function loadSpriteSet(spriteFolder) {
    // Sprite images
      const idleImg = new Image();
      idleImg.src = `./cat-mode/sprites/${spriteFolder}/${spriteFolder}_idle.png`;
      
      const runImg = new Image();
      runImg.src = `./cat-mode/sprites/${spriteFolder}/${spriteFolder}_run.png`;

      const jumpImg = new Image();
      jumpImg.src = `./cat-mode/sprites/${spriteFolder}/${spriteFolder}_jump.png`;

      const fallImg = new Image();
      fallImg.src = `./cat-mode/sprites/${spriteFolder}/${spriteFolder}_fall.png`;

      return { idleImg, runImg, jumpImg, fallImg };
  }

  export function waitForSpritesToLoad(images, callback) {
    let loaded = 0;
    const total = images.length;

    images.forEach((img) => {
        if (img.complete) {
            loaded++;
            if (loaded === total) callback();
        } else {
            img.onload = () => {
                loaded++;
                if (loaded === total) callback();
            };
        }
    });
}