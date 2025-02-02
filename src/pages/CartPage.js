import React from "react";
import axios from "axios";
import { Button, Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCartState } from "../context/cartContext";
import { useMessageQueue } from "../context/messageQueueContextProvider";

function CartPage() {
  const navigate = useNavigate();
  const { cartState, removeItem } = useCartState()
  const userId = localStorage.getItem("userId");
  const { showMessage } = useMessageQueue();

  const handleRemoveItem = async (productId, cartId) => {
    await removeItem({ userId, productId, cartId });
    showMessage("Item removed from cart")
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
