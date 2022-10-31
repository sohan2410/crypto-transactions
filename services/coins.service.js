const Axios = require('axios')

const validateDate = require('../controllers/coins')

class CoinsServices {
  async getHistory(req, res, next) {
    try {
      const { id, date } = req.query
      if (!date) return res.status(200).json({ status: 0, message: 'Please provide a date' })
      if (!validateDate(date)) return res.status(200).json({ status: 0, message: 'Invalid Date' })
      const history = await Axios.get(`https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}&localization=false`)

      res.status(200).json({ status: 1, message: 'OK', data: history.data })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = new CoinsServices()
