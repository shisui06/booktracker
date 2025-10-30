const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://apou01:admin@cluster0.afy4tzh.mongodb.net/?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Book schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  notes: { type: String, default: '' },
  read: { type: Boolean, default: false },
});

const Book = mongoose.model('Book', bookSchema);

// Routes
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ _id: 1 });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

app.post('/books', async (req, res) => {
  const { title, author, notes } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  try {
    const newBook = new Book({ title, author, notes: notes || '', read: false });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add book' });
  }
});

app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, { read }, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
