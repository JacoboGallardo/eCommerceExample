import React from "react";
import { Grid2, Card, CardContent, CardHeader, Typography, Button, CardMedia, CardActions } from "@mui/material";

function Products({ onBackToCategories, selectedCategory, products, handleAddToCart }) {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Products in {selectedCategory.name}
      </Typography>
      <Button variant="contained" onClick={() => onBackToCategories()}>
        Back to Categories
      </Button>
      <Grid2 container spacing={3} sx={{ marginTop: 3 }}>
        {products.map((product) => (
          <Grid2 item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", width: 300 }}>
              <CardMedia sx={{ height: 200 }} image={product.image_url} title={product.name} />
              <CardHeader title={product.name} />
              <CardContent sx={{ flexGrow: 1, alignContent: "space-between" }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                <div style={{ marginLeft: "7px" }}>
                  <Typography variant="body1" marginBottom={2}>
                    Price: ${product.price}
                  </Typography>
                  <Button variant="contained" onClick={() => handleAddToCart(product.id)}>
                    Add to Cart
                  </Button>
                </div>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

export default Products;
