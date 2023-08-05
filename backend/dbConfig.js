import mysql from "mysql"

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "travel_planner",
  multipleStatements: true
})

export default db;