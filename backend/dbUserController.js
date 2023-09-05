import db from "./dbConfig.js"
import bcrypt from 'bcrypt';

const dbUserController = {
  validateLogin : (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const q = "select * from user where email = ?;"
    const values = [ email ]
    try{
      db.query(q, [values], async(err, data) => {
        if(err) return res.json(err);
      
        if(data.length != 0){
          const compared = await bcrypt.compare(password, data[0].password);
          if(compared){
            req.session.login = data[0].email;
            console.log(req.session);
            return  res.json({ success: true, user_id: data[0].user_id });
          }else{
            return  res.json({ success: false, user_id: null });
          }
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