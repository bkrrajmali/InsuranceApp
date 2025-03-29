
const express = require('express');
const app = express();
const port = 8001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('customer-service Running');
});

app.listen(port, () => {
    console.log('customer-service listening on port 8001');
});
