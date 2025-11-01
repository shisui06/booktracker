// Select DOM elements
const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");

// In-memory storage
let books = [];

// Render a single book
function renderBook(book) {
  const bookEl = document.createElement("div");
  bookEl.innerHTML = `
    <strong>${book.title}</strong> by ${book.author} <br/>
    Notes: ${book.notes || "None"} <br/>
    Status: ${book.read ? "Read" : "Not read"} <br/>
  `;
  bookList.appendChild(bookEl);
}

// Render all books
function renderBooks() {
  bookList.innerHTML = "";
  books.forEach(renderBook);
}
