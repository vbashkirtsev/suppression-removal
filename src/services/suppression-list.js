const CustomSpark = require('../plugin/spark-call')

class SuppressionList {
  constructor(spark) {
    this.spark = spark
  }

  async get() {
    const customSpark = new CustomSpark()
    const response = await customSpark.callSpark(() => this.spark.suppressionList.list({
      sources: ['Bounce Rule']
    }))
    const clients = response.results
    // eslint-disable-next-line no-console
    console.log(`Found ${clients.length} suppressed emails`)
    return clients.map((item) => item.recipient)
  }

  async remove(email) {
    const customSpark = new CustomSpark()
    await customSpark.callSpark(() => this.spark.suppressionList.delete(email))
    // eslint-disable-next-line no-console
    console.log(`${email} was deleted from suppression list`)
  }
}

module.exports = SuppressionList
