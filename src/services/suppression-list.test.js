const SuppressionList = require('./suppression-list')

describe('Suppression list', () => {
  const listMock = jest.fn()
  const deleteMock = jest.fn()
  const spark = {
    suppressionList: {
      list: listMock,
      delete: deleteMock
    }
  }
  const suppressionList = new SuppressionList(spark)

  it('Should get suppression list', async () => {
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
        },
        {
          recipient: 'rcpt2@example.com',
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

    const list = await suppressionList.get()
    expect(listMock).toHaveBeenCalled()
    expect(list).toEqual(['rcpt1@example.com', 'rcpt2@example.com'])
  })

  it('Should remove email from suppression list', async () => {
    await suppressionList.remove('rcpt1@example.com')
    expect(deleteMock).toHaveBeenCalledTimes(1)
    expect(deleteMock).toHaveBeenCalledWith('rcpt1@example.com')
  })
})
