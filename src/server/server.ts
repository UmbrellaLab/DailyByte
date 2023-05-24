import { Request, Response, ErrorRequestHandler } from "express";

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
//websockets 
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const cors = require('cors')
//
const cookieParser = require('cookie-parser');
const algoRouter = require('./routes/algo');
const solutionRouter = require('./routes/solutions')
import {signInController} from './controllers/signInController';

// parse any incoming requests & cookies
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//websockets
app.use(cors());
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:8080', 'http://localhost:3000'],
        methods: ['GET', 'POST']
    }
});

// serve login page
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// send requests to algos to algo router
app.use('/algo', algoRouter);

app.use('/solutions', solutionRouter)

// sign in user
app.post('/signin', signInController.verifyUser, (req: Request, res: Response) => {
    res.status(200).send(res.locals.verified);
})

// sign up new user
app.post('/signup', signInController.signUpUser, (req: Request, res: Response) => {
    res.status(200).send(res.locals.verified);
})

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

io.on('connection', (socket: any) => {
    console.log('a user connected');
    socket.on('test', (test:any) => {
        console.log('test', test)
    })
  });

server.listen(3001, () => {
    console.log('sockets server is running')
})

app.listen(port, () => {
    console.log(`Beep boop, listening on port ${port}`)
});