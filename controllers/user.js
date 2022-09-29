const Transaction = require('../models/transaction')
const TransactionService = require('../services/transactions.service')
class Controller {
  async normalTransaction(req, res, next) {
    try {
      const { address } = req.query
      if (!address) return res.status(200).json({ status: 0, message: 'Please enter a address' })
      const result = await TransactionService.getTransactions(address)

      if (result.length) await Transaction.findOneAndUpdate({ address }, { transaction: result }, { upsert: true })

      res.status(200).json({ status: 1, message: 'OK', data: result })
    } catch (error) {
      next(error)
    }
  }
  async ethereum(req, res, next) {
    try {
      const { currencies } = req.query
      const result = await TransactionService.getEthereum(currencies)
      res.status(200).json({ status: 1, message: 'OK', data: result })
    } catch (error) {
      next(error)
    }
  }
  async getBalance(req, res, next) {
    try {
      const { address, currencies } = req.query
      if (!address) return res.status(200).json({ status: 0, message: 'Please enter a address' })
      const balance = await TransactionService.calculateBalance(address)

      const ether = await TransactionService.getEthereum(currencies)

      res.status(200).json({ status: 1, message: 'OK', data: { balance, ether } })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = new Controller()
