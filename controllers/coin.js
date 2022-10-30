const moment = require('moment')
const Axios = require('axios')

class Controller {
  async getHistory(req, res, next) {
    try {
      const { id, date } = req.query
      if (!date) return res.status(200).json({ status: 0, message: 'Please provide a date' })
      if (!moment(date, 'DD-MM-YYYY').isValid()) return res.status(200).json({ status: 0, message: 'Date you entered is invalid.' })
      const history = await Axios.get(`https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}&localization=false`)

      res.status(200).json({ status: 1, message: 'OK', data: history.data })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = new Controller()
