import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartStatusProvider({ children }) {
    const [cartQuantity, setCartQuantity] = useState(0);

    return (
        <CartContext.Provider value={{ cartQuantity, setCartQuantity }}>
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
