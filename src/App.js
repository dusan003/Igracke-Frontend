import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import {CreateProduct} from "./pages/CreateProduct1.tsx";
import { CartProvider } from "./services/CartContext.tsx";
import Navbar from './components/Navbar';
import FilterSidebar from './components/FilterSidebar';
import ProductDetails from "./pages/ProductDetails.tsx";
import CartPage from "./pages/CartPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;
