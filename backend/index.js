import express from "express"
import cors from "cors"
import user from "./dbUserController.js"
import travel from "./dbTravelController.js"
import plan from "./dbPlanController.js"
import detail from "./dbPlanDetailController.js"
import dotenv from 'dotenv';
import session from "express-session";

dotenv.config();
const app = express()
app.set("trust proxy", 1);
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: process.env.NODE_ENV !== 'dev' ? false : true,
    secure: process.env.NODE_ENV !== 'dev',
    sameSite: process.env.NODE_ENV === 'dev' ? 'lax' : 'none',
    maxAge: 10 * 24 * 60 * 60 * 1000, //10days
  }
}));
app.use(cors({
  origin: process.env.CLIENT_API,
  credentials: true
}));

app.get("/", (req, res) => {
  res.json("hello")
})

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

app.post("/login", user.login);
app.get("/logout", user.logout);
app.post("/user", user.user);
app.post("/register", user.register);

app.get("/travels/:id", isAuthenticated, travel.fetchAllTravelInformation);
app.get("/travel/:id", isAuthenticated, travel.fetchTravelInformation);
app.post("/travel", isAuthenticated, travel.insertTravelInformation);
app.put("/travel/:id", isAuthenticated, travel.updateTravelInformation);
app.delete("/travel/:id", isAuthenticated, travel.deleteTravelInformation);

app.post("/plan", isAuthenticated, plan.insertPlan);
app.put("/plan/:id", isAuthenticated, plan.updatePlan);
app.delete("/plan/:id", isAuthenticated, plan.deletePlan);

app.post("/plan_detail", isAuthenticated, detail.insertPlanDetail);
app.put("/plan_detail/:id", isAuthenticated, detail.updatePlanDetail);
app.delete("/plan_detail/:id", isAuthenticated, detail.deletePlanDetail);

app.get("/checkCookieValidity", (req, res) => {
  try{
      if (req.session && req.session.isAuthenticated) {
        return res.status(200);
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }catch(error){
    console.log(error)
  }
});

app.listen(8800, () => {
  console.log("connected to backend!!")
})