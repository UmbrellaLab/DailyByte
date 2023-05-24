import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
// import fetch from 'node-fetch';
import { signInController } from './controllers/signInController';
import { githubOAuthController } from './controllers/githubOAuthController'

const algoRouter = require('./routes/algo');
const solutionRouter = require('./routes/solutions')

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const CLIENT_ID = "473a8476fcc6e8de6ca3";
const CLIENT_SECRET = "6d84a2d591c088ce5bfcb4d8a439d5b5abb8fe39";

app.use(cors({
    origin: 'http://localhost:8080', 
    credentials: true
  }));
app.use(bodyParser.json());

app.get('/getAccessToken', async (req: Request, res: Response) => {
  const code = req.query.code;

  const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Credentials": "include"
    },
    credentials: "include"
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

app.get('/getUserData', (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.get("Authorization");

    fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      "Authorization": authorizationHeader,
      "Credentials": "include"
    },
    credentials: "include"
  })
  .then((response) => response.json())
  .then((data) => {
    const login = data.login; // Extract the name field from the response data
    req.body.data = { login }; // Create a new object with the name field
    next(); // Call the next middleware (githubOAuthController.storeUserData)
  })
  .catch((error) => {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  });
}, githubOAuthController.storeUserData, (req, res) => {
  res.sendStatus(200);
});

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/algo', algoRouter);
app.use('/solutions', solutionRouter);

app.post('/signin', signInController.verifyUser, (req: Request, res: Response) => {
  res.status(200).send(res.locals.verified);
});

app.post('/signup', signInController.signUpUser, (req: Request, res: Response) => {
  res.status(200).send(res.locals.verified);
});

app.use((req: Request, res: Response) => {
  res.status(404).send('Cannot get page!');
});

app.use(((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    status: 500,
    message: { err: 'Caught global error handler' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.message.err);
  return res.status(errorObj.status).json(errorObj.message);
}) as ErrorRequestHandler);

app.listen(port, () => {
  console.log(`Beep boop, listening on port ${port}`);
});
