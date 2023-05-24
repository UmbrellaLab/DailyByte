import { Request, Response, ErrorRequestHandler } from "express";

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const algoRouter = require('./routes/algo');
const solutionRouter = require('./routes/solutions')
import {signInController} from './controllers/signInController';

/////////////////////////////////////////////////////////////////////
////////////////////  GITHUB Oauth   ////////////////////////////////
/////////////////////////////////////////////////////////////////////
const cors = require('cors')
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
const bodyParser = require('body-parser');

const CLIENT_ID = "473a8476fcc6e8de6ca3";
const ClIENT_SECRET = "d18b10c46c30c99bffd9ff614ddb45be24b3b1bd";

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async (req, res) => {

    req.query.code;

    const params = "?client_id" + CLIENT_ID + "&client_secret=" + ClIENT_SECRET + "&code=" + req.query.code;

    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    })
})

//getUserData
//access token is going to be passed in as an Authorization header

app.get('/getUserData', async (req, res) => {
    req.get("Authorization"); //bearer ACCESSTOKEN
    await fetch("https://api.gethub.com/user", {
        method: "GET",
        headers: {
            "Authorization" : req.get("Authorization") //bearer ACCESSTOKEN
        }
    }).then((response) => {
        return response.json();
    }) .then((data) => {
        console.log(data);
        res.json(data);
    })
});


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

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

app.listen(port, () => {
    console.log(`Beep boop, listening on port ${port}`)
});