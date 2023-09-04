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
}

export default dbUserController;