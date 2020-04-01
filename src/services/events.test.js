const Events = require('./events')

describe('events', () => {
  const searchMessageMock = jest.fn()
  const spark = {
    events: {
      searchMessage: searchMessageMock
    }
  }
  const events = new Events(spark)

  it('Should get suppression list', async () => {
    searchMessageMock.mockResolvedValue({
      results: [
        {
          friendly_from: 'test@test.com',
          subject: 'Hello, World!',
          ip_pool: 'shared',
          sending_domain: 'test.com',
          rcpt_tags: [],
          type: 'bounce',
          num_retries: '0',
          bounce_class: '10',
          raw_rcpt_to: 'suppressed@test.com',
          msg_from: 'msprvs1=18360G4WGIX6f=bounces-10075@eu.sparkpostmail1.com',
          recv_method: 'rest',
          rcpt_to: 'suppressed@test.com',
        },
        {
          friendly_from: 'test@test.com',
          subject: 'Hello, World!',
          ip_pool: 'shared',
          sending_domain: 'test.com',
          rcpt_tags: [],
          type: 'bounce',
          num_retries: '0',
          bounce_class: '10',
          raw_rcpt_to: 'suppressed@test.com',
          msg_from: 'msprvs1=18360G4WGIX6f=bounces-10075@eu.sparkpostmail1.com',
          recv_method: 'rest',
          rcpt_to: 'suppressed@test.com',
        }
      ],
      links: [],
      total_count: 2
    })

    const result = await events.getNumberOfBounces('suppressed@test.com')
    expect(searchMessageMock).toHaveBeenCalled()
    expect(result).toEqual(2)
  })
})
