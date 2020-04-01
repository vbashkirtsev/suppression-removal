const { SparkEvents, SuppressionList } = require('../services')

class clearSuppressionList {
  constructor(spark, maxNumberOfBounces) {
    this.spark = spark
    this.maxNumberOfBounces = maxNumberOfBounces
  }

  async process() {
    const suppressionList = new SuppressionList(this.spark)
    const events = new SparkEvents(this.spark)
    const suppressedEmails = await suppressionList.get()

    await Promise.all(suppressedEmails.map(async (client) => {
      const bounces = await events.getNumberOfBounces(client)
      if (bounces < this.maxNumberOfBounces) {
        await suppressionList.remove(client)
      }
    }))
  }
}

module.exports = clearSuppressionList
