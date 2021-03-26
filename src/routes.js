const routes = require('express').Router()

const profile = {
  avatar: 'https://github.com/MelkdeSousa.png',
  name: 'Melk de Sousa',
}

routes.get('/', (req, res) => res.render('index', { profile }))
routes.get('/index', (req, res) => res.redirect('/'))
routes.get('/job', (req, res) => res.render('job'))
routes.get('/job/edit', (req, res) => res.render('job-edit'))
routes.get('/profile', (req, res) => res.render('profile', { profile }))

module.exports = routes
