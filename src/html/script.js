// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        darkModeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        darkModeToggle.textContent = "🌙";
    }
});

// Newsletter Signup (Simple Confirmation)
document.getElementById("newsletterForm").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("message").textContent = "Thank you for subscribing!";
});

// Latest News (Dynamically Load Content)
const newsContainer = document.getElementById("news-container");

const newsData = [
    { title: "NASA Discovers New Exoplanet!", date: "Feb 10, 2025" },
    { title: "Lunar Eclipse Visible This Weekend", date: "Feb 15, 2025" },
    { title: "Hubble Captures Stunning Galaxy Image", date: "Feb 20, 2025" }
];

function displayNews() {
    newsContainer.innerHTML = "";
    newsData.forEach(news => {
        let div = document.createElement("div");
        div.classList.add("news-item");
        div.innerHTML = `<strong>${news.title}</strong><br><small>${news.date}</small>`;
        newsContainer.appendChild(div);
    });
}
displayNews();
