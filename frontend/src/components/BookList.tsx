import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isSorted, setIsSorted] = useState<boolean>(false);
  
  const { addToCart, currentPage, setCurrentPage, cartItems } = useCart();
  const navigate = useNavigate();
  
  const isInCart = (bookId: number): boolean => {
    return cartItems.some(item => item.book.bookID === bookId);
  };

  const sortBooksByTitle = (
    books: Book[],
    direction: 'asc' | 'desc'
  ): Book[] => {
    return [...books].sort((a, b) => {
      if (direction === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  };

  const toggleSort = () => {
    const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newSortDirection);
    setIsSorted(true);
    setBooks(sortBooksByTitle(books, newSortDirection));
  };

  const handleAddToCart = (book: Book) => {
    addToCart(book);
    navigate('/cart');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join('&');
      try {
        setIsLoading(true);

        const sortParam = isSorted
          ? `&sortByTitle=true&sortDirection=${sortDirection}`
          : '';
        const response = await fetch(
          `https://localhost:5000/api/Book/AllProjects?pageHowMany=${pageSize}&pageNum=${currentPage}${sortParam}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setBooks(data.books);
        setTotalItems(data.totalNumBooks);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : String(err));
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [pageSize, currentPage, sortDirection, isSorted, selectedCategories]);

  return (
    <>
      {isLoading && <p>Loading books...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          <h4>Error loading books:</h4>
          <p>{error}</p>
          <p>Make sure the backend API is running on port 5000 with HTTPS.</p>
        </div>
      )}

      {!isLoading && !error && books.length === 0 && <p>No books found.</p>}
      <button onClick={toggleSort} className="btn btn-outline-primary">
        Sort by Title {sortDirection === 'asc' ? '↑' : '↓'}
      </button>
      <br/>
      <br/>
      {books.map((b) => (
        <div key={b.bookID} id="bookCard" className="card">
          <div className="d-flex justify-content-between align-items-start">
            <h3 className="card-title">{b.title}</h3>
            {/*  This has a badge using bootstrap that shows if an item is already in your cart at least once */}
            {isInCart(b.bookID) && (
              <span className="badge bg-success ms-2">In Cart</span>
            )}
          </div>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Page Count:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${b.price.toFixed(2)}
              </li>
            </ul>
            <button className="btn btn-primary" onClick={() => handleAddToCart(b)}>Add to Cart</button>
          </div>
        </div>
      ))}
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="5"> 5 </option>
          <option value="10"> 10 </option>
          <option value="20"> 20 </option>
        </select>
      </label>

    </>
  );
}

export default ProjectList;
