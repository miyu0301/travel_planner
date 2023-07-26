import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "travel_planner",
  multipleStatements: true
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json("hello")
})

app.get("/top", (req, res) => {
  const q = "select * from travel_information"
  db.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.post("/travel", (req, res) => {
  const q = "insert into travel_information (`travel_name`) values (?);"
  const values = [ req.body.travel_name ]

  try {
    db.query(q, [values], (err, data) => {
      if(err) throw res.json(err);
      return res.json(data);
    })
  } catch (error) {
    console.log(error)
  }
})

// save plan table
app.post("/plan", (req, res) => {
  const q = "insert into plan (`travel_id`, `plan_date`) values (?);"
  const values = [ req.body.travel_id, req.body.plan_date ]

  try {
    db.query(q, [values], (err, data) => {
      if(err) throw res.json(err);
      return res.json(data)
    })
  } catch (error) {
    console.log(error)
  }
})

// save detail table
app.post("/plan_detail", (req, res) => {
  const q = "insert into plan_detail (`travel_id`, `plan_id`) values (?);"
  const values = [ req.body.travel_id, req.body.plan_id ]

  try {
    db.query(q, [values], (err, data) => {
      if(err) throw res.json(err);
      return res.json(data)
    })
  } catch (error) {
    console.log(error)
  }
})

app.delete("/top/:id", (req, res) => {
  const travelId = req.params.id;
  const q = "delete from travel_information where travel_id = ?"
  db.query(q, [travelId], (err, data) => {
    if(err) return res.json(err)
    return res.json("travel has been deleted successfully.")
  })
})

app.put("/top/:id", (req, res) => {
  const travelId = req.params.id;
  const q = "update travel_information set `travel_name` = ? where travel_id = ?";
  const values = [ req.body.travel_name ]

  db.query(q, [...values, travelId], (err, data) => {
    if(err) return res.json(err)
    return res.json("travel has been updated successfully.")
  })
})

app.listen(8800, () => {
  console.log("connected to backend!!")
})