const SparkPost = require('sparkpost')
const ClearSuppressionList = require('./controllers/clear-supression-list')

// eslint-disable-next-line no-unused-vars
exports.handler = async (event, context) => {
  const options = { endpoint: process.env.SPARK_ENDPOINT }
  const spark = new SparkPost(process.env.SPARK_API_KEY, options)
  const clearSuppressionList = new ClearSuppressionList(spark, process.env.MAX_NUMBER_OF_BOUNCES)
  await clearSuppressionList.process()
}
