import { Request, Response } from "express";

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');

// parse any incoming requests & cookies
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// serve login page
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/api', (req: Request, res: Response) => {
    res.send('Hello world!')
})

app.get('/', (req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
    console.log(`Beep boop, listening on port ${port}`)
})

// app.use(express.static(path.resolve(__dirname, '../client')));

// app.use(cookieParser());

// // Minzo: on get req to /, send index.html

// app.get('/', (req, res) => {
//     res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
// });