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
  const handleClickPlan = (p_idx, is_input) => {
    const updatedPlans = [...plans];
    updatedPlans[p_idx] = {
      ...updatedPlans[p_idx],
      is_input: is_input
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

  const handleAddDetail = (e, p_idx) => {
    const updatedPlans = [...plans];
    const new_detail = {
      travel_id: null,
      plan_id: null,
      start_time: null,
      end_time: null,
      detail: null,
      map: null,
      memo: null,
    }
    updatedPlans[p_idx].plan_detail.push(new_detail)
    setPlans(updatedPlans)
  };


  const handleSaveDetail = async(e, p_idx, d_idx) => {
    try{
      console.log("SAVE DETAIL")
      plans[p_idx].plan_detail[d_idx].travel_id = travel['travel_id']
      plans[p_idx].plan_detail[d_idx].plan_id = plans[p_idx].plan_id
      console.log(plans[p_idx].plan_detail[d_idx])
      let result = await axios.post("http://localhost:8800/plan_detail", plans[p_idx].plan_detail[d_idx])
      setPlans(prevPlans => {
        const updatePlans = [...prevPlans];
        updatePlans[p_idx].plan_detail[d_idx] = {
          ...updatePlans[p_idx].plan_detail[d_idx],
          travel_id: travel['travel_id'],
          plan_id: plans[p_idx].plan_id,
        };
        return updatePlans
      })
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div>
      <h1>plan</h1>
      {!travel.is_input &&
        <label 
          onClick={(e) => handleClickTravelLabel(e)}
          name='travel_name'>
          {travel.travel_name}
        </label>
      }
      {travel.is_input &&
        <input 
          type="text"
          value={travel.travel_name}
          onChange={(e) => handleChangeTravel(e)} 
          onBlur={(e) => handleBlurTravel(e)}
          name='travel_name' />
      }
      
      <br />
      <br />

      <button onClick={(e) => handleClickAddPlan()}>add</button>
      {plans.map((plan, p_idx) => (
        <div key={p_idx} className='plan_date'>
          {!plan.is_input && 
            <label 
              onClick={(e) => handleClickPlan(p_idx, true)}>
              {plan.plan_date}
            </label>
          }
          {plan.is_input &&
            <input
              type="date"
              name="plan_date"
              value={plan.plan_date}
              onChange={(e) => handleChangePlan(e, p_idx)}
              // onFocus={(e) => handleClickPlan(p_idx, true)}
              onBlur={(e) => handleBlurPlan(e, p_idx)}
            />
          }
          {/* <button onClick={(e) => handleSavePlan(e, p_idx)}>save</button> */}
          <button onClick={(e) => handleAddDetail(e, p_idx)}>detail add</button>
          {plan.plan_detail.map((detail, d_idx) => (
            <div key={d_idx}>
              <input 
                type='time'
                name='start_time'
                value={detail.start_time}
                onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
              />
              <input 
                type='time'
                name='end_time'
                value={detail.end_time}
                onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
              />
              <input 
                type='text'
                name='detail'
                value={detail.detail}
                onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
              />
              <input 
                type='text'
                name='memo'
                value={detail.memo}
                onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
              />
              <button className='btn-detail' onClick={(e) => handleSaveDetail(e, p_idx, d_idx)}>detail save</button>
            </div>
          ))}
        </div>
      ))}
      
    </div>
  );
};

export default Create;
