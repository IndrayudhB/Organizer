const btn = document.querySelector(".btn");
const warning = document.querySelector(".hero-text2");

function showWarning() {
  warning.style.display = "block";
}

function hideWarning() {
  warning.style.display = "none";
}

btn.addEventListener("mouseenter", showWarning);
btn.addEventListener("mouseleave", (e) => {
  // Only hide if moving outside warning
  if (!warning.contains(e.relatedTarget)) {
    hideWarning();
  }
});

warning.addEventListener("mouseenter", showWarning);
warning.addEventListener("mouseleave", (e) => {
  // Only hide if moving outside button
  if (!btn.contains(e.relatedTarget)) {
    hideWarning();
  }
});
