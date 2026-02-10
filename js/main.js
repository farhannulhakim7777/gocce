// Navbar scroll effect
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle')
const navLinks = document.getElementById('navLinks')

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active')
  navLinks.classList.toggle('active')
})

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active')
    navLinks.classList.remove('active')
  })
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  })
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up')
    }
  })
}, observerOptions)

// Observe elements
document
  .querySelectorAll('.menu-card, .customer-card, .service-card, .gallery-item')
  .forEach(el => {
    observer.observe(el)
  })

// Gallery item hover effect with dynamic content
const galleryItems = document.querySelectorAll('.gallery-item')
galleryItems.forEach(item => {
  item.addEventListener('mouseenter', function () {
    this.style.zIndex = '10'
  })
  item.addEventListener('mouseleave', function () {
    this.style.zIndex = '1'
  })
})

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect()
    const ripple = document.createElement('span')
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    ripple.classList.add('ripple')

    this.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  })
})

// Reservation Modal
const openModalBtn = document.getElementById('openReservationModal')
const closeModalBtn = document.getElementById('closeModal')
const modalOverlay = document.getElementById('reservationModal')
const reservationForm = document.getElementById('reservationForm')

// Open modal
openModalBtn.addEventListener('click', () => {
  modalOverlay.classList.add('active')
  document.body.style.overflow = 'hidden' // Prevent scrolling
})

// Close modal
const closeModal = () => {
  modalOverlay.classList.remove('active')
  document.body.style.overflow = '' // Enable scrolling
}

closeModalBtn.addEventListener('click', closeModal)

// Close modal when clicking outside
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) {
    closeModal()
  }
})

// Close modal with ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal()
  }
})

// Handle form submission
reservationForm.addEventListener('submit', e => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(reservationForm)
  const name = formData.get('fullName')
  const phone = formData.get('phone')
  const date = formData.get('date')
  const time = formData.get('time')
  const guests = formData.get('guests')
  const notes = formData.get('notes') || '-'

  // Format date to readable format (DD/MM/YYYY)
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  // Format WhatsApp message with beautiful template
  const message =
    ` *Reservation Request* %0A%0A` +
    `*Name:* ${name}%0A` +
    `*Phone:* ${phone}%0A` +
    `*Date:* ${formattedDate}%0A` +
    `*Time:* ${time}%0A` +
    `*Guests:* ${guests}%0A` +
    `*Special Requests:* ${notes}%0A%0A` +
    `Thank you for choosing GOCCE Coffee! ☕✨`

  // WhatsApp number (nomor café GOCCE)
  const waNumber = '6281316046854' // Format: 62 + nomor tanpa 0

  // Open WhatsApp
  window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank')

  // Close modal and reset form
  closeModal()
  reservationForm.reset()

  // Optional: Show success message
  setTimeout(() => {
    alert(
      '✅ Terima kasih! Anda akan diarahkan ke WhatsApp untuk konfirmasi reservasi.'
    )
  }, 300)
})


const textToType = 'Share Stories, Taste Conversations';
const typingSpeed = 80;
const deletingSpeed = 50;
const pauseBetweenCycles = 2000;

let currentIndex = 0;
let isDeleting = false;

const typingTextElement = document.querySelector('.typing-text');

function typeAndDelete() {
  if (!typingTextElement) return;

  if (!isDeleting) {
    if (currentIndex < textToType.length) {
      typingTextElement.textContent = textToType.substring(0, currentIndex + 1);
      currentIndex++;
      setTimeout(typeAndDelete, typingSpeed);
    } else {
      isDeleting = true;
      setTimeout(typeAndDelete, pauseBetweenCycles);
    }
  } else {
    if (currentIndex > 0) {
      typingTextElement.textContent = textToType.substring(0, currentIndex - 1);
      currentIndex--;
      setTimeout(typeAndDelete, deletingSpeed);
    } else {
      isDeleting = false;
      setTimeout(typeAndDelete, 500);
    }
  }
}

document.addEventListener('DOMContentLoaded', typeAndDelete);