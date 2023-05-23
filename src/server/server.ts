import { Request, Response, ErrorRequestHandler } from "express";

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const algoRouter = require('./routes/algo');
const solutionRouter = require('./routes/solutions')

// parse any incoming requests & cookies
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// serve login page
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.post('/signin', (req: Request, res: Response) => {
    console.log('entered sign in route')
    res.status(200).send("true");
})

// send requests to algos to algo router
app.use('/algo', algoRouter);

app.use('/solutions', solutionRouter)



app.use((req: Request, res: Response) => {
    res.status(404).send('Cannot get page!');
});

app.use(((err, req, res, next) => {
    const defaultErr = {
        status: 500,
        message: {err: 'Caught global error handler'}
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.message.err);
    return res.status(errorObj.status).json(errorObj.message);
}) as ErrorRequestHandler);

app.listen(port, () => {
    console.log(`Beep boop, listening on port ${port}`)
});