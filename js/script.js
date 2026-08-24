// ==============================
// YOUR SALON - Main Script
// ==============================

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

// Service Prices
const servicePrices = {
  "Women's Haircut": "₹899 onwards",
  "Men's Haircut": "₹449 onwards",
  "Hair Spa": "₹1,299 onwards",
  "Global Hair Colour": "₹2,499 onwards",
  "Highlights / Balayage": "₹4,999 onwards",
  "Keratin Smoothening": "₹6,999 onwards",
  "Basic Facial": "₹999 onwards",
  "Cleanup & Detan": "₹799 onwards",
  "Manicure": "₹599 onwards",
  "Pedicure": "₹799 onwards",
  "Waxing": "₹349 onwards",
  "Threading": "₹49 onwards",
  "Bridal / Party Makeup": "₹8,999 onwards",
  "Other / Consultation": "Price on consultation"
};

// WhatsApp Form
const form = document.getElementById('whatsappForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const preferredDate = document.getElementById('preferredDate').value;
  const preferredTime = document.getElementById('preferredTime').value;
  const message = document.getElementById('message').value.trim();

  // Format date nicely (YYYY-MM-DD → DD MMM YYYY)
  let formattedDate = preferredDate;
  if (preferredDate) {
    const dateObj = new Date(preferredDate + 'T00:00:00');
    formattedDate = dateObj.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  // Format time (24h → 12h)
  let formattedTime = preferredTime;
  if (preferredTime) {
    const [hours, minutes] = preferredTime.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    formattedTime = `${hour12}:${minutes} ${ampm}`;
  }

  // Clean pre-written message (no broken emojis)
  let text = `Hi YOUR SALON!\n\n`;
  text += `*New Appointment Request*\n\n`;
  text += `*Name:* ${name}\n`;
  text += `*Phone:* ${phone}\n`;

  if (service) {
    text += `*Service:* ${service}\n`;
    const price = servicePrices[service] || "";
    if (price) {
      text += `*Price:* ${price}\n`;
    }
  }

  if (formattedDate) {
    text += `*Preferred Date:* ${formattedDate}\n`;
  }
  if (formattedTime) {
    text += `*Preferred Time:* ${formattedTime}\n`;
  }

  if (message) {
    text += `\n*Message:*\n${message}\n`;
  }

  text += `\nLooking forward to hearing from you!`;

  const encoded = encodeURIComponent(text);
  const whatsappURL = `https://wa.me/919211907631?text=${encoded}`;

  window.open(whatsappURL, '_blank');
});

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
  } else {
    header.style.boxShadow = 'none';
  }
});
