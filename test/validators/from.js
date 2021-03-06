/* global describe it */
const expect = require('chai').expect
const from = require('../../src/validators/from')
const rules = require('../../src/constants/rules')

describe('FROM validator', () => {
  it('should accept `scratch` image name', () => {
    const state = from('scratch')

    expect(state).to.be.an('object')
    expect(state).to.have.deep.property('valid', true)
  })

  it('should emmit error FRM001 if `tag` is empty', () => {
    const state = from('ubuntu:')

    expect(state).to.be.an('object')
    expect(state).to.have.deep.property('valid', false)
    expect(state).to.have.property('rule')
    expect(state.rule).to.deep.equal(rules.FRM001)
  })

  it('should emmit error FRM001 if `digest` is empty', () => {
    const state = from('ubuntu@')

    expect(state).to.be.an('object')
    expect(state).to.have.deep.property('valid', false)
    expect(state).to.have.property('rule')
    expect(state.rule).to.deep.equal(rules.FRM001)
  })

  it('should accept valid image with tag', () => {
    const state = from('ubuntu:14.04')

    expect(state).to.be.an('object')
    expect(state).to.have.deep.property('valid', true)
  })

  it('should accept valid image with digest', () => {
    const state = from('ouruser/sinatra@cbbf2f9a99b47fc460d422812b6a5adff7dfee951d8fa2e4a98caa0382cfbdbf')

    expect(state).to.be.an('object')
    expect(state).to.have.deep.property('valid', true)
  })

  it('should emmit warn FROM002 if image `tag` or `digest` is omitted', () => {
    const state = from('ubuntu')

    expect(state).to.be.an('object')
    expect(state).to.have.deep.property('valid', false)
    expect(state).to.have.property('rule')
    expect(state.rule).to.deep.equal(rules.FROM002)
  })

  it('should emmit warn FROM002 if `latest` is used', () => {
    const state = from('ubuntu:latest')

    expect(state).to.be.an('object')
    expect(state).to.have.deep.property('valid', false)
    expect(state).to.have.property('rule')
    expect(state.rule).to.deep.equal(rules.FROM002)
  })
})
