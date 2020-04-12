const CustomSpark = require('../plugin/spark-call')

class SparkEvents {
  constructor(spark) {
    this.spark = spark
  }

  async getNumberOfBounces(recipient) {
    const params = {
      recipients: recipient,
      events: 'bounce'
    }
    const customSpark = new CustomSpark()
    const response = await customSpark.callSpark(() => this.spark.events.searchMessage(params))
    return parseInt(response.total_count, 10)
  }
}

module.exports = SparkEvents
