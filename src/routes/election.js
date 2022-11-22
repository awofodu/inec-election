const express = require('express')
const router = express.Router();
const rateLimiter = require('express-rate-limit')

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

const { getIndividualPolUnitResult, getAllLGA, getAllParties, getAllPollingUnits, getLGAPolUnitRes, addResult } = require('../controllers/electionController')

router.get('/pol-unit-result/:pu_number', getIndividualPolUnitResult)
router.get('/all-lga', getAllLGA)
router.get('/all-polling-units', getAllPollingUnits)
router.get('/all-parties', getAllParties)
router.get('/total-result/:lga_id', getLGAPolUnitRes)
router.post('/add-result', addResult)



module.exports = router 