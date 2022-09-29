const Transaction = require('../models/transaction')
const Axios = require('axios')
const client = require('../configs/redis')

const DEFAULT_EXPIRATION = 10 * 60 // 10 minutes

class TransactionsService {
  async getTransactions(address, action = 'txlist') {
    try {
      const transaction = await Axios.get(`https://api.etherscan.io/api`, {
        params: {
          module: 'account',
          action,
          address: address,
          startblock: 0,
          endblock: 99999999,
          sort: 'asc',
          apikey: process.env.ETHERSCAN_API_KEY,
        },
      })
      if (transaction.data.result.length) await Transaction.findOneAndUpdate({ address }, { transaction: transaction.data.result }, { upsert: true })

      return transaction.data.result
    } catch (error) {
      throw error
    }
  }
  async getEthereum(currencies = 'inr') {
    try {
      const data = await client.get(`ethereum_${currencies}`)

      if (data != null) return JSON.parse(data)

      const ethereum = await Axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=${currencies}`)

      client.SETEX(`ethereum_${currencies}`, DEFAULT_EXPIRATION, JSON.stringify(ethereum.data))

      return ethereum.data
    } catch (error) {
      throw error
    }
  }
  async calculateBalance(address) {
    let transaction = await this.getTransactions(address)
    const internalTransaction = await this.getTransactions(address, 'txlistinternal')
    if (internalTransaction.length) transaction.push(internalTransaction)

    const ETHER_VALUE = 10 ** 18
    var balance = 0
    for (var i = 0; i < transaction.length; i++) {
      let gas = 0
      let value = parseInt(transaction[i].value) / ETHER_VALUE
      if (transaction[i].gasPrice) {
        gas = (parseInt(transaction[i].gasUsed) * parseInt(transaction[i].gasPrice)) / ETHER_VALUE
      } else {
        gas = parseInt(transaction[i].gasUsed) / ETHER_VALUE
      }
      if (transaction[i].to === address) balance = balance + value
      else balance -= value + gas
    }
    return balance * ETHER_VALUE
  }
}

module.exports = new TransactionsService()
