import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useCart } from "../services/CartContext.tsx";

const CheckoutPage = () => {
  const { cart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pregled narudžbine
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        {cart.map((item) => (
          <Box key={item.product.id} sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
            <Typography variant="h6">{item.product.name}</Typography>
            <Typography variant="h6">{item.product.price * item.quantity} RSD</Typography>
          </Box>
        ))}
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          Ukupna cena: {totalPrice} RSD
        </Typography>
      </Box>
      <Typography variant="h5" gutterBottom>
        Podaci za naručivanje
      </Typography>
      <Box component="form" sx={{ display: "grid", gap: 2, maxWidth: 500 }}>
        <TextField label="Ime" required />
        <TextField label="Prezime" required />
        <TextField label="Email" type="email" required />
        <TextField label="Grad" required />
        <TextField label="Adresa (Ulica i broj)" required />
        <TextField label="Poštanski broj" required />
        <TextField label="Broj telefona" required />
        <Typography variant="body2" color="text.secondary">
          Paket se plaća pouzecem putem Aks brze pošte.
        </Typography>
        <Button variant="contained" color="primary" type="submit">
          Potvrdi narudžbinu
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
