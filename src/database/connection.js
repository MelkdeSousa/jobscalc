const { resolve } = require('path')
const { open } = require('sqlite')
const sqlite = require('sqlite3')

module.exports = async () =>
  await open({
    filename: resolve(__dirname, 'database.sqlite'),
    driver: sqlite.Database,
  })
