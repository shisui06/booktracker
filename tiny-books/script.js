
const form = document.getElementById("noteForm");
const input = document.getElementById("noteInput");
const list = document.getElementById("notesList");

let notes = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();

  if (text) {
    const note = {
      id: Date.now(),
      content: text,
    };

    notes.push(note);
    renderNotes();
    input.value = "";
  }
});

function renderNotes() {
  list.innerHTML = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note.content;
    li.dataset.id = note.id;

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.addEventListener("click", deleteNote);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function deleteNote(e) {
  const idToDelete = e.target.parentElement.dataset.id;
  notes = notes.filter((note) => note.id != idToDelete);
  renderNotes();
}
