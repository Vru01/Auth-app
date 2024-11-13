import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { products } from '../data/product';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  return (
    <Card sx={{ borderRadius: '16px', backgroundColor: '#f0f0f0', padding: '16px' }}>
      <CardContent>
        <Typography variant="h4">{product.name}</Typography>
        <img src={`https://picsum.photos/400/400?random=${product.id}`} alt={product.name} />
        <Typography variant="h6">Price: ${product.price}</Typography>
        <Typography>{product.description}</Typography>
        <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;
