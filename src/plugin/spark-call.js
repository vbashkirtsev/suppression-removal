class CustomSpark {
  constructor(timeout) {
    this.attempts = 0
    this.timeout = timeout || 2000
  }

  async callSpark(callback) {
    let result
    this.attempts += 1
    try {
      result = await callback()
    } catch (e) {
      if (e.statusCode && e.statusCode === 429 && this.attempts < 10) {
        await new Promise((resolve) => setTimeout(resolve, this.timeout))
        result = await this.callSpark(callback)
      } else {
        throw e
      }
    }

    return result
  }
}


module.exports = CustomSpark
