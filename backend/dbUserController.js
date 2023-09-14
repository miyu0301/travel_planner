import db from "./dbConfig.js"
import bcrypt from 'bcrypt';

const dbUserController = {
  login : (req, res) => {
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
            res.cookie('user_id', data[0].user_id, { maxAge: 60 * 60 * 1000, httpOnly: false });
            return  res.json({ success: true, user_id: data[0].user_id });
          }else{
            return  res.json({ success: false, user_id: null });
          }
        }else{
          return  res.json({ success: false, user_id: null });
        }
      })
    }catch(err){
      console.log(err)
    }
  },
  logout : (req, res) => {
    try{
      res.clearCookie('user_id');
      return res.json();
    }catch(err){
      console.log(err);
    }
  },
  register : async(req, res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    const q = "insert into user (`user_name`, `email`, `password`) values (?);"
    const values = [
      req.body.userName,
      req.body.email,
      hashedPassword
    ]
    try {
      db.query(q, [values], (err, data) => {
        if(err) throw res.json(err);
        res.cookie('user_id', data['insertId'], { maxAge: 60 * 60 * 1000, httpOnly: false });
        return res.json(data)
      })
    } catch (error) {
      console.log(error)
    }
  },
}

export default dbUserController;