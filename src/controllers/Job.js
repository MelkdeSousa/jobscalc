const ProfileModel = require('../models/Profile')
const JobModel = require('../models/Job')

const JobLib = require('../lib/Job')

module.exports = {
  async create(req, res) {
    const job = {
      ...req.body,
      createdAt: Date.now(),
    }

    await JobModel.create(job)

    return res.redirect('/')
  },

  async show(req, res) {
    const jobs = await JobModel.get()
    const profile = await ProfileModel.get()

    const jobId = req.params.id

    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.redirect('/')
    }

    job.budget = JobLib.calculateBudget(job, profile['value-hour'])

    return res.render('job-edit', { job })
  },

  async update(req, res) {
    const jobId = req.params.id

    const updatedJob = {
      name: req.body.name,
      'total-hours': Number(req.body['total-hours']),
      'daily-hours': Number(req.body['daily-hours']),
    }

    await JobModel.update(updatedJob, jobId)

    res.redirect(`/job/${jobId}`)
  },

  async delete(req, res) {
    const jobId = req.params.id

    await JobModel.delete(jobId)

    return res.redirect('/')
  },
}
