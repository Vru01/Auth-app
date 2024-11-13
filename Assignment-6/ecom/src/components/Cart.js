import React from 'react';
import { Grid, Button, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const Cart = ({ cart, adjustQuantity, removeFromCart }) => {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <Typography variant="h4" component="h1">Your Cart</Typography>
      <Grid container spacing={2} mt={2}>
        {cart.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card sx={{ borderRadius: '16px', backgroundColor: '#f5f5f5' }}>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Price: ${item.price}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
                <Button onClick={() => adjustQuantity(item.id, 1)}>+</Button>
                <Button onClick={() => adjustQuantity(item.id, -1)}>-</Button>
                <Button onClick={() => removeFromCart(item.id)} color="secondary">
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" mt={2}>Total Price: ${totalPrice.toFixed(2)}</Typography>
      {cart.length > 0 && (
        <Link to="/checkout" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Proceed to Checkout
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Cart;
