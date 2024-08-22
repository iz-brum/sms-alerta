document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Verifica se o usuário já tem uma preferência salva no localStorage
    const currentMode = localStorage.getItem("darkMode");
    if (currentMode) {
        body.classList.add(currentMode);
    }

    toggleButton.addEventListener("click", function() {
        body.classList.toggle("dark-mode");

        // Salva a preferência do usuário no localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "dark-mode");
        } else {
            localStorage.removeItem("darkMode");
        }
    });
});
