import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
const db = require("../model.ts");

const baseError = {
  status: 400,
  log: "hit base error",
  message: { err: "An error occurred in the solutionsController" },
};

export const githubOAuthController = {
  storeUserData: async (req: Request, res: Response, next: NextFunction) => {
    console.log('inside of storeUserData');
    const { login } = req.body.data;
    const usernameArr = [login];
    let password = '123';
    console.log(login);

    const userQuery =
      `SELECT *
    FROM users
    WHERE username=$1`;

    try {
      const dataResult = await db.query(userQuery, usernameArr);
      console.log('this is data Result')
      console.log(dataResult)
      // If there is a result, return that the user is verified
      if (dataResult.rows.length === 1) {
        res.locals.verified = "true";
        res.cookie('user_id', dataResult.rows[0].user_id);
        res.cookie('username', login);
        console.log('got cookies 2', dataResult.rows[0].user_id, login)
        console.log(login, dataResult.rows[0].user_id)
        res.locals.verified = "true";
        return next() // Redirect to /home
      } else {
        console.log('inside of else statement')
        const SALT_WORK_FACTOR = 10;
        bcrypt.hash(password, SALT_WORK_FACTOR, async (err: Error, hashedPassword: string) => {
          if (err) {
            baseError.log = `Error caught in signInController: ${err}`;
            baseError.message.err = `Could not encrypt password`;
            return next(baseError);
          }
          password = hashedPassword;
          const values = [login, password];
          const userInsert = `INSERT INTO users (username, password)
          VALUES ($1, $2)`;
          const userQuery =
            `SELECT *
              FROM users
              WHERE username=$1 AND password=$2`;

          try {
            const result = await db.query(userInsert, values);
            // Set cookies with user_id and username here
            // Find user
            const user = await db.query(userQuery, values);
            const user_id = user.rows[0].user_id;
            res.cookie('user_id', user_id);
            res.cookie('username', login);
            console.log('got cookies 1')
            res.locals.verified = "true";
            return next();
          } catch (err) {
            baseError.log = `Error caught in signInController: ${err}`;
            baseError.message.err = `Could not sign up user`;
            res.locals.verified = "true";
            return next(baseError);
          }
        });
      }

    } catch (err) {
      console.error('Error storing user data:', err);
      res.status(500).json({ error: 'An error occurred while storing user data' });
    }
  },
};

// {
//   login: 'AkeemESmith',
//   id: 118077209,
//   node_id: 'U_kgDOBwm3GQ',
//   avatar_url: 'https://avatars.githubusercontent.com/u/118077209?v=4',
//   gravatar_id: '',
//   url: 'https://api.github.com/users/AkeemESmith',
//   html_url: 'https://github.com/AkeemESmith',
//   followers_url: 'https://api.github.com/users/AkeemESmith/followers',
//   following_url: 'https://api.github.com/users/AkeemESmith/following{/other_user}',
//   gists_url: 'https://api.github.com/users/AkeemESmith/gists{/gist_id}',
//   starred_url: 'https://api.github.com/users/AkeemESmith/starred{/owner}{/repo}',
//   subscriptions_url: 'https://api.github.com/users/AkeemESmith/subscriptions',
//   organizations_url: 'https://api.github.com/users/AkeemESmith/orgs',
//   repos_url: 'https://api.github.com/users/AkeemESmith/repos',
//   events_url: 'https://api.github.com/users/AkeemESmith/events{/privacy}',
//   received_events_url: 'https://api.github.com/users/AkeemESmith/received_events',
//   type: 'User',
//   site_admin: false,
//   name: 'Akeem Smith',
//   company: null,
//   blog: '',
//   location: 'Austin, TX',
//   email: null,
//   hireable: null,
//   bio: 'I love building big beautiful things that make the world better.',
//   twitter_username: null,
//   public_repos: 8,
//   public_gists: 0,
//   followers: 30,
//   following: 17,
//   created_at: '2022-11-12T19:35:12Z',
//   updated_at: '2023-05-17T04:37:26Z'
// }
