
const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");

let books = [];

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();

  if (!title || !author) return;

  const newBook = {
    id: Date.now(),
    title,
    author,
    read: false,
  };

  books.push(newBook);
  renderBooks();
  bookForm.reset();
});

function renderBooks() {
  bookList.innerHTML = "";

  books.forEach((book) => {
    const bookEl = document.createElement("div");
    bookEl.classList.add("book");

    bookEl.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} <br/>
      Status: ${book.read ? "Read" : "Not read"} <br/>
      <button data-id="${book.id}" class="toggle">Toggle Status</button>
      <button data-id="${book.id}" class="remove">Remove</button>
    `;

    bookList.appendChild(bookEl);
  });
}

// Event delegation for buttons inside book list
bookList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const id = Number(e.target.dataset.id);
    books = books.filter((book) => book.id !== id);
    renderBooks();
  }

  if (e.target.classList.contains("toggle")) {
    const id = Number(e.target.dataset.id);
    books = books.map((book) =>
      book.id === id ? { ...book, read: !book.read } : book
    );
    renderBooks();
  }
});
