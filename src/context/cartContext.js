import React, { createContext, useContext, useState, useEffect } from "react";
import { addItemToCart, fetchCartState, removeItemFromCart, checkoutCart } from '../services/cartService'

const CartContext = createContext();
const INITIAL_EMPTY_CART_STATE = { cartQuantity: 0, cartItems: [], cartTotal: 0, cartId: undefined }

export function CartStatusProvider({ userId, children }) {
    const [cartState, setCartState] = useState(INITIAL_EMPTY_CART_STATE);

    console.log('Cart state is', cartState)

    useEffect(() => {
        const updateState = async () => {
            const newState = await fetchCartState(userId);
            if (!newState) {
                setCartState(INITIAL_EMPTY_CART_STATE);
                return;
            }
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

    const checkout = async (userId) => {
        await checkoutCart(userId);
        setCartState(INITIAL_EMPTY_CART_STATE)
    }

    return (
        <CartContext.Provider value={{ cartState, removeItem, addItem, checkout }}>
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
