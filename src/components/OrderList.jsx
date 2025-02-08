import React from "react";
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

export const OrderList = ({ orders }) => {
    if (orders.length === 0) {
        return <Typography>No orders found.</Typography>;
    }

    return (
        <Box>
            {orders.map((order) => (
                <Card key={order.order_id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Order ID: {order.order_id}</Typography>
                        <Typography variant="body2">Date: {new Date(order.creation_date).toLocaleString()}</Typography>
                        <Typography variant="body1">Total: €{order.total.toFixed(2)}</Typography>

                        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Products:</Typography>
                        <List>
                            {order.products.map((product) => (
                                <React.Fragment key={product.product_id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={`${product.name} (x${product.quantity})`}
                                            secondary={`€${product.unit_price} each - Total: €${product.total_price}`}
                                        />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
