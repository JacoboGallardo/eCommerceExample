import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import { CartStatusProvider } from "./context/cartContext";
import { MessageQueueProvider } from "./context/messageQueueContextProvider";

function App() {
  const userId = localStorage.getItem("userId");

  return (
    <MessageQueueProvider>
      <CartStatusProvider userId={userId}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/products" element={<PrivateRoute element={ProductsPage} />} />
            <Route path="/cart" element={<PrivateRoute element={CartPage} />} />
          </Routes>
        </Router>
      </CartStatusProvider>
    </MessageQueueProvider>
  );
}

export default App;
