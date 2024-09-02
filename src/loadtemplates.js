// loadTemplates.js
function loadTemplate(elementId, filePath) {
    fetch(filePath)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Could not fetch ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then((html) => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch((error) => {
            console.error("Error loading template:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadTemplate("header", "../templates/header.html");
    loadTemplate("footer", "../templates/footer.html");
});
