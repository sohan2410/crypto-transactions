const router = require('express').Router()

const coinController = require('../controllers/coin')
router.get('/history', coinController.getHistory)
module.exports = router
