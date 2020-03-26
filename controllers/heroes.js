const heroes = require('../heroes')

const getAllHeroes = (request, response) => {
  return response.send(heroes)
}

const getHeroBySlug = (request, response) => {
  const { slug } = request.params

  const foundHero = heroes.filter((hero) => { hero.slug === slug })

  return response.send(foundHero)
}

const saveNewHero = (request, response) => {
  const { name, realname, firstappearance, slug } = request.body

  if (!name || !realname || !firstappearance || !slug) {
    return response.status(400).send('The following fields are required: name, realname, firstappearance, slug')
  }

  const newHero = { name, realname, firstappearance, slug }

  heroes.push(newHero)

  return response.status(201).send(newHero)
}

module.exports = { getAllHeroes, getHeroBySlug, saveNewHero }
