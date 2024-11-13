import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import { AppBar, Toolbar, IconButton, Badge, Typography, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...productInCart, quantity: productInCart.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const adjustQuantity = (id, amount) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + amount } : item
    ).filter(item => item.quantity > 0));
  };

  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <Router>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              E-Commerce
            </Link>
          </Typography>
          <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton color="inherit">
              <Badge badgeContent={getCartQuantity()} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<ProductList addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} adjustQuantity={adjustQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
