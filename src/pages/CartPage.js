import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";

function CartPage() {
  const [cartState, setCartState] = useState({ cartItems: [], cartTotal: 0, cartId: undefined });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId"); // Get user ID from storage
      console.log("userId", userId);
      try {
        const response = await axios.get(`http://localhost:4000/api/cart?user_id=${userId}`);
        setCartState({
          cartItems: response.data.productsInCart,
          cartTotal: response.data.cartTotalPrice,
          cartId: response.data.cartId,
        });
      } catch (err) {
        console.error("Error fetching cart items", err);
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId");
    try {
      await axios.post("http://localhost:3000/api/cart/checkout", { user_id: userId });
      navigate("/orders");
    } catch (err) {
      console.error("Error during checkout", err);
    }
  };

  const handleRemoveItem = async (productId, cartId) => {
    const userId = localStorage.getItem("userId");
    try {
      await axios.post(`http://localhost:4000/api/cart/remove-item`, {
        user_id: userId,
        product_id: productId,
        cart_id: cartId,
      });
      const response = await axios.get(`http://localhost:4000/api/cart?user_id=${userId}`);
      setCartState({
        cartItems: response.data.productsInCart,
        cartTotal: response.data.cartTotalPrice,
        cartId: response.data.cartId,
      });
    } catch (err) {
      console.error("Error removing item from cart", err);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartState.cartItems.length === 0 ? (
        <Typography>No items in cart</Typography>
      ) : (
        <Box>
          {cartState.cartItems.map((item) => (
            <CartItem key={item.id} {...item} handleRemoveItem={handleRemoveItem} cartId={cartState.cartId} />
          ))}
        </Box>
      )}
      <Typography variant="h4" gutterBottom>
        Cart total price: ${cartState.cartTotal}
      </Typography>
      <Button variant="contained" onClick={handleCheckout}>
        Checkout
      </Button>
    </Box>
  );
}

export default CartPage;
