const ProfileModel = require('../models/Profile')

module.exports = {
  async index(req, res) {
    res.render('profile', { profile: await ProfileModel.get() })
  },

  async update(req, res) {
    const data = req.body

    const weeksPerYear = 52
    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12
    const weekTotalHours = data['hours-per-day'] * data['days-per-week']
    const monthlyTotalHours = weekTotalHours * weeksPerMonth

    const valueHour = data['monthly-budget'] / monthlyTotalHours

    const profile = await ProfileModel.get()

    await ProfileModel.update({
      ...profile,
      ...data,
      'value-hour': valueHour,
    })

    return res.redirect('/profile')
  },
}
