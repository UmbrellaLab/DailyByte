const express = require('express');
import { Request, Response } from "express";

const router = express.Router();

import { solutionsController } from "../controllers/solutionsController";

// post new solution to database
// post new solution, then get all solutions and send solutions back in this controller
// only post solution, no get solutions
router.post('/', solutionsController.postSolution, solutionsController.getSolutions, (req: Request, res: Response) => {
    res.status(200).send(res.locals.solutions);
})

module.exports = router;