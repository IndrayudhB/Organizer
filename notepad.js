let color = document.getElementById("color");
let createBtn = document.getElementById("createButton");
let list = document.getElementById("list");

// Load saved notes on page load
window.onload = () => {
  let savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
  savedNotes.forEach((noteData) => {
    createNote(noteData.content, noteData.color, noteData.position);
  });
};

// Create a new note element with content, border color, and position
function createNote(
  text = "",
  borderColor = "#000",
  position = { x: 500, y: 75 }
) {
  let newNote = document.createElement("div");
  newNote.classList.add("note");
  newNote.style.borderColor = borderColor;
  newNote.style.position = "absolute";
  newNote.style.left = position.x + "px";
  newNote.style.top = position.y + "px";
  newNote.innerHTML = `
    <span class="close">x</span>
    <textarea placeholder="Write Content......" rows="10" cols="30">${text}</textarea>`;

  // Append to list container
  list.appendChild(newNote);

  // Remove note on close click
  newNote.querySelector(".close").onclick = () => {
    newNote.remove();
    saveNotes();
  };

  // Save notes on textarea input
  newNote.querySelector("textarea").addEventListener("input", () => {
    saveNotes();
  });

  // Make note draggable
  makeDraggable(newNote);
}

// Save all notes state (content, color, position) to localStorage
function saveNotes() {
  let notesData = [];
  document.querySelectorAll(".note").forEach((note) => {
    let text = note.querySelector("textarea").value;
    let color = note.style.borderColor;
    let position = {
      x: parseInt(note.style.left) || 0,
      y: parseInt(note.style.top) || 0,
    };
    notesData.push({ content: text, color: color, position: position });
  });
  localStorage.setItem("notes", JSON.stringify(notesData));
}

// Add drag & drop functionality to a note element
function makeDraggable(element) {
  let cursor = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };
  let isDragging = false;

  element.addEventListener("mousedown", (e) => {
    // Only drag when clicking outside the textarea or close button to avoid input issues
    if (e.target.tagName === "TEXTAREA" || e.target.classList.contains("close"))
      return;

    isDragging = true;
    cursor = {
      x: e.clientX,
      y: e.clientY,
    };
    pos = {
      x: parseInt(element.style.left) || 0,
      y: parseInt(element.style.top) || 0,
    };
    element.style.cursor = "grabbing";
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    let dx = e.clientX - cursor.x;
    let dy = e.clientY - cursor.y;

    element.style.left = pos.x + dx + "px";
    element.style.top = pos.y + dy + "px";
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      element.style.cursor = "grab";
      saveNotes();
    }
  });

  element.style.cursor = "grab";
}

// Create new note button click
createBtn.onclick = () => {
  createNote("", color.value);
  saveNotes();
};
