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

    // Force-refresh the sprite
    if (window.catSpriteSpawned) {
        location.reload(); // reload the entire page to refresh the sprite
    }
});