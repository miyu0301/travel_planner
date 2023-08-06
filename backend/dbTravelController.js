import db from "./dbConfig.js"

const dbTravelController = {
  insertTravelInformation : (req, res) => {
    const q = "insert into travel_information (`travel_name`) values (?);"
    const values = [ req.body.travel_name ]
    try {
      db.query(q, [values], (err, data) => {
        if(err) throw res.json(err);
        return res.json(data);
      })
    } catch (error) {
      console.log(error)
    }
  },
  
  updateTravelInformation : (req, res) => {
    const travelId = req.params.id;
    const q = "update travel_information set `travel_name` = ? where travel_id = ?";
    const values = [ req.body.travel_name ]
  
    try {
      db.query(q, [...values, travelId], (err, data) => {
        if(err) throw res.json(err);
        return res.json(data);
      })
    } catch (error) {
      console.log(error)
    }
  },
}

export default dbTravelController;