import express from "express"
import cors from "cors"
import user from "./dbUserController.js"
import travel from "./dbTravelController.js"
import plan from "./dbPlanController.js"
import detail from "./dbPlanDetailController.js"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json("hello")
})

app.post("/login", user.validateLogin);

app.get("/travels/:id", travel.fetchAllTravelInformation);
app.get("/travel/:id", travel.fetchTravelInformation);
// app.get("/travel_plans/:id", travel.fetchTravelPlans);
app.post("/travel", travel.insertTravelInformation);
app.put("/travel/:id", travel.updateTravelInformation);
app.delete("/travel/:id", travel.deleteTravelInformation);

app.post("/plan", plan.insertPlan);
app.put("/plan/:id", plan.updatePlan);
app.delete("/plan/:id", plan.deletePlan);

app.post("/plan_detail", detail.insertPlanDetail);
app.put("/plan_detail/:id", detail.updatePlanDetail);
app.delete("/plan_detail/:id", detail.deletePlanDetail);


app.listen(8800, '0.0.0.0', () => {
  console.log("connected to backend!!")
})