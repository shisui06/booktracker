const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");

let books = [];

function handleSubmit(e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const notes = document.getElementById("notes").value.trim();

  if (!title || !author) return;

  const newBook = {
    id: Date.now(),
    title,
    author,
    notes,
    read: false,
  };

  books.push(newBook);
  renderBooks();
  bookForm.reset();
}

function renderBook(book) {
  const bookEl = document.createElement("div");
  bookEl.classList.add("book");

  bookEl.innerHTML = `
    <strong>${book.title}</strong> by ${book.author} <br/>
    Notes: ${book.notes || 'None'} <br/>
    Status: ${book.read ? "Read" : "Not read"} <br/>
    <button data-id="${book.id}" class="toggle">Toggle Status</button>
    <button data-id="${book.id}" class="remove">Remove</button>
  `;

  bookList.appendChild(bookEl);
}

function renderBooks() {
  bookList.innerHTML = "";
  books.forEach(renderBook);
}

// Event listeners
bookForm.addEventListener("submit", handleSubmit);

bookList.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);
  if (e.target.classList.contains("remove")) {
    books = books.filter((book) => book.id !== id);
    renderBooks();
  }
  if (e.target.classList.contains("toggle")) {
    books = books.map((book) =>
      book.id === id ? { ...book, read: !book.read } : book
    );
    renderBooks();
  }
});
