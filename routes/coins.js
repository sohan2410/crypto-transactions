const router = require('express').Router()

const coinsService = require('../services/coins.service')

router.get('/history', coinsService.getHistory)

module.exports = router
