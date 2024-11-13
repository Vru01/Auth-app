require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
