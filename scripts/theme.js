document.getElementById("toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const darkMode = document.body.classList.contains("dark");

    if (window.updateMapTheme) {
        window.updateMapTheme(darkMode);
    }
});
// Wait until DOM loads
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggle");
    const image = document.querySelector(".split img");

    function applyTheme(theme) {
        const isDark = theme === "dark";
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");

        if (window.updateMapTheme) {
            window.updateMapTheme(isDark);
        }
    }

    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    //Change Theme
    if (toggleBtn) {
        toggleBtn.onclick = () => {
            const currentTheme = document.documentElement.classList.contains("dark")
                ? "light"
                : "dark";
            applyTheme(currentTheme);
        };
    }

    // Sync theme across open pages/tabs
    window.addEventListener("storage", (event) => {
        if (event.key === "theme") {
            applyTheme(event.newValue);
        }
    });
});
