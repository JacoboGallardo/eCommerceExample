import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Categories from "../components/Categories";
import Products from "../components/Products";
import { useMessageQueue } from "../context/messageQueueContextProvider";
import { useCartState } from "../context/cartContext";

function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const { addItem } = useCartState();
  const { showMessage } = useMessageQueue();

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
    const userId = localStorage.getItem("userId");
    await addItem({ userId, productId })
    showMessage('Item added to cart')
  };

  const handleOnSelectedCategory = (category) => {
    setSelectedCategory({ id: category.id, name: category.name });
  };

  const handleOnBackToCategories = () => {
    setSelectedCategory({})
    setProducts([])
    console.log('Set products and category to intial state')
  }

  return (
    <Box sx={{ padding: 3 }}>
      {!selectedCategory.id ? (
        <Categories categories={categories} onSelectCategory={handleOnSelectedCategory} />
      ) : (
        <Products
          onBackToCategories={handleOnBackToCategories}
          selectedCategory={selectedCategory}
          products={products}
          handleAddToCart={handleAddToCart}
        />
      )}
    </Box>
  );
}

export default ProductsPage;
