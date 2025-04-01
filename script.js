// Custom Cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");
const links = document.querySelectorAll("a, button");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  cursorFollower.style.left = e.clientX + "px";
  cursorFollower.style.top = e.clientY + "px";
});

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1.5)";
    cursorFollower.style.transform = "scale(1.5)";
  });

  link.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    cursorFollower.style.transform = "scale(1)";
  });
});

// Parallax Effect
const parallaxElements = document.querySelectorAll("[data-parallax]");

window.addEventListener("mousemove", (e) => {
  const { innerWidth: width, innerHeight: height } = window;
  const { clientX: x, clientY: y } = e;
  const xPos = (x / width - 0.5) * 2;
  const yPos = (y / height - 0.5) * 2;

  parallaxElements.forEach((el) => {
    const speed = el.dataset.parallax;
    el.style.transform = `translate3d(${xPos * speed * 10}px, ${
      yPos * speed * 10
    }px, 0)`;
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  themeToggle.querySelector("i").className =
    newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
});

// Set initial theme
const savedTheme =
  localStorage.getItem("theme") ||
  (prefersDarkScheme.matches ? "dark" : "light");
setTheme(savedTheme);
themeToggle.querySelector("i").className =
  savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

// Language Switcher
const langButtons = document.querySelectorAll(".lang-btn");
let currentLang = "pt";

const translations = {
  pt: {
    "nav-work": "Trabalhos",
    "nav-about": "Sobre",
    "nav-contact": "Contato",
    "hero-title": "Experiência Digital Criativa",
    "hero-subtitle": "Onde código e arte se encontram em perfeita harmonia",
    "cta-work": "Ver Trabalhos",
    "cta-contact": "Entre em Contato",
    "section-work": "Trabalhos Selecionados",
    "section-work-subtitle": "Criando experiências digitais que inspiram",
    "section-about": "Nossa Abordagem",
    "section-about-text":
      "Combinamos criatividade e tecnologia para criar experiências digitais significativas que ressoam com seu público.",
    "section-contact": "Vamos Criar Juntos",
    "section-contact-text":
      "Tem um projeto em mente? Adoraríamos ajudar a torná-lo realidade.",
  },
  en: {
    "nav-work": "Work",
    "nav-about": "About",
    "nav-contact": "Contact",
    "hero-title": "Creative Digital Experience",
    "hero-subtitle": "Where code meets art in perfect harmony",
    "cta-work": "View Our Work",
    "cta-contact": "Get in Touch",
    "section-work": "Selected Work",
    "section-work-subtitle": "Crafting digital experiences that inspire",
    "section-about": "Our Approach",
    "section-about-text":
      "We blend creativity with technology to create meaningful digital experiences that resonate with your audience.",
    "section-contact": "Let's Create Together",
    "section-contact-text":
      "Have a project in mind? We'd love to help bring it to life.",
  },
};

function switchLanguage(lang) {
  currentLang = lang;

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.dataset.translate;
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    if (lang !== currentLang) {
      switchLanguage(lang);
    }
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      if (entry.target.classList.contains("work-item")) {
        entry.target.style.transitionDelay = `${entry.target.dataset.delay}s`;
      }
    }
  });
}, observerOptions);

document
  .querySelectorAll(".work-item, .stat-item, .section-title, .large-text")
  .forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.dataset.delay = index * 0.2;
    observer.observe(el);
  });

// Contact Form
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  try {
    // Here you would typically send the data to a server
    console.log("Form submitted:", data);

    // Show success message
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = "Message Sent!";
    button.classList.add("success");

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("success");
      contactForm.reset();
    }, 3000);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  mobileMenu.classList.toggle("active");
});

// Header Scroll Effect
const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    // Scrolling down
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("scroll-down")
  ) {
    // Scrolling up
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

// Add mouse movement effect to hero section
const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");
const cards = document.querySelectorAll(".hero-3d-card");

hero.addEventListener("mousemove", (e) => {
  const { offsetWidth: width, offsetHeight: height } = hero;
  const { clientX, clientY } = e;

  const x = (clientX - width / 2) / width;
  const y = (clientY - height / 2) / height;

  heroContent.style.transform = `
        rotateY(${x * 5}deg)
        rotateX(${y * -5}deg)
        translateZ(10px)
    `;

  cards.forEach((card) => {
    const cardX = card.classList.contains("left") ? -x : x;
    card.style.transform = `
            perspective(1000px)
            rotateX(${y * 10}deg)
            rotateY(${cardX * 15}deg)
            translateZ(${Math.abs(x * 20)}px)
        `;
  });
});

hero.addEventListener("mouseleave", () => {
  heroContent.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0)";
  cards.forEach((card) => {
    card.style.transform = card.classList.contains("left")
      ? "perspective(1000px) rotateX(10deg) rotateY(10deg)"
      : "perspective(1000px) rotateX(-5deg) rotateY(-15deg)";
  });
});

