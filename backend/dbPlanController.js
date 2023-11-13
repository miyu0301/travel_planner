import db from "./dbConfig.js"

const dbPlanController = {
  insertPlan: (req, res) => {
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
  },

  updatePlan: (req, res) => {
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
  },
  
  deletePlan: (req, res) => {
    const planId = req.params.id;
    const q = "delete p, d from plan as p left join plan_detail as d " +
              "on p.plan_id = d.plan_id where p.plan_id = ?"
    try{
      db.query(q, [planId], (err, data) => {
        if(err) return res.json(err)
          return res.json(data)
      })  
    } catch (error) {
      console.log(error)
    }
  },
}

export default dbPlanController;