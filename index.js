const express = require('express')
const { getAllHeroes, getHeroBySlug } = require('./controllers/heroes')

const app = express()

app.get('/', getAllHeroes)

app.get('/:slug', getHeroBySlug)

app.listen(1337, () => {
  console.log('Listening on port 1337...') // eslint-disable-line no-console
})
