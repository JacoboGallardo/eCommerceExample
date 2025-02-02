import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";

function CartPage() {
  const [cartState, setCartState] = useState({ cartItems: [], cartTotal: 0, cartId: undefined });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId"); // Get user ID from storage
      try {
        const response = await axios.get(`http://localhost:4000/api/cart?user_id=${userId}`);
        setCartState({
          cartItems: response.data.productsInCart,
          cartTotal: response.data.cartTotalPrice,
          cartId: response.data.cartId,
        });
      } catch (err) {
        console.error("Error fetching cart", err);
      }
    };

    fetchCart();
  }, []);

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

  const handleCheckout = async () => {
    const userId = localStorage.getItem("userId");
    try {
      await axios.post(`http://localhost:4000/api/cart/checkout`, {
        user_id: userId,
      });
      navigate("/checkout-success");
    } catch (err) {
      console.error("Error during checkout", err);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          {cartState.cartItems.length === 0 ? (
            <Typography>No items in cart</Typography>
          ) : (
            <Box>
              {cartState.cartItems.map((item) => (
                <CartItem key={item.id} {...item} handleRemoveItem={handleRemoveItem} cartId={cartState.cartId} />
              ))}
            </Box>
          )}
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h4" gutterBottom>
              Cart total price: €{cartState.cartTotal}
            </Typography>
            <Button variant="contained" onClick={handleCheckout}>
              Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartPage;
