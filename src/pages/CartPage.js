import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId"); // Get user ID from storage
      console.log("userId", userId);
      try {
        const response = await axios.get(`http://localhost:4000/api/cart?user_id=${userId}`);
        setCartItems(response.data);
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

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>No items in cart</Typography>
      ) : (
        <Box>
          {cartItems.map((item) => (
            <Box key={item.product_id}>
              <Typography>{item.product_name}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>Price: ${item.price}</Typography>
            </Box>
          ))}
        </Box>
      )}
      <Button variant="contained" onClick={handleCheckout}>
        Checkout
      </Button>
    </Box>
  );
}

export default CartPage;
