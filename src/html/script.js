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

// Fetch Latest News (Simulated)
const newsContainer = document.getElementById("news-container");

const newsData = [
    { 
        title: "Astronomers Discover New Exoplanet", 
        img: "https://www.nasa.gov/sites/default/files/thumbnails/image/exoplanet.png"
    },
    { 
        title: "Black Hole Captured in Stunning Detail", 
        img: "https://www.nasa.gov/sites/default/files/thumbnails/image/blackhole.jpg"
    },
    { 
        title: "Upcoming Meteor Shower - Don't Miss It!", 
        img: "https://www.nasa.gov/sites/default/files/thumbnails/image/meteorshower.jpg"
    }
];

function displayNews() {
    newsContainer.innerHTML = "";
    newsData.forEach(news => {
        let div = document.createElement("div");
        div.classList.add("news-item");
        div.innerHTML = `<img src="${news.img}" alt="News Image"><h3>${news.title}</h3>`;
        newsContainer.appendChild(div);
    });
}

// Scroll Animation: Fade-in on Scroll
const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 }); // Trigger when 20% of the element is visible

hiddenElements.forEach(el => observer.observe(el));

displayNews();
