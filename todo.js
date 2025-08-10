const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  const taskText = inputBox.value.trim(); // trim whitespace

  if (taskText === "") {
    alert("You must write something!!");
    return; // prevent adding empty tasks
  }

  let li = document.createElement("li");
  li.textContent = taskText;
  li.classList.add("white-text");

  let span = document.createElement("span");
  span.classList.add("white-text");
  span.textContent = "\u00d7"; // close symbol

  li.appendChild(span);
  listContainer.appendChild(li);

  inputBox.value = "";
  saveData();
  updateTaskCount();
  updateProgressBar();
}

// Attach one keydown event listener to input box to handle Enter key
inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
    updateProgressBar();
  }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
      updateTaskCount();
      updateProgressBar();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
      updateTaskCount();
      updateProgressBar();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
  updateTaskCount();
  updateProgressBar();
}

function updateTaskCount() {
  const tasks = listContainer.querySelectorAll("li");
  const taskCount = tasks.length;
  if (taskCount === 0) {
    console.log("no class");
  } else {
    console.log("Number of tasks:", taskCount);
  }
}

// On page load, show saved tasks
showTask();
