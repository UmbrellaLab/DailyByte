const db = require("../model.ts");
import express, {
    Request,
    Response,
    NextFunction,
    RequestHandler,
} from "express";
import cookieParser from "cookie-parser";

const baseError = {
    status: 400,
    log: "hit base error",
    message: { err: "An error occurred in the solutionsController" },
};

export const signInController = {
    verifyUser: async (req: Request, res: Response, next: NextFunction) => {
        // find user in database
        // get username/pw from req.body
        const { username, password } = req.body;
        const values = [username, password]
        const userQuery =
            `SELECT *
            FROM users
            WHERE username=$1 AND password=$2`
        try {
            const result = await db.query(userQuery, values);
            if (result.rows.length === 1) {
                res.locals.verified = "true";
                // set cookie with user ID
                console.log('inside signin cookie')
                console.log(result.rows)
                res.cookie('user_id', result.rows[0].user_id);
                res.cookie('username', username);
                return next();
            } else {
                res.locals.verified = 'false';
                return next();
            }
        } catch (err) {
            baseError.log = `Error caught in signInController: ${err}`;
            baseError.message.err = `Could not sign in user`;
            return next(baseError);
        }
    },
    signUpUser: async (req: Request, res: Response, next: NextFunction) => {
        // get username and password from request body
        const { username, password } = req.body;
        const values = [username, password]
        // need to make sure user with same username does not exist (?)
        const userInsert = `INSERT INTO users (username, password)
        VALUES ($1, $2)`
        const userQuery =
            `SELECT *
            FROM users
            WHERE username=$1 AND password=$2`
        try {
            const result = await db.query(userInsert, values);
            // set cookies with user_id and username here
            // find user
            const user = await db.query(userQuery, values);
            const user_id = user.rows[0].user_id;
            res.cookie('user_id', user_id);
            res.cookie('username', username);
            res.locals.verified = "true";
            return next();
        } catch (err) {
            baseError.log = `Error caught in signInController: ${err}`;
            baseError.message.err = `Could not sign up user`;
            return next(baseError);
        }
    }
}