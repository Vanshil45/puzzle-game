import { useState, useEffect } from 'react';
import axios from 'axios';

function Books() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  useEffect(() => {
    async function fetchBooks() {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    }
    fetchBooks();
  }, []);

  const addBook = async () => {
    const response = await axios.post('/api/books', newBook);
    setBooks([...books, response.data]);
    setNewBook({ title: '', author: '' });
  };

  return (
    <div>
      <h1>Book Catalog</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>
      <div>
        <input 
          type="text" 
          placeholder="Title" 
          value={newBook.title} 
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Author" 
          value={newBook.author} 
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <button onClick={addBook}>Add Book</button>
      </div>
    </div>
  );
}

export default Books;
