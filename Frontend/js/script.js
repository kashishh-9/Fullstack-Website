const navbarLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-links");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const backToTop = document.getElementById("backToTop");
const skillBars = document.querySelectorAll(".progress span");
const form = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");
navbarLinks.forEach(link => {               /*Smooth Scroll*/
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
        navMenu.classList.remove("active");
    });
});
window.addEventListener("scroll", () => {          /*Active Navigation*/
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navbarLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
hamburger.addEventListener("click", () => {        /*Hamburger Menu*/
    navMenu.classList.toggle("active");
});
function enableDarkMode() {                      /*Dark Mode Toggle*/
    document.body.classList.add("dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
}
function enableLightMode() {
    document.body.classList.remove("dark");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
}
themeToggle.addEventListener("click", () => {
    if (document.body.classList.contains("dark")) {
        enableLightMode();
    }
    else {
        enableDarkMode();
    }
});
if (localStorage.getItem("theme") === "dark") {
    enableDarkMode();
}
window.addEventListener("scroll", () => {     /*Back to Top Button*/
    if (window.scrollY > 400) {
        backToTop.style.display = "block";
    }
    else {
        backToTop.style.display = "none";
    }
});
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
const words = [                        // Typing Effect Words
    "Full Stack Developer",
    "Web Developer",
    "B.Tech Student",
    "Problem Solver"
];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = "";
let isDeleting = false;
const typing = document.getElementById("typing");
function typeEffect() {
    currentWord = words[wordIndex];
    if (!isDeleting) {
        typing.textContent = currentWord.substring(0, letterIndex);
        letterIndex++;
        if (letterIndex > currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    }
    else {
        typing.textContent = currentWord.substring(0, letterIndex);
        letterIndex--;
        if (letterIndex < 0) {
            isDeleting = false;
            wordIndex++;
            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }
    }
    setTimeout(typeEffect, isDeleting ? 70 : 120);
}
typeEffect();
function animateSkills() {          /*Skill Bars Animation*/
    skillBars.forEach(bar => {
        const position = bar.getBoundingClientRect().top;
        const screen = window.innerHeight;
        if (position < screen - 100) {
            bar.style.width = bar.dataset.width;
        }
    });
}
window.addEventListener("scroll", animateSkills);
animateSkills();
const revealElements = document.querySelectorAll(       /*SkillBar*/
    ".service-card, .about-card, .project-card, .timeline-item"
);
function revealOnScroll() {
    revealElements.forEach(item => {
        const top = item.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        if (top < screenHeight - 100) {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }
    });
}
revealElements.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = "0.6s ease";
});
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
form.addEventListener("submit", async (e) => {     /*Contact Form*/
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!name || !email || !message) {
        responseMessage.className = "error";
        responseMessage.textContent = "Please fill all fields.";
        return;
    }
    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "Sending...";
    try {
        const response = await fetch("https://portfolio-backend-68uj.onrender.com/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });
        let data = {};
        if (response.ok) {
            try {
                data = await response.json();
            }
            catch (err) {
                data = {};
            }
        }
        if (response.ok && data.success) {
            responseMessage.className = "success";
            responseMessage.textContent =
                "Message sent successfully!";
            form.reset();
        }
        else {
            responseMessage.className = "error";
            responseMessage.textContent =
                "Something went wrong.";
        }
    }
    catch (error) {
        responseMessage.className = "error";
        responseMessage.textContent =
            "Server is not responding.";
    }
    button.disabled = false;
    button.textContent = "Send Message";
});



