let data = {
  avatar: 'https://github.com/MelkdeSousa.png',
  name: 'Melk de Sousa',
  'monthly-budget': 3000,
  'days-per-week': 5,
  'hours-per-day': 5,
  'vacation-per-year': 4,
  'value-hour': 30,
}

module.exports = {
  get() {
    return data
  },

  update(newData) {
    data = newData
  },
}
