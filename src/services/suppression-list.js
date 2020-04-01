class SuppressionList {
  constructor(spark) {
    this.spark = spark
  }

  async get() {
    const response = await this.spark.suppressionList.list()
    const clients = response.results
    // eslint-disable-next-line no-console
    console.log(`Found ${clients.length} suppressed emails`)
    return clients.map((item) => item.recipient)
  }

  async remove(email) {
    await this.spark.suppressionList.delete(email)
    // eslint-disable-next-line no-console
    console.log(`${email} was deleted from suppression list`)
  }
}

module.exports = SuppressionList
