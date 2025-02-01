import React from "react";
import { Box, Typography, Card, CardContent, CardMedia, CardActions, Button } from "@mui/material";
import "./CartItem.css";

function CartItem({ id, name, quantity, price, image_url, cartId, handleRemoveItem }) {
  return (
    <Card key={id} className="cart-item" sx={{ display: "flex", marginBottom: 2 }}>
      <CardMedia component="img" sx={{ width: 151 }} image={image_url} alt={name} />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent>
          <Typography component="div" variant="h6">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Quantity: {quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            Price: ${price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="secondary" onClick={() => handleRemoveItem(id, cartId)} aria-label="remove">
            Remove
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default CartItem;
