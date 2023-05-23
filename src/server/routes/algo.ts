const express = require('express');
import { Request, Response } from "express";

const dailyAlgoController = require('../controllers/dailyAlgoController');
const router = express.Router();

// get request for daily algorithm- send daily algorithm
router.get('/daily', dailyAlgoController.getAlgo, (req: Request, res: Response) => {
    res.status(200).json(res.locals.algo);
})

module.exports = router;