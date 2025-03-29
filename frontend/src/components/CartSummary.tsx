import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartSummary() {
  const { cartItems, getTotalPrice } = useCart();
  
  return (
    <div>
      <div>
        {cartItems.length === 0 ? (
          <div className="text-center p-4">
            <i className="bi bi-cart3 fs-1 text-muted"></i>
            <p className="mt-3">Your cart is empty</p>
          </div>
        ) : (
          <>
            <ul className="list-group list-group-flush mb-3">
              {cartItems.map(item => (
                <li key={item.book.bookID} className="list-group-item px-0 py-3 border-bottom">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="my-0 text-truncate" style={{ maxWidth: '200px' }}>{item.book.title}</h6>
                      <small className="text-muted d-block">Author: {item.book.author}</small>
                      <small className="text-muted d-block">Qty: {item.quantity} × ${item.book.price.toFixed(2)}</small>
                    </div>
                    <span className="text-primary fw-bold">${(item.book.price * item.quantity).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-3">
              <span className="fw-bold">Total</span>
              <span className="text-primary fw-bold fs-5">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between gap-2 mb-2">
              <Link to="/cart" className="btn btn-outline-primary flex-grow-1">
                View Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartSummary;