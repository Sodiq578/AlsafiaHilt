import { project } from "./project.js";

/**
 * Preload Images
 */
 
const preload = document.querySelector("[data-preloader]");

window.addEventListener("load", () => {
  preload.classList.toggle("remove");
  displayWorks(project);
});

/**
 * Add Event to Multiple ELement
 */

const addEventOnElement = (element, eventType, callback) => {
  for (let i = 0, len = element.length; i < len; i++) {
    element[i].addEventListener(eventType, callback);
  }
};

/**
 * Navbar for Small Screen
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElement(navTogglers, "click", toggleNav);

/**
 * Header Active
 */

const header = document.querySelector("[data-header]");
window.addEventListener("scroll", () => {
  header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});

/**
 * Project List
 */
const workList = document.querySelector(".work-list");

const displayWorks = (workItems) => {
  let displayWork = workItems.map((item) => {
    return `
      <li class="work-item custom-class"> <!-- Custom class qo'shildi -->
        <div class="workBox-left" data-aos="zoom-in-left">
          <div class="card-banner img-holder custom-img-holder"> <!-- Custom img holder -->
            <img src="${item.img}" width="594" height="491" alt="Project Image" class="img-cover custom-img-cover"> <!-- Custom img cover -->
          </div>
        </div>
        <div class="workBox-right" data-aos="fade-up">
          <p class="workBox-title">${item.title}</p>
          <p class="workBox-text p">${item.description}</p>
          <a href="./buy/buy.html" target="_blank" class="btn btn-primary">Sotib olish
            <ion-icon name="arrow-forward-outline"></ion-icon></a>
        </div>
      </li>`;
  });

  displayWork = displayWork.join("");
  workList.innerHTML += displayWork;
};






















const token = "7659282400:AAGj3rHn_lozkep2B4tBqwoUy_fBrXh2ycU";
const chatId = "-4698937559";

// Function to get the current day in Uzbek
const getCurrentDay = () => {
    const days = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"];
    const now = new Date();
    const dayIndex = now.getDay(); // Get the current day (0-6)
    return days[dayIndex]; // Return the name of the current day
};

// Function to get the current date and time in Uzbek format with day of the week
const getCurrentDateTime = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('uz-UZ', { month: 'long' }); // Get month in Uzbek
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`; // Format time to HH:mm

    // Return the formatted string
    return `Bugun: ${getCurrentDay()}, ${day} ${month} ${year} yil, Soat: ${formattedTime}`;
};

const messageTemplate = (name, phone) => `
    Yangi foydalanuchi saytga kirdi 🆕:\n
    Ism: ${name} 📝\n
    Telefon: ${phone} 📱\n
    ${getCurrentDateTime()} 🕒
`;

document.addEventListener("DOMContentLoaded", () => {
    const registerModal = document.getElementById("registerModal");
    const consultationModal = document.getElementById("consultationModal");
    const overlay = document.getElementById("overlay");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    // Show the register modal on page load
    registerModal.style.display = "block";
    overlay.style.display = "block";  // Show the overlay when modal is open

    // "Ha" button closes the register modal
    yesBtn.addEventListener("click", () => {
        registerModal.style.display = "none";
        overlay.style.display = "none";  // Hide overlay when modal is closed
    });

    // "Yo'q" button shows the consultation modal
    noBtn.addEventListener("click", () => {
        registerModal.style.display = "none";
        consultationModal.style.display = "block";
        overlay.style.display = "block";  // Show overlay for consultation modal
    });

    // Close consultation modal after form submission
    const consultationForm = document.getElementById("consultationForm");

    consultationForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;

        // Telegram bot API (Example code)
        const message = messageTemplate(name, phone);
        const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    consultationForm.reset();  // Reset form
                } else {
                    console.error("Error sending message:", data.description);
                }
            })
            .catch(error => {
                console.error("Error occurred:", error);
            });

        // Close consultation modal and hide overlay
        consultationModal.style.display = "none";
        overlay.style.display = "none";
    });
});
