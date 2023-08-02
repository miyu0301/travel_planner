import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../css/style.css"

const Create = () => {
  const [travel, setTravel] = useState({
    travel_id: null,
    travel_name: "TRAVEL NAME",
    is_input: false
  });
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const saveTravel = async () => {
      let result = await axios.post("http://localhost:8800/travel", travel)
      setTravel({
        ...travel,
        travel_id: result.data.insertId,
      })
    }
    saveTravel();
  }, [])

  // 
  // TRAVEL
  // 
  const handleChangeTravel = (e) => {
    setTravel({
      ...travel,
      [e.target.name]: e.target.value,
    })
  }
  const handleClickTravelLabel = () => {
    setTravel({
      ...travel,
      is_input: true
    })
  }

  const handleBlurTravel = async (e) => {
      e.preventDefault()
    try{
      console.log("SAVE TRAVEL")
      console.log(travel)
      await axios.put("http://localhost:8800/travel/" + travel.travel_id, travel)
      setTravel({
        ...travel,
        is_input: false
      })
    }catch(err){
      console.log(err)
    }
  }
  
  // 
  // PLAN
  // 
  const handleClickAddPlan = () => {
    const new_plan = {
      travel_id: null,
      plan_id: null,
      plan_date: null,
      is_input: true,
      plan_detail: []
    }
    setPlans([...plans, new_plan]);
  };

  const handleClickPlanLabel = (p_idx) => {
    const updatedPlans = [...plans];
    updatedPlans[p_idx] = {
      ...updatedPlans[p_idx],
      is_input: true
    };
    setPlans(updatedPlans);
  };

  const handleChangePlan = (e, p_idx) => {
    const { name, value } = e.target;
    const updatedPlans = [...plans];
    updatedPlans[p_idx] = {
      ...updatedPlans[p_idx],
      [name]: value,
    };
    setPlans(updatedPlans);
  };

  const handleBlurPlan = async(e, p_idx) => {
    console.log("SAVE PLAN")
    e.preventDefault()
    try{
      plans[p_idx].travel_id = travel.travel_id
      if(!plans[p_idx].plan_id){
        let result = await axios.post("http://localhost:8800/plan", plans[p_idx])
        const updatePlans = [...plans];
        updatePlans[p_idx] = {
          ...updatePlans[p_idx],
          plan_id: result.data.insertId,
          is_input: false
        };
        setPlans(updatePlans)  
      }else{
        await axios.put("http://localhost:8800/plan/" + plans[p_idx].plan_id, plans[p_idx])
        const updatePlans = [...plans];
        updatePlans[p_idx] = {
          ...updatePlans[p_idx],
          is_input: false
        };
        setPlans(updatePlans)  
      }
    }catch(err){
      console.log(err)
    }
  };

  // 
  // DETAIL
  // 
  const handleClickAddDetail = (p_idx) => {
    const updatedPlans = [...plans];
    const new_detail = {
      plan_detail_id: null,
      travel_id: null,
      plan_id: null,
      start_time: null,
      end_time: null,
      detail: null,
      map: null,
      memo: null,
      is_input: true
    }
    updatedPlans[p_idx].plan_detail.push(new_detail)
    setPlans(updatedPlans)
  };


  const handleClickDetailLabel = (p_idx, d_idx) => {
    const updatedPlans = [...plans];
    updatedPlans[p_idx].plan_detail[d_idx] = {
      ...updatedPlans[p_idx].plan_detail[d_idx],
      is_input: true
    };
    setPlans(updatedPlans);
  };

  const handleChangeDetail = (e, p_idx, d_idx) => {
    const { name, value } = e.target;

    const updatedPlans = [...plans];
    updatedPlans[p_idx].plan_detail[d_idx] = {
      ...updatedPlans[p_idx].plan_detail[d_idx],
      [name]: value
    };
    console.log(updatedPlans[p_idx].plan_detail[d_idx])
    setPlans(updatedPlans)
  };

  const handleSaveDetail = async(p_idx, d_idx) => {
    try{
      console.log("SAVE DETAIL")
      let detail = plans[p_idx].plan_detail[d_idx];
      if(!detail.plan_detail_id){
        detail.travel_id = travel.travel_id
        detail.plan_id = plans[p_idx].plan_id
        let result = await axios.post("http://localhost:8800/plan_detail", detail)
  
        const updatePlans = [...plans];
        updatePlans[p_idx].plan_detail[d_idx] = {
          ...updatePlans[p_idx].plan_detail[d_idx],
          plan_detail_id: result.data.insertId,
          is_input: false
        };
        setPlans(updatePlans)
      }else{
        await axios.put("http://localhost:8800/plan_detail/" + detail.plan_detail_id, detail)
        const updatePlans = [...plans];
        updatePlans[p_idx].plan_detail[d_idx] = {
          ...updatePlans[p_idx].plan_detail[d_idx],
          is_input: false
        };
        setPlans(updatePlans)
      }
    }catch(err){
      console.log(err)
    }
  };

  return (
    <body>
      <header>
        <div class="header-content">
          <p class="site-name">Travel Planner</p>
          {/* <p class="menu"><a href="./top.html">TOP</a></p> */}
        </div>
        <div class="line"></div>
      </header>
      
      <main>
        <div class="board-header-wrap">
          <div class="board-header">
            {!travel.is_input &&
              <h1 
                onClick={(e) => handleClickTravelLabel(e)}
                name='travel_name'>
                {travel.travel_name}
              </h1>
            }
            {travel.is_input &&
              <input 
                type="text"
                value={travel.travel_name}
                onChange={(e) => handleChangeTravel(e)} 
                onBlur={(e) => handleBlurTravel(e)}
                name='travel_name' />
            }
            <p><i class="fa-solid fa-ellipsis"></i></p>
          </div>
        </div>
        
        <div class="board-content">
          {plans.map((plan, p_idx) => (
          <div class="day-board">
            <div key={p_idx} class="day-board-header">
              {!plan.is_input && 
              <label 
                onClick={(e) => handleClickPlanLabel(p_idx)}>
                {plan.plan_date}
              </label>
              }
              {plan.is_input &&
              <input
                type="date"
                name="plan_date"
                value={plan.plan_date}
                onChange={(e) => handleChangePlan(e, p_idx)}
                onBlur={(e) => handleBlurPlan(e, p_idx)}
              />
              }
              <p><i class="fa-solid fa-ellipsis"></i></p>
            </div>


            {plan.plan_detail.map((detail, d_idx) => (
            <div class="day-board-content">
              <div key={d_idx} class="plan">
                {!detail.is_input && 
                  <div>
                    <label 
                      onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                      {detail.start_time}
                    </label>
                    {detail.end_time &&
                    <p>-</p>
                    }
                    <label 
                      onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                      {detail.end_time}
                    </label>
                    <label 
                      onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                      {detail.detail}
                    </label>
                    <label 
                      onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                      {detail.memo}
                    </label>
                  </div>
                }
                {detail.is_input && 
                  <div>
                    <label for="time-start">Time</label>
                    <input 
                      type='time'
                      name='start_time'
                      class="time-start"
                      value={detail.start_time}
                      onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
                    />
                    <p>-</p>
                    <input 
                      type='time'
                      name='end_time'
                      class="time-end"
                      value={detail.end_time}
                      onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
                    />
                    <label for="time-start">Plan</label>
                    <input 
                      type='text'
                      name='detail'
                      value={detail.detail}
                      onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
                    />
                    <label for="memo">Memo</label>
                    <input 
                      type='text'
                      name='memo'
                      value={detail.memo}
                      onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
                    />
                    <button className='btn-detail' onClick={(e) => handleSaveDetail(p_idx, d_idx)}>Save</button>
                  </div>
                }
              </div>
            </div>
            ))}
            <button onClick={() => handleClickAddDetail(p_idx)}>+ Add</button>
          </div>
          ))}
          <div class="day-board">
            <button onClick={(e) => handleClickAddPlan()}>+ Add day</button>
            {/* <p>+ Add day</p> */}
          </div>
        </div>
      </main>
    </body>
  );
};

export default Create;
