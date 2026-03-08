const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");


let books = [];

// Load books from localStorage
const savedBooks = localStorage.getItem("books");
if (savedBooks) {
  books = JSON.parse(savedBooks);
}


if (books.length > 0){
  books.forEach(function(book){
  const bookDiv = document.createElement("div");
  
  bookDiv.innerHTML = "Title: " + book.title + " By: " + book.author + " Notes: " + book.notes + "<button>Delete</button>";
  
  // Add the book to the page
  bookList.appendChild(bookDiv);

  });
  }




bookForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const notes = document.getElementById("notes").value;

  // Create book object and add to array
  const newBook = {
    title: title,
    author: author,
    notes: notes
  };
  
  books.push(newBook);

  localStorage.setItem("books", JSON.stringify(books));

  // Create a new div element for the book(




  
  const deleteBtn = bookDiv.querySelector("button");
  deleteBtn.addEventListener("click", function() {
    bookDiv.remove();
  });
  
  // Clear the form
  bookForm.reset();
  console.log(books);

});