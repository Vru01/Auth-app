const express = require('express');
const app = express();
const port = 3001;
let autha = false;

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

const auth = (req, res, next) => {
    const { user, pass } = req.params;
    if (user === 'admin' && pass === 'pass') {
        autha = true;
        next();
    } else {
        res.send('Unauthorized');
    }
};

app.get('/logout', (req, res) => { 
    autha = false;
    res.send('Logged out');
});

app.get('/auth/:user/:pass', auth, (req, res) => {
    res.send('Authentication successful. You can now access the About Page.');
});

app.get('/about', (req, res) => {
    if(autha){
        res.send('This is the About Page');
    }
    else{
        res.send('Unauthorized');
    }
});

app.get('/contact', (req, res) => {
    res.send('Contact us at: email@example.com');
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});

app.get('/products/:category/:productId', (req, res) => {
    const { category, productId } = req.params;
    res.send(`category: ${category}, productId: ${productId}`);
});

app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
