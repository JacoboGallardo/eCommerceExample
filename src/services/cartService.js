import axios from "axios";

export const fetchCartState = async (userId) => {
    try {
        if (userId) {
            const response = await axios.get(`http://localhost:4000/api/cart?user_id=${userId}`);
            return {
                cartItems: response.data.productsInCart,
                cartTotal: response.data.cartTotalPrice,
                cartId: response.data.cartId,
                cartQuantity: response.data.totalQuantity
            };
        }

    } catch (err) {
        console.error("Error fetching cart", err);
    }
};

export const removeItemFromCart = async ({ userId, productId, cartId }) => {
    try {
        await axios.post(`http://localhost:4000/api/cart/remove-item`, {
            user_id: userId,
            product_id: productId,
            cart_id: cartId,
        });
    } catch (err) {
        console.error("Error removing item from cart", err);
    }
}

export const addItemToCart = async ({ userId, productId }) => {
    await axios.post("http://localhost:4000/api/cart/add-item", {
        user_id: userId,
        product_id: productId,
        quantity: 1,
    });
}

export const checkoutCart = async (userId) => {
    await axios.post(`http://localhost:4000/api/cart/checkout`, {
        user_id: userId,
    });
}