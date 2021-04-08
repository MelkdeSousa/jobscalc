const connection = require('./connection')

const initialize = async () => {
  const database = await connection()

  await database.exec(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget REAL,
      days_per_week INTEGER,
      hours_per_day REAL,
      vacation_per_year INTEGER,
      value_hour REAL
    );
  `)

  await database.exec(`
    CREATE TABLE IF NOT EXISTS job (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      total_hours REAL,
      daily_hours REAL,
      created_at DATETIME
    );
  `)

  await database.run(`
    INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
      value_hour
    ) VALUES (
      "Melk de Sousa",
      "https://github.com/melkdesousa.png",
      4500,
      5,
      6,
      10,
      25
    );
  `)

  await database.close()
}

initialize()
