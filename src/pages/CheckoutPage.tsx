import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useCart } from "../services/CartContext.tsx";
import { CreateNewOrder } from "../services/orderService.tsx";
import { OrderCreate } from "../models/orderModel";

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [id, setId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [orderItems, setOrderItems] = useState<{ productId: number; quantity: number }[]>([]);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const groupedItems = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.product.id);
    let counter = 0;
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({
        id: counter,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      });
      counter++;
    }
    return acc;
  }, [] as { id: number; name: string; quantity: number; price: number }[]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Sprečava resetovanje stranice
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !city.trim() || !firstName.trim() || !address.trim() || !postalCode.trim() || !phone.trim() || (totalPrice != null && totalPrice <= 0)) {
      alert("Unesite validne vrednosti!");
      return;
  }

    setIsPosting(true);

    try{

      await CreateNewOrder({
        "id" : id,
        "firstName" : firstName,
        "lastName" : lastName,
        "email" : email,
        "address" : address,
        "city" : city,
        "postalCode" : postalCode,
        "phone" : phone,
        "totalPrice" : totalPrice,
        "items" : groupedItems,
        "createdAt" : new Date().toISOString()
      });

      setSnackbarOpen(true); // Prikaz feedback-a
      setId(0);
      setFirstName("");
      setLastName("");
      setAddress("");
      setCity("");
      setEmail("");
      setPhone("");
      setPostalCode("");
      setCreatedAt("");
      setOrderItems([]);
      clearCart()
      setIsPosting(false);
    }
    catch (error) {
        console.error("Error creating order:", error);
        if (error instanceof Error) {
        alert(error.message);
        }
    } finally {
        setIsPosting(false);
    }
  }


  return (
    <Box sx={{ padding: 4, display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" } }}>
      {/* Pregled proizvoda */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>
          Pregled narudžbine
        </Typography>
        <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: "1fr" }}>
          {cart.map((item) => (
            <Card key={item.product.id} sx={{ display: "flex", gap: 2 }}>
              <CardMedia
                component="img"
                image={`http://localhost:5001/${item.product.imageUrls[0]}`}
                alt={item.product.name}
                sx={{
                  width: 150,
                  height: 150,
                  objectFit: "cover",
                  backgroundColor: "#f0f0f0",
                }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.product.name}</Typography>
                <Typography variant="body1" color="text.secondary">
                  Količina: {item.quantity}
                </Typography>
                <Typography variant="h6" color="primary">
                  Cena: {item.product.price * item.quantity} RSD
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Typography variant="h5" sx={{ marginTop: 3 }}>
          Ukupna cena: {totalPrice} RSD
        </Typography>
      </Box>

      {/* Forma za naručivanje */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          Podaci za naručivanje
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2, maxWidth: 500 }}>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
          <TextField label="Ime" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <TextField label="Prezime" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <TextField label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Grad" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />
          <TextField label="Adresa (Ulica i broj)" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <TextField label="Poštanski broj" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
          <TextField label="Broj telefona" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <Typography variant="body2" color="text.secondary">
            Paket se plaća pouzecem putem Aks brze pošte.
          </Typography>
          <Button variant="contained" color="primary" type="submit">
            Potvrdi narudžbinu
          </Button>
        </Box>
      </Box>
      <Snackbar
          open={snackbarOpen}
          autoHideDuration={10000} // Produženo trajanje na 10 sekundi
          onClose={(event, reason) => {
            if (reason !== "clickaway") {
              setSnackbarOpen(false);
            }
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Narudžbina uspešno kreirana! Proverite email za detalje.
          </Alert>
      </Snackbar>
    </Box>
  );
};

export default CheckoutPage;
