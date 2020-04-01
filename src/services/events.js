class SparkEvents {
  constructor(spark) {
    this.spark = spark
  }

  async getNumberOfBounces(recipient) {
    const params = {
      recipients: recipient,
      events: 'bounce'
    }
    const response = await this.spark.events.searchMessage(params)
    return parseInt(response.total_count, 10)
  }
}

module.exports = SparkEvents
