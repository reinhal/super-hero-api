const heroes = require('../heroes')

const getAllHeroes = (request, response) => {
  return response.send(heroes)
}

const getHeroBySlug = (request, response) => {
  const { slug } = request.params

  const foundHero = heroes.filter((hero) => { hero.slug === slug })

  return response.send(foundHero)
}

module.exports = { getAllHeroes, getHeroBySlug }
