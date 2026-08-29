(function () {
  var toggleBtn = document.getElementById("theme-toggle");
  var iconEl = toggleBtn.querySelector(".theme-toggle-icon");
  var labelEl = toggleBtn.querySelector(".theme-toggle-label");

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateToggleButton(theme);
  }

  function updateToggleButton(theme) {
    if (theme === "dark") {
      iconEl.textContent = "☀️";
      labelEl.textContent = "Light Mode";
      toggleBtn.setAttribute("aria-label", "Switch to light mode");
    } else {
      iconEl.textContent = "🌙";
      labelEl.textContent = "Dark Mode";
      toggleBtn.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  toggleBtn.addEventListener("click", function () {
    var nextTheme = getTheme() === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });

  updateToggleButton(getTheme());
})();

(function () {
  var navLinks = document.querySelectorAll(".site-nav a");

  function setActiveLink(target) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link === target);
    });
  }

  function setActiveByHash() {
    var hash = window.location.hash || "#home";
    var target = document.querySelector('.site-nav a[href="' + hash + '"]');
    if (target) {
      setActiveLink(target);
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setActiveLink(link);
    });
  });

  window.addEventListener("hashchange", setActiveByHash);
  setActiveByHash();
})();
