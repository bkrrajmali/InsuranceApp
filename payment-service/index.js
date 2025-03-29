
const express = require('express');
const app = express();
const port = 8004;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('payment-service Running');
});

app.listen(port, () => {
    console.log('payment-service listening on port 8004');
});
