import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "travel_planner"
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

app.post("/travels", (req, res) => {
    const q = "insert into travel_information (`travel_name`) values (?)"
    const values = [ req.body.travel_name ]

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("travel has been created");
    })
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