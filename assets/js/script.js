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























