import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, Select, MenuItem } from '@mui/material';
import { products } from '../data/product';   

const ProductList = ({ addToCart }) => {
  const [sort, setSort] = useState('low-to-high');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const sortProducts = (sortOption) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOption === 'low-to-high') return a.price - b.price;
      return b.price - a.price;
    });
    setFilteredProducts(sortedProducts);
    setSort(sortOption);
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>Product List</Typography>
      <Select value={sort} onChange={(e) => sortProducts(e.target.value)}>
        <MenuItem value="low-to-high">Price: Low to High</MenuItem>
        <MenuItem value="high-to-low">Price: High to Low</MenuItem>
      </Select>
      <Grid container spacing={2} mt={2}>
        {filteredProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ borderRadius: '16px', backgroundColor: '#f5f5f5' }}>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <img src={`https://picsum.photos/200/200?random=${product.id}`} alt={product.name} />
                <Typography>${product.price}</Typography>
                <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" color="secondary">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
