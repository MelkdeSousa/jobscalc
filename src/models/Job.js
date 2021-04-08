const connection = require('../database/connection')

module.exports = {
  async get() {
    const database = await connection()

    const jobs = await database.all(`SELECT * FROM job`)

    await database.close()

    return jobs.map(({ id, name, total_hours, daily_hours, created_at }) => ({
      id: id,
      name: name,
      'total-hours': total_hours,
      'daily-hours': daily_hours,
      createdAt: created_at,
    }))
  },

  async create(newData) {
    const database = await connection()

    await database.run(`
      INSERT INTO job (name, total_hours, daily_hours, created_at)
      VALUES (
          "${newData.name}",
          ${newData['total-hours']},
          ${newData['daily-hours']},
          ${newData.createdAt}
        );
    `)

    await database.close()
  },

  async update(updatedJob, id) {
    const database = await connection()

    await database.run(`
      UPDATE job SET
        name = "${updatedJob.name}",
        total_hours = ${updatedJob['total-hours']},
        daily_hours = ${updatedJob['daily-hours']}

      WHERE id = ${id};
      `)

    await database.close()
  },

  async delete(id) {
    const database = await connection()

    await database.run(`DELETE FROM job WHERE id = ${id}`)

    await database.close()
  },
}
