const routes = require('express').Router()

const ProfileController = require('./controllers/Profile')
const JobController = require('./controllers/Job')
const DashboardController = require('./controllers/Dashboard')

let jobs = []

routes.get('/', DashboardController.index)
routes.get('/index', (req, res) => res.redirect('/'))

routes.get('/job', (req, res) => res.render('job'))
routes.post('/job', JobController.create)

routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)

routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes
