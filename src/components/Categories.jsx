import React from "react";
import { Grid2, Card, CardContent, Typography } from "@mui/material";

function Categories({ categories, onSelectCategory }) {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <Grid2 container spacing={3}>
        {categories.map((category) => (
          <Grid2 item xs={12} sm={6} md={4} key={category.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column", cursor: "pointer", width: 300 }}
              onClick={() => onSelectCategory({ id: category.id, name: category.name })}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{category.name}</Typography>
                <Typography>{category.description}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

export default Categories;
