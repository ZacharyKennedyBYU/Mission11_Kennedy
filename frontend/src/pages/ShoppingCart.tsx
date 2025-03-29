import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function ShoppingCart() {
    const { cartItems, getTotalPrice } = useCart();
    
    return(
        <div>
            <div className="bg-primary text-white shadow-sm mb-4">
                <div className="container">
                    <h2 className="mb-0 py-3">Shopping Cart</h2>
                </div>
            </div>
            
            <div className="container">
                {cartItems.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="mb-4">
                            <i className="bi bi-cart3 fs-1 text-muted"></i>
                        </div>
                        <p>Your cart is empty.</p>
                        <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
                    </div>
                ) : (
                    <>
                        <div className="table-responsive mb-4">
                            <table className="table">
                                <thead className="table-light">
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.book.bookID}>
                                            <td>{item.book.title}</td>
                                            <td>{item.book.author}</td>
                                            <td>${item.book.price.toFixed(2)}</td>
                                            <td>{item.quantity}</td>
                                            <td>${(item.book.price * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={4} className="text-end fw-bold">Total:</td>
                                        <td className="fw-bold">${getTotalPrice().toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="mb-5">
                            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ShoppingCart;