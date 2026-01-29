import { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

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

    const getCartTotal = () => {
        let totalKRW = 0;
        let totalUSD = 0;

        cart.forEach(item => {
            let pKRW = item.priceKRW;
            let pUSD = item.priceUSD;

            // Fallback: If prices are missing in cart item (old data), lookup in products
            if (pKRW === undefined || pUSD === undefined) {
                const productData = products.find(p => p.id === item.id);
                if (productData) {
                    pKRW = productData.priceKRW;
                    pUSD = productData.priceUSD;
                }
            }

            totalKRW += (pKRW || 0) * item.quantity;
            totalUSD += (pUSD || 0) * item.quantity;
        });

        return { totalKRW, totalUSD };
    };

    const { totalKRW: cartTotalKRW, totalUSD: cartTotalUSD } = getCartTotal();

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotalKRW, cartTotalUSD }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
