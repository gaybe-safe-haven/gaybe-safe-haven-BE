import { expect } from 'chai'
import * as test from '../src/example.js'

describe('Github Actions Test', () => {
  it('should return true if given a value', () => {
    const example = test.testFunction('working')
    expect(example).to.equal(true)
  })
})