// Scroll Progress Indicator
const scrollProgress = document.querySelector(".scroll-progress-bar");

window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = `${scrolled}%`;
});

// Work Section Filtering
const categoryFilters = document.querySelectorAll(".category-filter");
const workItems = document.querySelectorAll(".work-item");

categoryFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    // Update active filter
    categoryFilters.forEach((f) => f.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;

    workItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";

        setTimeout(() => {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 10);
        }, 300);
      } else {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";

        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// Enhanced Intersection Observer
const enhancedObserverOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const enhancedObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");

      // Animate numbers in stats
      if (entry.target.classList.contains("stat-number")) {
        const finalNumber = parseInt(entry.target.dataset.number);
        animateNumber(entry.target, finalNumber);
      }

      // Add delay for work items
      if (entry.target.classList.contains("work-item")) {
        entry.target.style.transitionDelay = `${entry.target.dataset.delay}s`;
      }
    }
  });
}, enhancedObserverOptions);

// Observe elements
document
  .querySelectorAll(
    ".work-item, .stat-item, .section-title, .section-header, .large-text, .stat-number"
  )
  .forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.dataset.delay = index * 0.2;
    enhancedObserver.observe(el);
  });

// Number animation function
function animateNumber(element, final) {
  let start = 0;
  const duration = 2000;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const current = Math.floor(progress * final);
    element.textContent = current;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = final;
    }
  };
  window.requestAnimationFrame(step);
}

// Enhanced Scroll Animation
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  parallaxElements.forEach((el) => {
    const speed = el.dataset.parallax;
    const yPos = -((scrolled * speed) / 5);
    el.style.transform = `translate3d(0, ${yPos}px, 0)`;
  });
});

// Work Item Hover Effect
workItems.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = item.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    item.style.transform = `
            perspective(1000px)
            rotateY(${x * 10}deg)
            rotateX(${y * -10}deg)
            translateZ(20px)
        `;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "none";
  });
});

// Work Slider
const initWorkSlider = () => {
  const slider = document.querySelector(".work-slider");
  const slides = document.querySelectorAll(".work-slide");
  const prevBtn = document.querySelector(".slider-nav.prev");
  const nextBtn = document.querySelector(".slider-nav.next");
  const dotsContainer = document.querySelector(".slider-dots");

  if (!slider || !slides.length) {
    console.warn("Slider or slides are missing");
    return;
  }

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Create dots if container exists
  if (dotsContainer) {
    dotsContainer.innerHTML = ""; // Clear existing dots
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.setAttribute("aria-selected", index === 0 ? "true" : "false");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    // Update slider position
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots if they exist
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
        dot.setAttribute(
          "aria-selected",
          index === currentSlide ? "true" : "false"
        );
      });
    }

    // Update buttons state if they exist
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;

    // Announce for screen readers
    const liveRegion =
      document.querySelector('[aria-live="polite"]') ||
      (() => {
        const region = document.createElement("div");
        region.setAttribute("aria-live", "polite");
        region.className = "sr-only";
        document.body.appendChild(region);
        return region;
      })();
    liveRegion.textContent = `Showing slide ${
      currentSlide + 1
    } of ${totalSlides}`;
  }

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentSlide = index;
    updateSlider();
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlider();
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  }

  // Event Listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      console.log("Previous clicked, current slide:", currentSlide); // Debug log
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      console.log("Next clicked, current slide:", currentSlide); // Debug log
    });
  }

  // Keyboard Navigation
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  // Touch Events
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  });

  // Initialize
  updateSlider();
  console.log("Slider initialized with", totalSlides, "slides"); // Debug log
};

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing slider..."); // Debug log
  initWorkSlider();
});

// Add CSS for screen reader only content
const style = document.createElement("style");
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
`;
document.head.appendChild(style);
