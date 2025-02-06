document.addEventListener("DOMContentLoaded", async function () {
    const commandsList = document.getElementById("commands-list");
    const themeToggle = document.getElementById("theme-toggle");
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");
    const pageInfo = document.getElementById("page-info");

    let commands = [];
    let currentPage = 1;
    let maxCommandsPerPage = 10;

    try 
    {
        // Fetch config.json
        const configResponse = await fetch("config.json");
        const config = await configResponse.json();
        maxCommandsPerPage = config.max_commands_per_page;

        // Fetch commands.json
        const commandsResponse = await fetch(config.commands_source);
        commands = await commandsResponse.json();

        updatePagination();
        displayCommands();
    }
    catch (error) 
    {
        console.error("Error loading config or commands:", error);
        commandsList.innerHTML = "<li>Error loading commands. Please try again later.</li>";
    }

    // Display commands with pagination
    function displayCommands() 
    {
        commandsList.innerHTML = "";
        commands.forEach(commandObj => 
            {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${commandObj.command}</strong>: ${commandObj.description}
                    ${commandObj.aliases && commandObj.aliases.length > 0 
                        ? `<br><em>Aliases:</em> ${commandObj.aliases.join(", ")}` 
                        : ""}`;

                commandsList.appendChild(li);
            });

        updatePagination();
    }

    // Update pagination buttons
    function updatePagination()
    {
        const totalPages = Math.ceil(commands.length / maxCommandsPerPage);
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

        prevPageBtn.style.display = currentPage > 1 ? "inline-block" : "none";
        nextPageBtn.style.display = currentPage < totalPages ? "inline-block" : "none";
    }

    // Pagination events
    prevPageBtn.addEventListener("click", () => 
        {
        if (currentPage > 1) 
            {
                currentPage--;
                displayCommands();
            }
    });

    nextPageBtn.addEventListener("click", () => 
        {
        const totalPages = Math.ceil(commands.length / maxCommandsPerPage);
        if (currentPage < totalPages) 
            {
                currentPage++;
                displayCommands();
            }
    });

    // Light/Dark mode toggle using checkbox
    themeToggle.addEventListener("change", () => 
        {
        document.body.classList.toggle("light-mode", themeToggle.checked);
        localStorage.setItem("theme", themeToggle.checked ? "light" : "dark");
    });

    // Load saved theme
    if (localStorage.getItem("theme") === "light") 
        {
            document.body.classList.add("light-mode");
            themeToggle.checked = true;
        }
});