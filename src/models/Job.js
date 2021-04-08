let data = []

module.exports = {
  get() {
    return data
  },

  create(newData) {
    data.push(newData)
  },

  update(newData) {
    data = newData
  },

  delete(id) {
    data = data.filter(job => Number(job.id) !== Number(id))
  },
}
