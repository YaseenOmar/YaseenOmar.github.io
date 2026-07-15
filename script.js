/**
 * Yaseen Zaqut - Personal Portfolio JavaScript Code
 * Features: Typewriter animation, mobile drawer menu, form validation, project filters, scroll animations
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  
  /* ==========================================================================
     1. AUTOMATIC COPYRIGHT YEAR
     ========================================================================== */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. HEADER SCROLL STATE
     ========================================================================== */
  const header = document.getElementById("header");
  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  
  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll(); // Trigger initially on load

  /* ==========================================================================
     3. MOBILE NAVIGATION MENU
     ========================================================================== */
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  const toggleMenu = (forceClose = false) => {
    if (!menuToggle || !mobileNav) return;
    
    const isOpen = forceClose ? false : !mobileNav.classList.contains("open");
    
    menuToggle.classList.toggle("open", isOpen);
    mobileNav.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    mobileNav.setAttribute("aria-hidden", !isOpen);
    
    // Toggle body scrolling to prevent content scroll behind open drawer
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => toggleMenu());
  }

  // Close mobile menu when clicking nav links
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => toggleMenu(true));
  });

  // Close menu when pressing escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav && mobileNav.classList.contains("open")) {
      toggleMenu(true);
    }
  });

  /* ==========================================================================
     4. HERO TYPING ANIMATION
     ========================================================================== */
  const typingTextElement = document.getElementById("typing-text");
  const roles = [
    "Software Engineer",
    "Mobile App Developer"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let typingTimeout = null;

  const typeEffect = () => {
    if (!typingTextElement) return;

    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Remove character
      typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deleting speed
    } else {
      // Add character
      typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    // Handles logic rules for word switching delays
    if (!isDeleting && charIndex === currentRole.length) {
      // Word completed, pause before deleting
      typingSpeed = 2000; 
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    typingTimeout = setTimeout(typeEffect, typingSpeed);
  };

  // Prevent typing animation if user prefers reduced motion
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!motionQuery.matches) {
    typeEffect();
  } else if (typingTextElement) {
    typingTextElement.textContent = roles[0];
  }

  /* ==========================================================================
     5. INTERSECTION OBSERVER FOR ACTIVE NAV SECTIONS
     ========================================================================== */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".desktop-nav .nav-link");

  const options = {
    root: null,
    threshold: 0.25, // Active when at least 25% of the section is visible
    rootMargin: "-80px 0px 0px 0px" // Account for fixed header
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  };

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(observerCallback, options);
    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ==========================================================================
     6. INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
     ========================================================================== */
  const revealItems = document.querySelectorAll(".reveal-item");
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  };

  if ("IntersectionObserver" in window && revealItems.length > 0) {
    const revealObserver = new IntersectionObserver(revealCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealItems.forEach(item => item.classList.add("revealed"));
  }

  /* ==========================================================================
     7. PORTFOLIO FILTER SYSTEM
     ========================================================================== */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active filter button style
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const categories = card.getAttribute("data-categories").split(" ");
        
        if (filterValue === "all" || categories.includes(filterValue)) {
          // Show project card
          card.style.display = "flex";
          // Small animation delay trigger
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          // Hide project card
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          // Set display none after opacity animation finishes
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     8. BACK TO TOP BUTTON VISIBILITY
     ========================================================================== */
  const backToTopBtn = document.querySelector(".back-to-top-btn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.pointerEvents = "auto";
      } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.pointerEvents = "none";
      }
    });
  }

  /* ==========================================================================
     9. CONTACT FORM CLIENT-SIDE VALIDATION & SPAM HONEYPOT
     ========================================================================== */
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("form-name");
  const emailInput = document.getElementById("form-email");
  const subjectInput = document.getElementById("form-subject");
  const messageInput = document.getElementById("form-message");
  const submitBtn = document.getElementById("submit-btn");
  
  // Alert boxes
  const successAlert = document.getElementById("form-success-alert");
  const errorAlert = document.getElementById("form-error-alert");

  // Custom regex pattern for emails
  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Helper to show errors
  const showError = (inputElement, errorElementId, message) => {
    inputElement.classList.add("invalid");
    const errorSpan = document.getElementById(errorElementId);
    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.style.display = "block";
    }
  };

  // Helper to clear errors
  const clearError = (inputElement, errorElementId) => {
    inputElement.classList.remove("invalid");
    const errorSpan = document.getElementById(errorElementId);
    if (errorSpan) {
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
    }
  };

  // Input listeners to clear errors on type
  if (nameInput) nameInput.addEventListener("input", () => clearError(nameInput, "name-error"));
  if (emailInput) emailInput.addEventListener("input", () => clearError(emailInput, "email-error"));
  if (subjectInput) subjectInput.addEventListener("input", () => clearError(subjectInput, "subject-error"));
  if (messageInput) messageInput.addEventListener("input", () => clearError(messageInput, "message-error"));

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      let isFormValid = true;
      
      // Clear previous alerts
      if (successAlert) successAlert.classList.remove("visible");
      if (errorAlert) errorAlert.classList.remove("visible");

      // Validate Name
      if (nameInput && nameInput.value.trim() === "") {
        showError(nameInput, "name-error", "Please tell me your name so I know who I'm talking to.");
        isFormValid = false;
      }

      // Validate Email
      if (emailInput) {
        const val = emailInput.value.trim();
        if (val === "") {
          showError(emailInput, "email-error", "An email address is required so I can reply back.");
          isFormValid = false;
        } else if (!isValidEmail(val)) {
          showError(emailInput, "email-error", "That doesn't look like a valid email format.");
          isFormValid = false;
        }
      }

      // Validate Subject
      if (subjectInput && subjectInput.value.trim() === "") {
        showError(subjectInput, "subject-error", "Please add a subject heading for your query.");
        isFormValid = false;
      }

      // Validate Message
      if (messageInput && messageInput.value.trim() === "") {
        showError(messageInput, "message-error", "Please type in details of what you'd like to build.");
        isFormValid = false;
      }

      if (!isFormValid) return; // Halt if local validation fails

      // Honeypot anti-spam check
      const gotchaInput = document.getElementById("form-gotcha");
      if (gotchaInput && gotchaInput.value.trim() !== "") {
        // Silently swallow submission (looks successful to spambots, does not trigger network)
        console.warn("Spambot trigger detected.");
        if (submitBtn) submitBtn.classList.add("loading");
        setTimeout(() => {
          if (submitBtn) submitBtn.classList.remove("loading");
          if (successAlert) successAlert.classList.add("visible");
          contactForm.reset();
        }, 1000);
        return;
      }

      // If validation passes, handle submission
      const actionUrl = contactForm.getAttribute("action");
      
      // Add loading state
      if (submitBtn) submitBtn.classList.add("loading");
      
      if (actionUrl && actionUrl.includes("placeholder-id")) {
        // DEMO Fallback: If no real Formspree endpoint token is configured, simulate successfully sending
        setTimeout(() => {
          if (submitBtn) submitBtn.classList.remove("loading");
          if (successAlert) {
            successAlert.classList.add("visible");
            // Change message content to notify developer
            successAlert.querySelector(".alert-text").innerHTML = `
              <strong>Validation Successful (Demo Mode)!</strong> Your message was validated correctly.
              <br><small style="opacity: 0.85;">Note: To receive actual emails, replace the form action endpoint with your real Formspree ID in <code>index.html</code>.</small>
            `;
          }
          contactForm.reset();
        }, 1500);
      } else {
        // Real Formspree AJAX Submission
        const formData = new FormData(contactForm);
        
        fetch(actionUrl, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (submitBtn) submitBtn.classList.remove("loading");
          if (response.ok) {
            if (successAlert) successAlert.classList.add("visible");
            contactForm.reset();
          } else {
            response.json().then(data => {
              if (errorAlert) {
                errorAlert.classList.add("visible");
                if (data.error) {
                  errorAlert.querySelector(".alert-text").innerHTML = `<strong>Submission Error!</strong> ${data.error}`;
                }
              }
            });
          }
        })
        .catch(err => {
          console.error("Submission fetch error: ", err);
          if (submitBtn) submitBtn.classList.remove("loading");
          if (errorAlert) {
            errorAlert.classList.add("visible");
            errorAlert.querySelector(".alert-text").innerHTML = "<strong>Network Error!</strong> Could not send form. Please check your connection or write directly to the email listed.";
          }
        });
      }
    });
  }
});
