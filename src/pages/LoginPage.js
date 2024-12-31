import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/users/login", {
        username,
        password,
      });
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userId", response.data.id);
      navigate("/products");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Box sx={{ width: 300, margin: "auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}

export default LoginPage;
