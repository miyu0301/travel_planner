import db from "./dbConfig.js"

const dbPlanDetailController = {
  insertPlanDetail: (req, res) => {
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
  },

  updatePlanDetail: (req, res) => {
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
  },
  
  deletePlanDetail: (req, res) => {
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
  },
}

export default dbPlanDetailController;