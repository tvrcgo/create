import assert from 'assert'
import { en } from '@/lib/hello'

describe('lib', () => {

  describe('hello', () => {

    it('echo en', async () => {
      assert(en() === 'hello')
    })
  })
})
