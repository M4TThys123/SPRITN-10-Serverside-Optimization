require('dotenv').config()
const express = require('express')
const compression = require('compression')
const app = express()
const res = require('express/lib/response')
const { request } = require('express')
const cache = require('./scripts/routeCache')



// API
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const url = 'https://codingthecurbs.api.fdnd.nl/v1/smartzone'


// Stel ejs in als template engine
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(compression())

// Stel caching headers in
app.use(function (req, res, next) {
  if (req.method == 'GET') {
    res.set('Cache-control', 'public, max-age=300')
  } else {
    res.set('Cache-control', `no-store`)
  }
  next()
})

// Stel een static map in
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', function (req, res) {
  // res.send('Hello world!')
  res.render('index', {
    pageTitle: 'Performance Optimalisatie',
  })
})

// Zwengel de server aan
app.set('port', process.env.PORT || 8000)
const server = app.listen(app.get('port'), function () {
  console.log(`Application started on port: ${app.get('port')}`)
})

// Render
app.get('/render', (req, res) => {
  fetchJson(url).then(function (jsonData) {
    res.render('render', {
      smartzones: jsonData.data,
    })
  })
})


async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}
console.log(url.smartzones)