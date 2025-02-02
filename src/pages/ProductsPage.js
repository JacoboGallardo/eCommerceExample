import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Categories from "../components/Categories";
import Products from "../components/Products";

function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory.id) {
      const fetchProducts = async () => {
        try {
          console.log("selected category", selectedCategory.id)
          const response = await axios.get(`http://localhost:4000/api/products?category_id=${selectedCategory.id}`);
          setProducts(response.data);
        } catch (err) {
          console.error("Error fetching products", err);
        }
      };

      fetchProducts();
    }
  }, [selectedCategory.id]);

  const handleAddToCart = async (productId) => {
    await axios.post("http://localhost:4000/api/cart/add-item", {
      user_id: localStorage.getItem("userId"),
      product_id: productId,
      quantity: 1,
    });
  };

  const handleOnSelectedCategory = (category) => {
    setSelectedCategory({ id: category.id, name: category.name });
  };

  return (
    <Box sx={{ padding: 3 }}>
      {!selectedCategory.id ? (
        <Categories categories={categories} onSelectCategory={handleOnSelectedCategory} />
      ) : (
        <Products
          onBackToCategories={() => setSelectedCategory({})}
          selectedCategory={selectedCategory}
          products={products}
          handleAddToCart={handleAddToCart}
        />
      )}
    </Box>
  );
}

export default ProductsPage;
