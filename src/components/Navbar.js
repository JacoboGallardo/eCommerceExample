import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Home, ShoppingCart, Login, Logout } from "@mui/icons-material";

const Navbar = () => {
  const userToken = localStorage.getItem("userToken");
  const [isAuthenticated, setIsAuthenticated] = useState(!!userToken);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!userToken);
  }, [userToken]);

  const handleLogout = () => {
    console.log("remove token");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
          <Home />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-commerce App
        </Typography>
        <Button color="inherit" component={Link} to="/products" startIcon={<ShoppingCart />}>
          Products
        </Button>
        <Button color="inherit" component={Link} to="/cart" startIcon={<ShoppingCart />}>
          Cart
        </Button>
        {isAuthenticated ? (
          <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/" startIcon={<Login />}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
