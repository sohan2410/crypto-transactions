const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  transaction: [
    {
      blockNumber: Number,
      timeStamp: Number,
      hash: String,
      nonce: Number,
      blockHash: String,
      transactionIndex: Number,
      from: String,
      to: String,
      value: Number,
      gas: Number,
      gasPrice: Number,
      isError: Number,
      txreceipt_status: Number,
      input: String,
      contractAddress: String,
      cumulativeGasUsed: Number,
      gasUsed: Number,
      confirmations: Number,
      methodId: String,
      functionName: String,
    },
  ],
})

module.exports = mongoose.model('transaction', transactionSchema)
