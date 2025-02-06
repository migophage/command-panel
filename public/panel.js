document.addEventListener("DOMContentLoaded", function () {
    const commandsList = document.getElementById("commands-list");
    const commandsURL = "https://your-username.github.io/twitch-extension/public/commands.json";  // Update this with your GitHub Pages link

    fetch(commandsURL)
        .then(response => response.json())
        .then(data => {
            data.forEach(commandObj => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${commandObj.command}</strong>: ${commandObj.description}`;
                commandsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching commands:", error);
            commandsList.innerHTML = "<li>Error loading commands. Please try again later.</li>";
        });
});