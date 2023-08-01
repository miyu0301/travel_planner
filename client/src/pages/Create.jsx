import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../css/style.css"

const Create = () => {
  const [travel, setTravel] = useState({
    travel_id: null,
    travel_name: "",
    is_input: true
  });
  const [plans, setPlans] = useState([]);

  const handleChangeTravel = (e) => {
    setTravel({
      [e.target.name]: e.target.value,
      is_input: true
    })
  }
  const changeTravelInput = (is_input) => {
    let newTravel = {
      ...travel,
      is_input: is_input
    }
    setTravel(newTravel)
    console.log(travel)
  }

  const handleBlurTravel = async e => {
      console.log("blur")
      e.preventDefault()
    try{
      console.log("SAVE TRAVEL")
      console.log(travel)
      let result = await axios.post("http://localhost:8800/travel", travel)
      setTravel({
        ...travel,
        travel_id: result.data.insertId,
        is_input: false
      })
    }catch(err){
      console.log(err)
    }
  }

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
      // is_input: true
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

  const handleAddPlan = () => {
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

  const handleSavePlan = async(e, p_idx) => {
      console.log("SAVE PLAN")
      e.preventDefault()
    try{
      plans[p_idx]['travel_id'] = travel['travel_id']
      console.log(plans[p_idx])
      let result = await axios.post("http://localhost:8800/plan", plans[p_idx])
      setPlans(prevPlans => {
        const updatePlans = [...prevPlans];
        updatePlans[p_idx] = {
          ...updatePlans[p_idx],
          travel_id: travel['travel_id'],
          plan_id: result.data.insertId
        };
        return updatePlans
      })
      // plans[p_idx]['plan_id'] = result.data.insertId;
    }catch(err){
      console.log(err)
    }
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
          onChange={handleChangeTravel}
          onClick={(e) => changeTravelInput(true)}
          name='travel_name'>
          {travel.travel_name}
        </label>
      }
      {travel.is_input &&
        <input 
          type="text"
          value={travel.travel_name}
          onChange={handleChangeTravel} 
          onBlur={handleBlurTravel}
          name='travel_name' />
      }
      
      <br />
      <br />
      {plans.map((plan, p_idx) => (
        <div key={p_idx}>
          {!plan.is_input && 
            <label htmlFor="" onClick={(e) => handleClickPlan(p_idx, true)}>{plan.plan_date}</label>
          }
          {
            plan.is_input &&
            <input
              type="date"
              name="plan_date"
              value={plan.plan_date}
              onChange={(e) => handleChangePlan(e, p_idx)}
              onFocus={(e) => handleClickPlan(p_idx, true)}
              onBlur={(e) => handleClickPlan(p_idx, false)}
            />
          }
          <button onClick={(e) => handleSavePlan(e, p_idx)}>save</button>
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
      <button onClick={handleAddPlan}>add</button>
      
    </div>
  );
};

export default Create;
