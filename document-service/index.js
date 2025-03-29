
const express = require('express');
const app = express();
const port = 8007;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('document-service Running');
});

app.listen(port, () => {
    console.log('document-service listening on port 8007');
});
