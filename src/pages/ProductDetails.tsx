import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Product } from "../models/productModel";
import { LoadProductById } from "../services/productService.tsx";
import { useCart } from "../services/CartContext.tsx";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1); // Novo stanje za količinu

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const productId = parseInt(id);
          const fetchedProduct = await LoadProductById(productId);
          setProduct(fetchedProduct);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
    }
    setSnackbarOpen(true);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      setQuantity(value); // Ažuriranje stanja za količinu
    }
  };

  return (
    <Box sx={{ padding: 4, display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" } }}>
      <Box sx={{ flex: 1 }}>
        <CardMedia
          component="img"
          src={`http://localhost:5001/${product.imageUrls[currentImageIndex]}`}
          alt={product.name}
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: "80vh",
            objectFit: "contain",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 2 }}>
          <Button variant="contained" onClick={() => setCurrentImageIndex((prev) => (prev - 1 + product.imageUrls.length) % product.imageUrls.length)}>Prev</Button>
          <Button variant="contained" onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.imageUrls.length)}>Next</Button>
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Typography variant="h3" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.75rem", flex: 2, marginBottom: 3 }}>
          {product.description}
        </Typography>
        <Typography variant="h3" sx={{ alignSelf: "flex-start", marginBottom: 1 }}>
          Cena: {product.price} RSD
        </Typography>
        <TextField
          type="number"
          label="Količina"
          value={quantity}
          onChange={handleQuantityChange}
          inputProps={{ min: "1" }}
          sx={{ marginBottom: 2, width: "100px" }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddToCart} 
          sx={{ marginTop: 2 }}
        >
          Dodaj u korpu
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {quantity} x {product.name} je dodat u korpu!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetails;
