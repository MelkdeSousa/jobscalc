const JobModel = require('../models/Job')
const ProfileModel = require('../models/Profile')

const JobLib = require('../lib/Job')

module.exports = {
  index(req, res) {
    const jobs = JobModel.get()
    const profile = ProfileModel.get()

    const statusJobs = {
      total: jobs.length,
      done: 0,
      progress: 0,
    }

    let jobTotalHours = 0

    const updatedJobs = jobs.map(job => {
      const remaining = JobLib.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'

      statusJobs[status] += 1

      jobTotalHours =
        status === 'progress'
          ? jobTotalHours + Number(job['daily-hours'])
          : jobTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: JobLib.calculateBudget(job, profile['value-hour']),
      }
    })

    const freeHours = profile['hours-per-day'] - jobTotalHours

    return res.render('index', {
      profile,
      jobs: updatedJobs,
      statusJobs,
      freeHours,
    })
  },
}
