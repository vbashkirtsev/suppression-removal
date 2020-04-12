const CustomSpark = require('./spark-call')

describe('Call spark', () => {
  const mockCallback = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should run callback once if response was successful', async () => {
    mockCallback.mockResolvedValue('test')
    const spark = new CustomSpark()
    const result = await spark.callSpark(() => mockCallback())
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(result).toEqual('test')
  })

  it('Should try agan if SparkPostError appears', async () => {
    const error = new Error('test')
    error.statusCode = 429
    mockCallback.mockRejectedValueOnce(error).mockResolvedValue('test')
    const spark = new CustomSpark()
    const result = await spark.callSpark(() => mockCallback())
    expect(result).toEqual('test')
    expect(mockCallback).toHaveBeenCalledTimes(2)
    expect(2).toEqual(spark.attempts)
  })

  it('Fail if not SparkPostError', async () => {
    const error = new Error('test')
    mockCallback.mockRejectedValue(error)
    const spark = new CustomSpark()
    try {
      await spark.callSpark(() => mockCallback())
    } catch (err) {
      expect(mockCallback).toHaveBeenCalledTimes(1)
      expect(1).toEqual(spark.attempts)
    }
  })

  it('Fail when SparkPostError appears 10 times', async () => {
    const error = new Error('test')
    error.statusCode = 429
    mockCallback.mockRejectedValue(error)
    const spark = new CustomSpark(1)
    try {
      await spark.callSpark(() => mockCallback())
    } catch (err) {
      expect(mockCallback).toHaveBeenCalledTimes(10)
      expect(10).toEqual(spark.attempts)
    }
  })
})
