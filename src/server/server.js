const express = require('express');
const app = express();
const port = 3000;

app.get('/api', (req, res) => {
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log(`Beep boop, listening on port ${port}`)
})