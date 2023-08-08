import db from "./dbConfig.js"

const dbTravelController = {
  fetchAllTravelInformation : (req, res) => {
    const q = "select * from travel_information;"
    try{
      db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
      })
    }catch(err){
      console.log(error)
    }
  },

  // fetchTravelInformation : (req, res) => {
  //   const travelId = req.params.id;
  //   const q = "select * from travel_information where travel_id = ?;"
  //   try{
  //     db.query(q, [travelId], (err, data) => {
  //       if(err) return res.json(err)
  //       return res.json(data)
  //     })
  //   }catch(err){
  //     console.log(error)
  //   }
  // },

  fetchTravelInformation : (req, res) => {
    const travelId = req.params.id;
    const q = "select * from travel_information " +
              "inner join plan on travel_information.travel_id = plan.travel_id " +
              "inner join plan_detail on plan.plan_id = plan_detail.plan_id " +
              "where travel_information.travel_id = ?;"
    try{
      db.query(q, [travelId], (err, data) => {
        if(err) return res.json(err)
        let result = {};
        let plan = [];
        let plan_detail = [];
        const datas = data;

        for (let i = 0; i < datas.length; i++) {
          let detail = {};
          detail['travel_id'] = datas[i].travel_id;
          detail['plan_id'] = datas[i].plan_id;
          detail['plan_detail_id'] = datas[i].plan_detail_id;
          detail['start_time'] = datas[i].start_time;
          detail['end_time'] = datas[i].end_time;
          detail['detail'] = datas[i].detail;
          detail['map'] = datas[i].map;
          detail['memo'] = datas[i].memo;
          plan_detail.push(detail);
          if((i != 0 && datas[i-1].plan_id != datas[i].plan_id) || datas.length == i-1){
            let obj = {
              travel_id: datas[i].travel_id,
              plan_id: datas[i].plan_id,
              plan_date: datas[i].plan_date,
              plan_detail: plan_detail
            }
            plan_detail = []
            plan.push(obj)
          }
        }
        result['travel_id'] = datas[0].travel_id
        result['travel_name'] = datas[0].travel_name
        result['plan'] = plan
        return res.json(result);
      })
    }catch(err){
      console.log(error)
    }
  },

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

  deleteTravelInformation: (req, res) => {
    const travelId = req.params.id;
    const q = "delete from travel_information where travel_id = ?"
    try{
      db.query(q, [travelId], (err, data) => {
        if(err) return res.json(err)
          return res.json(data)
      })  
    } catch (error) {
      console.log(error)
    }
  },
}

export default dbTravelController;