const ProfileModel = require('../models/Profile')
const JobModel = require('../models/Job')

const JobLib = require('../lib/Job')

module.exports = {
  create(req, res) {
    const jobs = JobModel.get()

    const lastId = jobs.length ? jobs.length + 1 : 1

    const job = {
      ...req.body,
      createdAt: Date.now(),
      id: lastId,
    }

    JobModel.create(job)

    return res.redirect('/')
  },

  show(req, res) {
    const jobs = JobModel.get()
    const profile = ProfileModel.get()

    const jobId = req.params.id

    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.redirect('/')
    }

    job.budget = JobLib.calculateBudget(job, profile['value-hour'])

    return res.render('job-edit', { job })
  },

  update(req, res) {
    const jobs = JobModel.get()

    const jobId = req.params.id

    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.redirect('/')
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      'total-hours': Number(req.body['total-hours']),
      'daily-hours': Number(req.body['daily-hours']),
    }

    const newJobs = jobs.map(job => {
      if (Number(job.id) === Number(jobId)) {
        return updatedJob
      }

      return job
    })

    JobModel.update(newJobs)

    res.redirect(`/job/${jobId}`)
  },

  delete(req, res) {
    const jobId = req.params.id

    JobModel.delete(jobId)

    return res.redirect('/')
  },
}
