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

export const solutionsController = {
    postSolution: async (req: Request, res: Response, next: NextFunction) => {
        // get user_id from cookies
        // get date from date.now()
        // get date, solution from request body
        const user = req.cookies.userId;
        let dat = new Date();
        let date = `${dat.getFullYear()}${dat.getMonth()}${dat.getDate()}`;
        const {solution} = req.body;
        // algo_id is date
        const valueArray = [user, date, 0, solution];
        const insert = `INSERT INTO solutions (user_id, algo_id, star_count, solution) 
        VALUES($1, $2, $3, $4);`
        try {
            db.query(insert, valueArray);
            console.log('inserted solution!')
            return next();
        }
        catch (err) {
            baseError.log = `Error caught in solutionsController: ${err}`;
            baseError.message.err = `Could not insert solution`;
            return next(baseError);
        }
    }
}