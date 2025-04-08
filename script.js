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

    // Update light/dark-theme toggle icon
    if(className == "light-theme") {
        toggleButton.textContent = "🌚";
    } else {
        toggleButton.textContent = "🌞";
    }

    // Update the cat emoji hint icon
    const jacky = document.getElementById("jacky");
    const catHint = jacky.querySelector(".hint");

    if (catHint) {
        if (className == "light-theme") {
            catHint.textContent = "🐈‍⬛";
            jacky.title = "Click me to summon the black cat 🐈‍⬛"
        }
        else {
            catHint.textContent = "🐈";
            jacky.title = "Click me to summon the white cat 🐈"
        }
    }

    // Tell cat.js to update sprite
    if (window.catSpriteSpawned) {
        window.updateCatTheme?.();
    }
});