document.addEventListener("DOMContentLoaded", () => {
  // 1. DARK MODE TOGGLE
  const themeToggleBtn = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
      themeToggleBtn.textContent = "☀️ Light Mode";
    }
  }

  themeToggleBtn.addEventListener("click", () => {
    let theme = document.documentElement.getAttribute("data-theme");
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      themeToggleBtn.textContent = "🌙 Dark Mode";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeToggleBtn.textContent = "☀️ Light Mode";
    }
  });

  // 2. INTERACTIVE MAP (LEAFLET.JS)
  const map = L.map("map").setView([31.5204, 74.3587], 7); // Default Lahore

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  let marker = L.marker([31.5204, 74.3587]).addTo(map)
    .bindPopup("Lahore, Pakistan")
    .openPopup();

  // TIMELINE CARD CLICK TO UPDATE MAP
  const timelineCards = document.querySelectorAll(".timeline-card");
  timelineCards.forEach(card => {
    card.addEventListener("click", () => {
      const lat = parseFloat(card.getAttribute("data-lat"));
      const lng = parseFloat(card.getAttribute("data-lng"));
      const location = card.getAttribute("data-location");

      map.flyTo([lat, lng], 10, { duration: 1.5 });

      if (marker) map.removeLayer(marker);
      marker = L.marker([lat, lng]).addTo(map)
        .bindPopup(`<b>${location}</b>`)
        .openPopup();
    });
  });

  // 3. PROJECT MODAL
  const modal = document.getElementById("project-modal");
  const closeModalBtns = document.querySelectorAll(".close-modal, .close-btn");
  const viewProjectBtns = document.querySelectorAll(".view-project-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");

  const projectData = {
    "Culinary Canvas": "Full-stack web application featuring recipe labs, chef masterclasses with video streaming, and user registration forms.",
    "RoadRescue AI": "React Native application built with MapView and custom APIs to connect drivers with roadside assistance in real time.",
    "FitCrew": "Full-stack application created with Express, Node.js, and SQLite/MongoDB for fitness tracking and client management."
  };

  viewProjectBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".project-card");
      const title = card.querySelector("h3").textContent;
      modalTitle.textContent = title;
      modalDesc.textContent = projectData[title] || "Detailed description coming soon.";
      modal.style.display = "flex";
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});