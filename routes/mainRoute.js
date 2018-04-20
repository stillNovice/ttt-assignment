import express from 'express';
import path from 'path';
import colors from 'colors';

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('freqTable', {});
});

router.post('/getFrequencies', function(req, res, next) {
  console.log(req.body);
});

export default router;