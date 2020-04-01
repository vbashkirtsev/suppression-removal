const ClearSuppressionList = require('./clear-supression-list')

describe('Clear suppression list', () => {
  const listMock = jest.fn()
  const deleteMock = jest.fn()
  const searchMessageMock = jest.fn()
  const spark = {
    suppressionList: {
      list: listMock,
      delete: deleteMock
    },
    events: {
      searchMessage: searchMessageMock
    }
  }
  const clearSuppressionList = new ClearSuppressionList(spark, 5)

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should remove email from suppression list if number of bounces less than certain value', async () => {
    listMock.mockResolvedValue({
      results: [
        {
          recipient: 'rcpt1@example.com',
          non_transactional: true,
          type: 'non_transactional',
          source: 'Manually Added',
          description: 'User requested to not receive any non-transactional emails.',
          created: '2015-01-01T12:00:00+00:00',
          updated: '2015-01-01T12:00:00+00:00'
        }
      ],
      links: [],
      total_count: 2
    })
    searchMessageMock.mockResolvedValue({
      links: [],
      total_count: 2
    })

    await clearSuppressionList.process()
    expect(listMock).toHaveBeenCalled()
    expect(searchMessageMock).toHaveBeenCalledTimes(1)
    expect(deleteMock).toHaveBeenCalledTimes(1)
    expect(deleteMock).toHaveBeenCalledWith('rcpt1@example.com')
  })

  it('Should NOT remove email from suppression list if number of bounces is more or equal than certain value', async () => {
    listMock.mockResolvedValue({
      results: [
        {
          recipient: 'rcpt1@example.com',
          non_transactional: true,
          type: 'non_transactional',
          source: 'Manually Added',
          description: 'User requested to not receive any non-transactional emails.',
          created: '2015-01-01T12:00:00+00:00',
          updated: '2015-01-01T12:00:00+00:00'
        }
      ],
      links: [],
      total_count: 2
    })
    searchMessageMock.mockResolvedValue({
      links: [],
      total_count: 10
    })

    await clearSuppressionList.process()
    expect(listMock).toHaveBeenCalled()
    expect(searchMessageMock).toHaveBeenCalledTimes(1)
    expect(deleteMock).not.toHaveBeenCalled()
  })
})
