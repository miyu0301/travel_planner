import db from "./dbConfig.js"

const dbTravelController = {
  fetchAllTravelInformation : (req, res) => {
    const q = "select t.travel_id, t.travel_name, " +
              'DATE_FORMAT(min(p.plan_date), "%Y-%m-%d") as min_date, DATE_FORMAT(max(p.plan_date), "%Y-%m-%d") as max_date ' +
              "from travel_information as t left outer join plan as p " +
              "on t.travel_id = p.travel_id where t.user_id = ? " +
              "group by t.travel_id, t.travel_name;"
    const userId = [ req.params.id ]
    try{
      db.query(q, [userId], (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
      })
    }catch(error){
      console.log(error)
    }
  },

  fetchTravelInformation : (req, res) => {
    let result = {};
    const travelId = req.params.id;
    const travel_q = "select * from travel_information where travel_id = ?"
    const plan_q = 'select p.plan_id, p.travel_id, DATE_FORMAT(p.plan_date, "%Y-%m-%d") as plan_date, ' +
                  "d.plan_detail_id, d.start_time, d.end_time, d.detail, d.map, d.memo from plan as p " +
                  "left outer join plan_detail as d on p.plan_id = d.plan_id " +
                  "where p.travel_id = ? " +
                  "order by p.plan_id;"
    try{
      db.query(travel_q, [travelId], (err, data) => {
        if(err) return res.json(err)
        result['user_id'] = data[0].user_id
        result['travel_id'] = data[0].travel_id
        result['travel_name'] = data[0].travel_name

        db.query(plan_q, [travelId], (err, datas) => {
          if(err) return res.json(err)
          if(datas){
            let plan = [];
            let plan_detail = [];
            const len = datas.length;
            for (let i = 0; i < len; i++) {
              if(datas[i].plan_detail_id){
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
              }

              if(len == i+1 || datas[i].plan_id != datas[i+1].plan_id){
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
            result['plan'] = plan
            return res.json(result);
          }
        })
      })

    }catch(error){
      console.log(error)
    }
  },

  insertTravelInformation : (req, res) => {
    const q = "insert into travel_information (`user_id`, `travel_name`) values (?);"
    const values = [ req.body.user_id, req.body.travel_name ]
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
    const q = "delete t, p, d from travel_information as t " +
              "left join plan as p on t.travel_id = p.travel_id " +
              "left join plan_detail as d on p.plan_id = d.plan_id " +
              "where t.travel_id = ?"
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