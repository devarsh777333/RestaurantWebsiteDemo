// Replace this placeholder with the restaurant's WhatsApp number (country code + number, digits only).
const WHATSAPP_NUMBER = "919999999999";

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Menu filters
const filterButtons = document.querySelectorAll(".menu-filter");
const menuCards = document.querySelectorAll(".menu-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    menuCards.forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

// Prevent selecting a past date for a table enquiry.
const guestDate = document.getElementById("guestDate");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
guestDate.min = localToday;

document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const guests = document.getElementById("guestCount").value;
  const date = guestDate.value;

  if (!name || !date) {
    alert("Please enter your name and preferred date.");
    return;
  }
  if (WHATSAPP_NUMBER === "919999999999") {
    alert("This is a demo. Open script.js and replace the placeholder WhatsApp number before testing enquiries.");
    return;
  }

  const message = `Hello Juniper Table! I'd like to enquire about a table. Name: ${name}. Guests: ${guests}. Preferred date: ${date}. Please confirm availability.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
