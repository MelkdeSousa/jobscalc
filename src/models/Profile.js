const connection = require('../database/connection')

module.exports = {
  async get() {
    const database = await connection()

    const data = await database.get(`SELECT * FROM profile`)

    await database.close()

    return {
      id: data.id,
      name: data.name,
      avatar: data.avatar,
      'monthly-budget': data.monthly_budget,
      'days-per-week': data.days_per_week,
      'hours-per-day': data.hours_per_day,
      'vacation-per-year': data.vacation_per_year,
      'value-hour': data.value_hour,
    }
  },

  async update(newData) {
    const database = await connection()

    await database.run(`
      UPDATE profile SET
        name = '${newData.name}',
        avatar = '${newData.avatar}',
        monthly_budget = ${newData['monthly-budget']},
        days_per_week = ${newData['days-per-week']},
        hours_per_day = ${newData['hours-per-day']},
        vacation_per_year = ${newData['vacation-per-year']},
        value_hour = ${newData['value-hour']}

      WHERE
        id = ${newData.id};
      `)

    await database.close()
  },
}
