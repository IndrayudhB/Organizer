document.getElementById("downloadNotesBtn").onclick = function () {
  // Collect all notepad note texts (from .note textarea elements)
  let notes = [];
  document.querySelectorAll(".note textarea").forEach((textarea, idx) => {
    notes.push(`Note ${idx + 1}: ${textarea.value.trim()}`);
  });

  // Format notes as plain text
  let textContent = "Notes:\n" + notes.join("\n---\n");

  // Create the .txt file and download
  let blob = new Blob([textContent], { type: "text/plain" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "notepad-notes.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
