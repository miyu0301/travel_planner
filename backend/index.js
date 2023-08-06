import express from "express"
import cors from "cors"
import travel from "./dbTravelController.js"
import plan from "./dbPlanController.js"
import detail from "./dbPlanDetailController.js"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json("hello")
})

// app.get("/top", (req, res) => {
//   const q = "select * from travel_information"
//   db.query(q, (err, data) => {
//     if(err) return res.json(err)
//     return res.json(data)
//   })
// })

app.post("/travel", travel.insertTravelInformation);
app.put("/travel/:id", travel.updateTravelInformation);

app.post("/plan", plan.insertPlan);
app.put("/plan/:id", plan.updatePlan);
app.delete("/plan/:id", plan.deletePlan);

app.post("/plan_detail", detail.insertPlanDetail);
app.put("/plan_detail/:id", detail.updatePlanDetail);
app.delete("/plan_detail/:id", detail.deletePlanDetail);


app.listen(8800, () => {
  console.log("connected to backend!!")
})