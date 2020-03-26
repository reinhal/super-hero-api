/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const { describe, it } = require('mocha')
const { heroesList, singleHero } = require('../mocks/heroes')
const { getAllHeroes, getHeroBySlug, saveNewHero } = require('../../controllers/heroes')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - heroes', () => {
  describe('getAllHeroes', () => {
    it('retrieves a list of heroes from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.heroes, 'findAll').returns(heroesList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllHeroes({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(heroesList)
    })
  })

  describe('getHeroBySlug', () => {
    it('retrieves the hero associated with the provided slug from the database and calls response.send with it', async () => {
      const request = { params: { slug: 'iron-man' } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }
      const stubbedFindOne = sinon.stub(models.heroes, 'findOne').returns(singleHero)

      await getHeroBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'iron-man' } })
      expect(stubbedSend).to.have.been.calledWith(singleHero)
    })
  })

  describe('saveNewHero', () => {
    it('accepts new hero details and saves them as a new hero, returning the saved record with a 201 status', async () => {
      const request = { body: singleHero }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }
      const stubbedCreate = sinon.stub(models.heroes, 'create').returns(singleHero)

      await saveNewHero(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleHero)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleHero)
    })
  })
})
