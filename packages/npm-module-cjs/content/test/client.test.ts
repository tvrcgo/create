import assert from 'assert'
import { Client } from '../src/index'

describe('client', () => {

  const client = new Client({
    ak: 'ak',
    sk: 'sk',
  })

  it('version', async () => {
    const res = client.version()
    assert(res.ok === 1)
  })

})
