import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += product.quantity || 1;
                return newCart;
            } else {
                return [...prevCart, { ...product, quantity: product.quantity || 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, amount) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.id === id) {
                    const newQuantity = Math.max(1, item.quantity + amount);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const cartTotal = cart.reduce((total, item) => {
        // Assume price is clean number. If stored as string, parse it.
        // We will store 'price' as number in addToCart call from DetailPage.
        const price = Number(item.price) || 0;
        return total + price * item.quantity;
    }, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
