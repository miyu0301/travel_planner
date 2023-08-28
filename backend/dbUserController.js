import db from "./dbConfig.js"

const dbUserController = {
  validateLogin : (req, res) => {
    const q = "select * from user where email = ?;"
    const values = [ req.body.email ]
    try{
      db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        if(data.length != 0){
          return  res.json({ success: true, user_id: data[0].user_id });
        }else{
          return  res.json({ success: false, user_id: null });
        }
      })
    }catch(err){
      console.log(error)
    }
  },

  // insertPlan: (req, res) => {
  //   const q = "insert into plan (`travel_id`, `plan_date`) values (?);"
  //   const values = [ req.body.travel_id, req.body.plan_date ]
  
  //   try {
  //     db.query(q, [values], (err, data) => {
  //       if(err) throw res.json(err);
  //       return res.json(data)
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
}

export default dbUserController;