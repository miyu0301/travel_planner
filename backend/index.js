import express from "express"
import cors from "cors"
import user from "./dbUserController.js"
import travel from "./dbTravelController.js"
import plan from "./dbPlanController.js"
import detail from "./dbPlanDetailController.js"
import dotenv from 'dotenv';
import session from 'express-session';

const ses_opt = {
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
};

dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())

app.use(session(ses_opt));
app.use(express.urlencoded());
// app.use(express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname, 'public'))

app.get("/", (req, res) => {
  res.json("hello")
})

app.post("/login", user.validateLogin);

app.get("/travels/:id", travel.fetchAllTravelInformation);
app.get("/travel/:id", travel.fetchTravelInformation);
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