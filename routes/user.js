const router = require('express').Router()

const userController = require('../controllers/user')

router.get('/normal-transaction', userController.normalTransaction)
router.get('/ethereum', userController.ethereum)
router.get('/balance', userController.getBalance)

module.exports = router
