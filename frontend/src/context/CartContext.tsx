import { createContext, useState, ReactNode, useContext } from 'react';
import { Book } from '../types/Book';

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book) => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  selectedCategories: string[];
  currentPage: number;
  setSelectedCategories: (categories: string[]) => void;
  setCurrentPage: (page: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const addToCart = (book: Book) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.book.bookID === book.bookID);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.book.bookID === book.bookID 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { book, quantity: 1 }];
      }
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      getTotalPrice, 
      getItemCount,
      selectedCategories,
      currentPage,
      setSelectedCategories,
      setCurrentPage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};