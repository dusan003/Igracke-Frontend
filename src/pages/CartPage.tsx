import React from "react";
import { useCart } from "../services/CartContext.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vaša Korpa
      </Typography>
      {cart.length === 0 ? (
        <Typography>Nema proizvoda u korpi.</Typography>
      ) : (
        <>
          <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
            {cart.map((item) => (
              <Card key={item.product.id} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <CardMedia
                  component="img"
                  image={`http://localhost:5001/${item.product.imageUrls[0]}`}
                  alt={item.product.name}
                  sx={{ height: 200, objectFit: "contain", backgroundColor: "#f0f0f0" }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.product.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Količina: {item.quantity}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ marginTop: 1 }}>
                    Cena: {item.product.price * item.quantity} RSD
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
                  <Button variant="outlined" color="error" onClick={() => removeFromCart(item.product.id)}>
                    Ukloni
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
          <Typography variant="h5" sx={{ marginTop: 3 }}>
            Ukupna cena: {totalPrice} RSD
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
            <Button variant="contained" color="secondary" onClick={clearCart}>
              Isprazni Korpu
            </Button>
            <Button variant="contained" color="primary" component={Link} to="/checkout">
              Naruči
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
