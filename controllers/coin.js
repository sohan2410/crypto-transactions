const Axios = require('axios')

class Controller {
  async getHistory(req, res, next) {
    try {
      const { id, date } = req.query
      if (!date) return res.status(200).json({ status: 0, message: 'Please provide a date' })
      console.log(typeof date)
      const [dateValue, month, year] = date.split('-')
      const dateCheck = /^(0?[1-9]|[12][0-9]|3[01])$/
      const monthCheck = /^(0[1-9]|1[0-2])$/
      const yearCheck = /^\d{4}$/

      if (month.match(monthCheck) && dateValue.match(dateCheck) && year.match(yearCheck)) {
        const ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        if (month !== 2) {
          if (dateValue > ListofDays[month - 1]) {
            return res.status(200).json({ status: 0, message: 'Date you entered is invalid.' })
          }
        }
        if (month === 2) {
          const leapYear = false
          if ((!(year % 4) && year % 100) || !(year % 400)) {
            leapYear = true
          }

          if (leapYear === false && dateValue >= 29) {
            return res.status(200).json({ status: 0, message: 'Date you entered is invalid.' })
          }

          if (leapYear === true && dateValue > 29) {
            return res.status(200).json({ status: 0, message: 'Date you entered is invalid.' })
          }
        }
        const history = await Axios.get(`https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}&localization=false`)

        res.status(200).json({ status: 1, message: 'OK', data: history.data })
      } else {
        return res.status(200).json({ status: 0, message: 'Date you entered is invalid.' })
      }
    } catch (err) {
      next(err)
    }
  }
}
module.exports = new Controller()
