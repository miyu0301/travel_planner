import express from "express"
import cors from "cors"
import db from "./dbConfig.js"

const app = express()

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
app.put("/travel/:id", (req, res) => {
  const travelId = req.params.id;
  const q = "update travel_information set `travel_name` = ? where travel_id = ?";
  const values = [ req.body.travel_name ]

  try {
    db.query(q, [...values, travelId], (err, data) => {
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
app.put("/plan/:id", (req, res) => {
  const planId = req.params.id;
  const q = "update plan set `plan_date` = ? where plan_id = ?";
  const values = [ req.body.plan_date ]

  try {
    db.query(q, [...values, planId], (err, data) => {
      if(err) throw res.json(err);
      return res.json(data)
    })
  } catch (error) {
    console.log(error)
  }
})
app.delete("/plan/:id", (req, res) => {
  const planId = req.params.id;
  const q = "delete from plan where plan_id = ?"
  try{
    db.query(q, [planId], (err, data) => {
      if(err) return res.json(err)
        return res.json(data)
    })  
  } catch (error) {
    console.log(error)
  }
})


// save detail table
app.post("/plan_detail", (req, res) => {
  const q = "insert into plan_detail (`travel_id`, `plan_id`, `start_time`, `end_time`, `detail`, `memo`) values (?);"
  const values = [
    req.body.travel_id,
    req.body.plan_id,
    req.body.start_time,
    req.body.end_time,
    req.body.detail,
    req.body.memo,
  ]

  try {
    db.query(q, [values], (err, data) => {
      if(err) throw res.json(err);
      return res.json(data)
    })
  } catch (error) {
    console.log(error)
  }
})
app.put("/plan_detail/:id", (req, res) => {
  const detailId = req.params.id;
  const q = "update plan_detail set `start_time` = ?, `end_time` = ?, `detail` = ?, `memo` = ?  where plan_detail_id = ?";
  const values = [
    req.body.start_time,
    req.body.end_time,
    req.body.detail,
    req.body.memo,
  ]

  try {
    db.query(q, [...values, detailId], (err, data) => {
      if(err) throw res.json(err);
      return res.json(data)
    })
  } catch (error) {
    console.log(error)
  }
})
app.delete("/plan_detail/:id", (req, res) => {
  const detailId = req.params.id;
  const q = "delete from plan_detail where plan_detail_id = ?"
  try{
    db.query(q, [detailId], (err, data) => {
      if(err) return res.json(err)
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