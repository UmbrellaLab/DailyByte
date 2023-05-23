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
        const {username, password} = req.body;
        const values = [username, password]
        const userQuery = 
            `SELECT username, password
            FROM users
            WHERE username=$1 AND password=$2`
        try {
            const result = db.query(userQuery, values);
            
        } catch (err){
            baseError.log = `Error caught in signInController: ${err}`;
            baseError.message.err = `Could not sign in user`;
            return next(baseError);
        }
    }
}