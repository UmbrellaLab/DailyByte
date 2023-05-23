const db = require('../model.ts');

const baseError = {
  status: 400,
  log: 'hit base error',
  message: {err: 'An error occurred in the dailyAlgoController'}
};

//add interface here

const dailyAlgoController = {};

dailyAlgoController.getAlgo = async (req, res, next) => {
  //parse date here - figure out how we will store this date - has to be a string
  const theDate = '123'
  const dateArr = [theDate]
  const algoQuery = `SELECT problem_name, problem
  FROM algos
  WHERE algo_id=($1);`;
  try {
    const result = await db.query(algoQuery, dateArr);
    console.log('result from query', result)
    res.locals.algo = result;
  }
  catch (err) {
    baseError.log = `Error caught in getAlgo: ${err}`
    baseError.message.err = `Could not retrieve daily algo`
    return next(baseError)
  }
};