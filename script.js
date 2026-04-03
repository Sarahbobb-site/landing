// ===== NAVIGATION =====
const navMenu = document.getElementById("nav-menu")
const navToggle = document.getElementById("nav-toggle")
const navClose = document.getElementById("nav-close")

// Menu show
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
  })
}

// Menu hidden
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
}

// Remove menu mobile
const navLinks = document.querySelectorAll(".nav__link")

function linkAction() {
  navMenu.classList.remove("show-menu")
}
navLinks.forEach((n) => n.addEventListener("click", linkAction))

// ===== SCROLL HEADER =====
function scrollHeader() {
  const header = document.getElementById("header")
  if (this.scrollY >= 50) header.classList.add("scroll-header")
  else header.classList.remove("scroll-header")
}
window.addEventListener("scroll", scrollHeader)

// ===== ACTIVE LINK =====
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 100
    const sectionId = current.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      const activeLink = document.querySelector(".nav__menu a[href*=" + sectionId + "]")
      if (activeLink) {
        document.querySelectorAll(".nav__link").forEach((link) => link.classList.remove("active-link"))
        activeLink.classList.add("active-link")
      }
    }
  })
}
window.addEventListener("scroll", scrollActive)

// ===== BACK TO TOP =====
function scrollTop() {
  const scrollTop = document.getElementById("back-to-top")
  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll")
  else scrollTop.classList.remove("show-scroll")
}
window.addEventListener("scroll", scrollTop)

// ===== BACK TO TOP CLICK EVENT =====
const backToTopButton = document.getElementById("back-to-top")
if (backToTopButton) {
  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show")
    }
  })
}, observerOptions)

// Observe all elements with animation classes
document.querySelectorAll(".animate-slide-up").forEach((el) => {
  observer.observe(el)
})

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll(".stat-card__number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 80
    let current = 0

    const easeOutQuad = (t) => t * (2 - t)

    const updateCounter = () => {
      if (current < target) {
        current += increment
        const progress = Math.min(current / target, 1)
        const easedValue = Math.ceil(easeOutQuad(progress) * target)
        counter.textContent = easedValue
        setTimeout(updateCounter, 25)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector(".hero")
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters()
      counterObserver.unobserve(entry.target)
    }
  })
})

if (heroSection) {
  counterObserver.observe(heroSection)
}

// ===== PARTICLES ANIMATION =====
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  if (!particlesContainer) return

  const particleCount = window.innerWidth <= 768 ? 30 : 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random position
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"

    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + "s"
    particle.style.animationDuration = Math.random() * 3 + 3 + "s"

    particlesContainer.appendChild(particle)
  }
}

// Create particles when page loads
document.addEventListener("DOMContentLoaded", createParticles)

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// ===== FORM HANDLING =====
const newsletterForm = document.querySelector(".footer__newsletter-form")
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const email = this.querySelector('input[type="email"]').value

    // Simple email validation
    if (email && email.includes("@")) {
      alert("Merci pour votre inscription ! Vous recevrez bientôt mes conseils LinkedIn.")
      this.reset()
    } else {
      alert("Veuillez entrer une adresse email valide.")
    }
  })
}

// ===== LOADING ANIMATION =====
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// ===== IMPROVED PARALLAX EFFECT =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero__floating-icon")

  if (window.innerWidth > 768) {
    parallaxElements.forEach((element, index) => {
      const speed = 0.1 + index * 0.05
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  }
})

// ===== MOBILE OPTIMIZATIONS =====
function handleMobileOptimizations() {
  const isMobile = window.innerWidth <= 768

  if (isMobile) {
    // Disable parallax on mobile for better performance
    const parallaxElements = document.querySelectorAll(".hero__floating-icon")
    parallaxElements.forEach((element) => {
      element.style.transform = "none"
    })

    // Reduce particles on mobile
    const particles = document.querySelectorAll(".particle")
    particles.forEach((particle, index) => {
      if (index > 20) {
        particle.style.display = "none"
      }
    })
  }
}

// Run mobile optimizations on load and resize
window.addEventListener("load", handleMobileOptimizations)
window.addEventListener("resize", handleMobileOptimizations)

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
const debouncedScrollHeader = debounce(scrollHeader, 10)
const debouncedScrollActive = debounce(scrollActive, 10)
const debouncedScrollTop = debounce(scrollTop, 10)

window.removeEventListener("scroll", scrollHeader)
window.removeEventListener("scroll", scrollActive)
window.removeEventListener("scroll", scrollTop)

window.addEventListener("scroll", debouncedScrollHeader)
window.addEventListener("scroll", debouncedScrollActive)
window.addEventListener("scroll", debouncedScrollTop)

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Focus management for mobile menu
if (navMenu) {
  const focusableElements = navMenu.querySelectorAll("a, button")
  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]

  navMenu.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus()
          e.preventDefault()
        }
      }
    }

    if (e.key === "Escape") {
      navMenu.classList.remove("show-menu")
      if (navToggle) navToggle.focus()
    }
  })
}

// ===== PRELOAD CRITICAL RESOURCES =====
function preloadCriticalResources() {
  const criticalImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PP-LdAzqbpFBKRXPvKRI3gZNQwqY21jJc.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fond.png-KSJGgSnZuF84G2N0mD0WEkq21BJN7R.jpeg",
  ]

  criticalImages.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  })
}

// Preload resources when page loads
document.addEventListener("DOMContentLoaded", preloadCriticalResources)

// ===== ENHANCED FLOATING ICONS ANIMATION =====
function enhanceFloatingIcons() {
  const floatingIcons = document.querySelectorAll(".hero__floating-icon")

  floatingIcons.forEach((icon, index) => {
    // Add random rotation on hover
    icon.addEventListener("mouseenter", () => {
      icon.style.transform += " rotate(15deg) scale(1.1)"
    })

    icon.addEventListener("mouseleave", () => {
      icon.style.transform = icon.style.transform.replace(" rotate(15deg) scale(1.1)", "")
    })
  })
}

// Initialize enhanced animations
document.addEventListener("DOMContentLoaded", enhanceFloatingIcons)

// ===== HORIZONTAL SCROLL ON SCROLL (CLIENTS) =====
function initClientsHorizontalScroll() {
  const section = document.querySelector(".clients")
  const track = document.getElementById("clients-track")
  const progressBar = document.getElementById("clients-progress")
  const counterEl = document.getElementById("clients-current")
  const slides = document.querySelectorAll(".client-slide")

  if (!section || !track || slides.length === 0) return

  const totalSlides = slides.length

  function updateScroll() {
    const rect = section.getBoundingClientRect()
    const sectionHeight = section.offsetHeight
    const viewportHeight = window.innerHeight

    const scrolled = -rect.top
    const maxScroll = sectionHeight - viewportHeight

    if (maxScroll <= 0) return

    const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1)

    // Each slide is 100vw wide, so total translate = (totalSlides - 1) * 100vw
    const maxTranslate = (totalSlides - 1) * window.innerWidth
    const translateX = progress * maxTranslate
    track.style.transform = `translateX(-${translateX}px)`

    // Update counter
    const currentIndex = Math.min(Math.floor(progress * totalSlides), totalSlides - 1)
    if (counterEl) {
      counterEl.textContent = currentIndex + 1
    }

    // Update progress bar
    if (progressBar) {
      progressBar.style.width = `${progress * 100}%`
    }
  }

  window.addEventListener("scroll", updateScroll, { passive: true })
  window.addEventListener("resize", updateScroll, { passive: true })
  updateScroll()
}

document.addEventListener("DOMContentLoaded", initClientsHorizontalScroll)
