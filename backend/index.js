import express from "express"
import cors from "cors"
import user from "./dbUserController.js"
import travel from "./dbTravelController.js"
import plan from "./dbPlanController.js"
import detail from "./dbPlanDetailController.js"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express()
app.use(express.json())
// app.use(cookieParser({
//   maxAge: 60 * 60 * 1000,
//   httpOnly: false,
//   secure: true
// }))
app.use(cookieParser())
// app.use(cors({
//   origin: process.env.CLIENT_API,
//   methods: ["GET", "POST", "PUT"],
//   credentials: true,
// }))

app.get("/", (req, res) => {
  res.json("hello")
})

// test
const cookieConfig = {
  httpOnly: false,
  secure: true,
  sameSite: 'none',
  maxAge: 30 * 24 * 60 * 60 * 1000, //30days
}
const corsConfig2 = {
  origin: process.env.CLIENT_API,
  credentials: true
};
app.use(cors(corsConfig2));
app.use(express.urlencoded({ extended: true }));
app.get("/token", (_, res) => {
  const token = `Bearer ${Math.random()}`
  res.cookie('jwt', token, cookieConfig).json({ success: true, user_id: 12 });
})
app.get('/test', (req,res) => {
  console.log("test")
  const reqCookies = req.cookies.jwt;
  res.cookie('jwt', reqCookies, cookieConfig).json({ cookie: req.cookies });
})

app.post("/login", user.login);
app.get("/logout", user.logout);
app.post("/user", user.user);
app.post("/register", user.register);

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

app.listen(8800, () => {
  console.log("connected to backend!!")
})