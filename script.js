function toggleMenu()
{
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const toggleButton = document.getElementById("theme-toggle");

toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");

    const className = document.body.className;
    if(className == "light-theme") {
        toggleButton.textContent = "🌚";
    } else {
        toggleButton.textContent = "🌞";
    }

    const spriteFolder = document.body.classList.contains("dark-theme") ? "white-cat" : "black-cat";
    spriteImages = loadSpriteSet(spriteFolder);
});