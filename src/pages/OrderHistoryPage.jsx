import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { OrderList } from "../components/OrderList"; // Component to display orders
import { useMessageQueue } from "../context/messageQueueContextProvider";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const { showMessage } = useMessageQueue();

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId"); // Get user ID from localStorage
      if (!userId) {
        showMessage("User not logged in");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/api/orders?user_id=${userId}`);
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders", err);
        showMessage("Failed to load orders");
      }
    };

    fetchOrders();
  }, [showMessage]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      <OrderList orders={orders} />
    </Box>
  );
}

export default OrderHistoryPage;
