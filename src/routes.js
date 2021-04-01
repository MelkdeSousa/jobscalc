const routes = require('express').Router()

const Profile = {
  data: {
    avatar: 'https://github.com/MelkdeSousa.png',
    name: 'Melk de Sousa',
    'monthly-budget': 3000,
    'days-per-week': 5,
    'hours-per-day': 5,
    'vacation-per-year': 4,
    'value-hour': 30,
  },
}

let jobs = []

const remainingDays = job => {
  const remainingDays = Math.floor(job['total-hours'] / job['daily-hours'])

  const createdDate = new Date(job.createdAt)
  const dueDay = createdDate.getDate() + remainingDays
  const dueDateInMs = createdDate.setDate(dueDay)

  const timeDiffInMs = dueDateInMs - Date.now()

  const dayInMs = 1000 * 60 * 60 * 24
  const dayDiff = Math.floor(timeDiffInMs / dayInMs)

  return dayDiff
}

const calculateBudget = (job, valueHour) => valueHour * job['total-hours']

routes.get('/', (req, res) => {
  const updatedJobs = jobs.map(job => {
    const remaining = remainingDays(job)
    const status = remaining <= 0 ? 'done' : 'progress'

    return {
      ...job,
      remaining,
      status,
      budget: calculateBudget(job, Profile.data['value-hour']),
    }
  })

  return res.render('index', { profile: Profile.data, jobs: updatedJobs })
})
routes.get('/index', (req, res) => res.redirect('/'))

routes.get('/job', (req, res) => res.render('job'))
routes.post('/job', (req, res) => {
  const lastId = jobs.length ? jobs.length + 1 : 1

  const job = {
    ...req.body,
    createdAt: Date.now(),
    id: lastId,
  }

  jobs.push(job)

  return res.redirect('/')
})

routes.get('/job/:id', (req, res) => {
  const jobId = req.params.id

  const job = jobs.find(job => job.id === Number(jobId))

  if (!job) {
    return res.redirect('/')
  }

  job.budget = calculateBudget(job, Profile.data['value-hour'])

  return res.render('job-edit', { job })
})
routes.post('/job/:id', (req, res) => {
  const jobId = req.params.id

  const job = jobs.find(job => job.id === Number(jobId))

  if (!job) {
    return res.redirect('/')
  }

  const updatedJob = {
    ...job,
    name: req.body.name,
    'total-hours': Number(req.body['total-hours']),
    'daily-hours': Number(req.body['daily-hours']),
  }

  jobs = jobs.map(job => {
    if (job.id === Number(jobId)) {
      return updatedJob
    }

    return job
  })

  res.redirect(`/job/${jobId}`)
})
routes.post('/job/delete/:id', (req, res) => {
  const jobId = req.params.id

  jobs = jobs.filter(job => job.id !== Number(jobId))

  return res.redirect('/')
})

routes.get('/profile', (req, res) =>
  res.render('profile', { profile: Profile.data })
)
routes.post('/profile', (req, res) => {
  const data = req.body

  const weeksPerYear = 52
  const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12
  const weekTotalHours = data['hours-per-day'] * data['days-per-week']
  const monthlyTotalHours = weekTotalHours * weeksPerMonth

  const valueHour = data['monthly-budget'] / monthlyTotalHours

  Profile.data = {
    ...Profile.data,
    ...req.body,
    'value-hour': valueHour,
  }

  return res.redirect('/profile')
})

module.exports = routes
