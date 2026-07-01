const loader = document.getElementById("loader");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const header = document.getElementById("header");
const progressBar = document.getElementById("progressBar");
const studioBadge = document.querySelector(".studio-badge");

window.addEventListener("load", () => {
  setTimeout(() => {
    if (loader) {
      loader.classList.add("hide");
    }
  }, 1200);
});

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });
}

const sections = document.querySelectorAll(".page-section");
const navLinks = document.querySelectorAll(".nav a[href^='#']");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (header) {
    header.classList.toggle("scrolled", scrollTop > 35);
  }

  if (studioBadge) {
    studioBadge.classList.toggle("show", scrollTop > 600);
  }

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;

    if (scrollTop >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 80);
      }
    });
  },
  {
    threshold: 0.14
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;

  const triggerPoint = window.innerHeight * 0.85;

  counters.forEach((counter) => {
    const rect = counter.getBoundingClientRect();

    if (rect.top < triggerPoint) {
      countersStarted = true;

      counters.forEach((item) => {
        const target = Number(item.getAttribute("data-count"));
        let current = 0;
        const step = Math.max(1, Math.floor(target / 70));

        const timer = setInterval(() => {
          current += step;

          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          item.textContent = current;
        }, 18);
      });
    }
  });
}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);

const searchForm = document.getElementById("searchForm");
const searchStatus = document.getElementById("searchStatus");

if (searchForm && searchStatus) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    searchStatus.textContent = "Searching premium homes...";

    document.querySelectorAll(".listing-card").forEach((card) => {
      card.classList.remove("show");
      card.style.transform = "translateY(20px)";
      card.style.opacity = "0.55";
    });

    setTimeout(() => {
      searchStatus.textContent = "3 premium properties found.";

      document.querySelectorAll(".listing-card").forEach((card, index) => {
        setTimeout(() => {
          card.style.transform = "";
          card.style.opacity = "";
          card.classList.add("show");
        }, index * 120);
      });
    }, 900);
  });
}

const saveButtons = document.querySelectorAll(".save-btn");

saveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("saved");

    if (button.classList.contains("saved")) {
      button.textContent = "♥ Saved";
    } else {
      button.textContent = "♡ Save";
    }
  });
});

const locationData = {
  London: {
    title: "Prime Central Demand",
    text: "Luxury apartments and modern family homes remain popular with buyers seeking strong transport links and premium amenities.",
    price: "£740k"
  },
  Birmingham: {
    title: "Growing Investment Area",
    text: "A strong choice for buyers looking for value, development growth and modern city living.",
    price: "£325k"
  },
  Manchester: {
    title: "High Buyer Activity",
    text: "Modern apartments and family homes attract professionals, investors and first-time buyers.",
    price: "£360k"
  },
  Leeds: {
    title: "Popular Family Market",
    text: "A rising location for buyers wanting space, strong communities and good access to city life.",
    price: "£290k"
  }
};

const locationButtons = document.querySelectorAll(".location-btn");
const locationName = document.getElementById("locationName");
const locationTitle = document.getElementById("locationTitle");
const locationText = document.getElementById("locationText");
const locationPrice = document.getElementById("locationPrice");

locationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.getAttribute("data-location");
    const data = locationData[selected];

    locationButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    if (data && locationName && locationTitle && locationText && locationPrice) {
      locationName.textContent = selected;
      locationTitle.textContent = data.title;
      locationText.textContent = data.text;
      locationPrice.textContent = data.price;
    }
  });
});

const properties = {
  willow: {
    title: "Willow Park House",
    image: "images/property-1.jpg",
    desc: "A contemporary detached home with open-plan interiors, private garden space and premium finishes.",
    beds: "4 Beds",
    baths: "3 Baths",
    size: "2,150 sqft",
    price: "£475,000"
  },
  skyline: {
    title: "Skyline Quarter",
    image: "images/property-2.jpg",
    desc: "A refined luxury apartment with modern interiors, city views and excellent access to local amenities.",
    beds: "2 Beds",
    baths: "2 Baths",
    size: "980 sqft",
    price: "£325,000"
  },
  oakbridge: {
    title: "Oakbridge House",
    image: "images/property-3.jpg",
    desc: "A spacious family home with elegant living areas, premium finishes and a calm residential setting.",
    beds: "5 Beds",
    baths: "4 Baths",
    size: "3,400 sqft",
    price: "£695,000"
  }
};

const modal = document.getElementById("propertyModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalBeds = document.getElementById("modalBeds");
const modalBaths = document.getElementById("modalBaths");
const modalSize = document.getElementById("modalSize");
const modalPrice = document.getElementById("modalPrice");
const modalCTA = document.getElementById("modalCTA");

function openModal(propertyId) {
  const property = properties[propertyId];

  if (!property || !modal) return;

  modalImage.src = property.image;
  modalTitle.textContent = property.title;
  modalDesc.textContent = property.desc;
  modalBeds.textContent = property.beds;
  modalBaths.textContent = property.baths;
  modalSize.textContent = property.size;
  modalPrice.textContent = property.price;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".modal-btn").forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.getAttribute("data-property"));
  });
});

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", closeModal);
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modalCTA) {
  modalCTA.addEventListener("click", closeModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});