const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");

let books = [];

async function fetchBooks() {
  try {
    const response = await fetch('/books');
    if (!response.ok) throw new Error('Failed to fetch books');
    books = await response.json();
    renderBooks();
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

async function addBook(bookData) {
  try {
    const response = await fetch('/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) throw new Error('Failed to add book');
    const newBook = await response.json();
    books.push(newBook);
    renderBooks();
  } catch (error) {
    console.error('Error adding book:', error);
  }
}

async function updateBook(id, updates) {
  try {
    const response = await fetch(`/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update book');
    const updatedBook = await response.json();
    books = books.map(book => book.id === id ? updatedBook : book);
    renderBooks();
  } catch (error) {
    console.error('Error updating book:', error);
  }
}

async function deleteBook(id) {
  try {
    const response = await fetch(`/books/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete book');
    books = books.filter(book => book.id !== id);
    renderBooks();
  } catch (error) {
    console.error('Error deleting book:', error);
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const notes = document.getElementById("notes").value.trim();

  if (!title || !author) return;

  const newBook = { title, author, notes };
  addBook(newBook);
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
    deleteBook(id);
  }
  if (e.target.classList.contains("toggle")) {
    const book = books.find(b => b.id === id);
    if (book) updateBook(id, { read: !book.read });
  }
});

// Load books on page load
fetchBooks();
