import React from 'react';
import { Typography, Button } from '@mui/material';

const Checkout = ({ cart }) => {
  return (
    <div>
      <Typography variant="h4" component="h1">Checkout</Typography>
      {cart.length > 0 ? (
        <>
          <Typography variant="h6">Thank you for your purchase!</Typography>
          <Button variant="contained" color="primary">Place Order</Button>
        </>
      ) : (
        <Typography variant="h6">Your cart is empty.</Typography>
      )}
    </div>
  );
};

export default Checkout;
