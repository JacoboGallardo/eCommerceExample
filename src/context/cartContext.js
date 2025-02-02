import React, { createContext, useContext, useState, useEffect } from "react";
import { addItemToCart, fetchCartState, removeItemFromCart } from '../services/cartService'

const CartContext = createContext();

export function CartStatusProvider({ userId, children }) {
    const [cartState, setCartState] = useState({ cartQuantity: 0, cartItems: [], cartTotal: 0, cartId: undefined });

    console.log('Cart state is', cartState)

    useEffect(() => {
        const updateState = async () => {
            const newState = await fetchCartState(userId);
            console.log('Setting new cart state', newState)
            setCartState(newState)
        }

        updateState();

    }, [userId]);

    const removeItem = async ({ userId, productId, cartId }) => {
        await removeItemFromCart({ userId, productId, cartId })
        const newState = await fetchCartState(userId);
        setCartState(newState)
    }

    const addItem = async ({ userId, productId }) => {
        await addItemToCart({ userId, productId })
        const newState = await fetchCartState(userId);
        setCartState(newState)
    }

    return (
        <CartContext.Provider value={{ cartState, removeItem, addItem }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartState() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartState must be used within a CartStatusProvider");
    }
    return context;
}
