import { Request, Response } from "express";

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const algoRouter = require('./routes/algo');

// parse any incoming requests & cookies
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// serve login page
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// send requests to algos to algo router
app.use('/algo', algoRouter);

app.listen(port, () => {
    console.log(`Beep boop, listening on port ${port}`)
});