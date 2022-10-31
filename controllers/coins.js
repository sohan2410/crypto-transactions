const validateDate = (date) => {
  const [dateValue, month, year] = date.split('-')
  const dateCheck = /^(0[1-9]|[12][0-9]|3[01])$/
  const monthCheck = /^(0[1-9]|1[0-2])$/
  const yearCheck = /^\d{4}$/
  if (month.match(monthCheck) && dateValue.match(dateCheck) && year.match(yearCheck)) {
    const ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (month != 2) {
      if (dateValue > ListofDays[month - 1]) {
        return false
      }
    }
    if (month == 2) {
      const leapYear = false
      if ((!(year % 4) && year % 100) || !(year % 400)) {
        leapYear = true
      }

      if (leapYear == false && dateValue >= 29) {
        return false
      }

      if (leapYear == true && dateValue > 29) {
        return false
      }
    }
    return true
  } else return false
}
module.exports = validateDate
