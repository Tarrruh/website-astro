
const darkModeToggle = document.getElementById("darkModeToggle");

function setDarkMode(enabled) {
    document.body.classList.toggle("dark-mode", enabled);
    darkModeToggle.textContent = enabled ? "☀️" : "🌙";
    localStorage.setItem("theme", enabled ? "dark" : "light");  // Store preference
}

// Apply Dark Mode on Page Load
function applyTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }
}

// Auto Dark Mode
const hour = new Date().getHours();
if (localStorage.getItem("theme") === "dark" || (hour >= 19 || hour <= 6)) {
    setDarkMode(true);
} else if (localStorage.getItem("theme") !== "dark" && (hour < 19 && hour > 6)) {
    setDarkMode(false);
}

darkModeToggle.addEventListener("click", () => {
    setDarkMode(!document.body.classList.contains("dark-mode"));
});

// Call applyTheme when the page loads
document.addEventListener('DOMContentLoaded', applyTheme);


const newsContainer = document.getElementById("news-container");

async function fetchNews() {
    try {
        const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles");
        const newsData = await response.json();

        newsContainer.innerHTML = "";
        newsData.slice(0, 3).forEach(news => {
            let div = document.createElement("div");
            div.classList.add("news-item");
            div.innerHTML = `
                <img src="${news.imageUrl}" alt="News Image">
                <h3>${news.title}</h3>
                <a href="${news.url}" target="_blank">Read More</a>
            `;
            newsContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

fetchNews();

// Scroll Animation: Fade-in Effect
const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

hiddenElements.forEach(el => observer.observe(el));

// Countdown Timer for Next Event
const countdownDisplay = document.getElementById("countdown");
const eventDate = new Date("2025-06-10T20:00:00").getTime(); 

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    if (timeLeft <= 0) {
        countdownDisplay.textContent = "The event has started!";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownDisplay.textContent = `Next Event: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Astronomy Quiz
const quizButton = document.getElementById("quiz-button");
const quizContainer = document.getElementById("quiz-container");

quizButton.addEventListener("click", () => {
   quizContainer.innerHTML = `
        <h3>What type of galaxy is the Milky Way?</h3>
        <button onclick="checkAnswer('spiral')">Spiral</button>
        <button onclick="checkAnswer('elliptical')">Elliptical</button>
        <button onclick="checkAnswer('irregular')">Irregular</button>
        <button onclick="checkAnswer('lenticular')">Lenticular</button>
    `;
});

function checkAnswer(answer) {
    if (answer === 'spiral') {
        quizContainer.innerHTML = '<h3>Correct! The Milky Way is a spiral galaxy.</h3>';
    } else {
        quizContainer.innerHTML = '<h3>Incorrect. Try again!</h3>';
    }
}


const menuButton = document.getElementById("menu-button");
const menu = document.querySelector(".menu");

menuButton.addEventListener("click", () => {
    menu.classList.toggle("active");
});