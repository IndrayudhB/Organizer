(function () {
  const listContainer = document.getElementById("list-container");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  // Function to update progress bar based on completed tasks
  function updateProgressBar() {
    const tasks = listContainer.querySelectorAll("li");
    if (tasks.length === 0) {
      progressBar.style.width = "0%";
      progressText.textContent = "0% Completed";
      return;
    }

    const completedTasks = listContainer.querySelectorAll("li.checked").length;
    const percent = Math.round((completedTasks / tasks.length) * 100);

    progressBar.style.width = percent + "%";
    progressText.textContent = percent + "% Completed";
  }

  // Listen for changes in the list to update progress accordingly
  // Your existing code toggles checked class on clicks and deletes tasks
  // We'll call updateProgressBar() after any such change

  // Because your existing listContainer event listener manages toggling checked and deleting:
  // Just hook into that event and update progress bar there
  listContainer.addEventListener("click", function () {
    updateProgressBar();
  });

  // Also update when tasks are added or shown via existing methods
  window.addEventListener("load", updateProgressBar);
  // You can also override your addTask and showTask functions or call this function after their calls.

  // To keep separation, we'll monkey patch existing saveData function if needed:
  // But better just call updateProgressBar manually after adding and showing tasks

  // For demonstration, just attach it globally so user can call it after adding/showing tasks
  window.updateProgressBar = updateProgressBar;
})();
