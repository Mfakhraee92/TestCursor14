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

(function () {
  var form = document.getElementById("contact-form");
  var successMsg = document.getElementById("form-success");

  var fields = [
    { id: "name", errorId: "name-error", message: "Please enter your name." },
    { id: "email", errorId: "email-error", message: "Please enter a valid email address." },
    { id: "subject", errorId: "subject-error", message: "Please select a subject." },
    { id: "message", errorId: "message-error", message: "Please enter a message." }
  ];

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateField(field) {
    var input = document.getElementById(field.id);
    var errorEl = document.getElementById(field.errorId);
    var value = input.value.trim();
    var isValid = true;

    if (field.id === "email") {
      isValid = value !== "" && validateEmail(value);
    } else {
      isValid = value !== "";
    }

    input.classList.toggle("invalid", !isValid);
    errorEl.textContent = isValid ? "" : field.message;
    return isValid;
  }

  fields.forEach(function (field) {
    var input = document.getElementById(field.id);
    input.addEventListener("input", function () {
      validateField(field);
    });
    input.addEventListener("blur", function () {
      validateField(field);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    successMsg.hidden = true;

    var allValid = fields.every(function (field) {
      return validateField(field);
    });

    if (allValid) {
      successMsg.hidden = false;
      form.reset();
      fields.forEach(function (field) {
        document.getElementById(field.id).classList.remove("invalid");
        document.getElementById(field.errorId).textContent = "";
      });
    }
  });
})();
