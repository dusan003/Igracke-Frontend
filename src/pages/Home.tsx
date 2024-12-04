import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FilterSidebar from '../components/FilterSidebar';
import { Product } from "../models/productModel";
import { LoadProducts } from "../services/productService.tsx";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiData = await LoadProducts();
        console.log("Fetched Products:", apiData); // Proverite format podataka
        setProducts(apiData); // Direktno postavljanje proizvoda
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <Box sx={{ display: 'flex', padding: 2 }}>
      <FilterSidebar onFilter={(filters) => console.log(filters)} />
      <Box
        sx={{
          flex: 1,
          marginLeft: 3, // Razmak između FilterSidebar i kartica
          display: 'grid',
          gap: 3, // Veći razmak između kartica
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Povećana širina kartica
        }}
      >
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          products.map((product, index) => (
            <Link
              key={index}
              to={`/product/${product.id}`}  // Link vodi na stranicu sa detaljima proizvoda
              style={{ textDecoration: 'none', color: 'inherit' }} // Stilizovanje da ne bude podvučeno
            >
              <Card
                sx={{
                  maxWidth: 400, // Povećana maksimalna širina kartica
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%', // Ispunjava celu visinu
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: '100%',
                    height: 250, // Povećana visina slika
                    objectFit: 'contain',
                    backgroundColor: '#f0f0f0',
                  }}
                  image={`http://localhost:5001/${product.imageUrls[0]}`}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography gutterBottom variant="h4" component="div">
                      {product.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography gutterBottom variant="h5" color="text.secondary" sx={{ mt: 'auto' }}>
                      Cena: {product.price} RSD
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
  
};

export default Home;
