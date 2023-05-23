const db = require("../model.ts");
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";

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
        const user = req.cookies.username;
        let dat = new Date();
        let date = `${dat.getFullYear()}${dat.getMonth()}${dat.getDate()}`;
        const {solution} = req.body;
        // algo_id is date
        const valueArray = [user, date, 0, solution];
        const insert = `INSERT INTO solutions (username, algo_id, star_count, solution) 
        VALUES($1, $2, $3, $4);`
        try {
            await db.query(insert, valueArray);
            console.log('inserted solution!');
            return next();
        }
        catch (err) {
            baseError.log = `Error caught in postSolution: ${err}`;
            baseError.message.err = `Could not insert solution`;
            return next(baseError);
        }
    },
  getSolutions: async (req: Request, res: Response, next: NextFunction) => {
    let dat = new Date();
    let date = `${dat.getFullYear()}${dat.getMonth()}${dat.getDate()}`;
    const dateArr = [date]
    const getSolutionsQuery = `SELECT solution_id, username, solution, star_count
    FROM solutions WHERE algo_id=($1)
    ORDER BY star_count ASC`
    try {
      const result = await db.query(getSolutionsQuery, dateArr);
      console.log('result from getSolutions', result);
      res.locals.solutions = result.rows;
      return next();
    }
    catch(err) {
      baseError.log = `Error caught in getSolutions: ${err}`;
      baseError.message.err = `Could not retrieve solutions`;
      return next(baseError);
    }
  }
}