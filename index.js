const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const { getAllHeroes, getHeroBySlug, saveNewHero } = require('./controllers/heroes')

const app = express()

app.use(cors())
app.use(express.static('client/build'))

app.get('/api/heroes', getAllHeroes)

app.get('/api/heroes/:slug', getHeroBySlug)

app.post('/api/heroes', bodyParser.json(), saveNewHero)

app.all('*', (request, response) => response.sendFile(path.resolve(__dirname, 'client/build', 'index.html')))

app.listen(1337, () => {
  console.log('Listening on port 1337...') // eslint-disable-line no-console
})
