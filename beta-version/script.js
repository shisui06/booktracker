// Get HTML elements
const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");

// Initialize books array
let books = [];

// Load saved books from localStorage
const savedBooks = localStorage.getItem("books");
if (savedBooks) {
  books = JSON.parse(savedBooks);
}

// Display saved books on page load
if (books.length > 0) { 
  books.forEach(function(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.innerHTML = "Title: " + book.title + " By: " + book.author + " Notes: " + book.notes + "<button data-id='" + book.id + "'>Delete</button>";
    bookList.appendChild(bookDiv);
    
    const deleteBtn = bookDiv.querySelector("button");
    
    deleteBtn.addEventListener("click", function() {
  
    const bookId = Number(deleteBtn.dataset.id);
    
    books = books.filter(function(book){
      return book.id !== bookId;
    });
    console.log("Deleting book with ID:", bookId);
    bookDiv.remove();
    localStorage.setItem("books", JSON.stringify(books));
    });
  
  });

}

// Handle form submission
bookForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Get input values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const notes = document.getElementById("notes").value;

  // Create book object with unique ID
  const newBook = {
    id: Date.now(),
    title: title,
    author: author,
    notes: notes
  };
  
  // Add to array and save to localStorage
  books.push(newBook);
  localStorage.setItem("books", JSON.stringify(books));

  // Display the new book
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.innerHTML = "Title: " + title + " By: " + author + " Notes: " + notes + "<button data-id='" + newBook.id + "'>Delete</button>";
  bookList.appendChild(bookDiv);

  // Set up delete button
  const deleteBtn = bookDiv.querySelector("button");
  deleteBtn.addEventListener("click", function() {;
    const bookId = Number(deleteBtn.dataset.id);
    
    books = books.filter(function(book){
      return book.id !== bookId;
      
    });
    localStorage.setItem("books", JSON.stringify(books));
    console.log("Deleting book with ID:" , bookId);
    bookDiv.remove();
  });
  
  // Clear form
  bookForm.reset();
});