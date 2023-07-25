import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Create = () => {
  const [travel, setTravel] = useState({
    travel_id: null,
    travel_name: "",
  });
  const [plans, setPlans] = useState([]);
  // const [newPlan, setNewPlan] = useState({
  //   travel_id: null,
  //   plan_id: null,
  //   plan_date: null,
  //   plan_detail: []
  // });

  const handleChangeTravel = (e) => {
    setTravel({
      [e.target.name]: e.target.value
    })
  }
  const handleSaveTravel = async e => {
    e.preventDefault()
    try{
      console.log(travel)
      let result = await axios.post("http://localhost:8800/travel", travel)
      setTravel({
        ...travel,
        travel_id: result.data.insertId
      })
      // navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  const handleChangePlan = (e, p_idx) => {
    const { name, value } = e.target;
    console.log(e.target.value)
    const updatedPlans = [...plans];
    updatedPlans[p_idx] = {
      ...updatedPlans[p_idx],
      [name]: value
    };
    setPlans(updatedPlans);
  };

  const handleChangeDetail = (e, p_idx, d_idx) => {
    const { name, value } = e.target;

    const updatedPlans = [...plans];
    updatedPlans[p_idx].plan_detail[d_idx] = {
      [name]: value
    };
    setPlans(updatedPlans)
    console.log(updatedPlans)
  };

  const handleAddPlan = () => {
    // setPlans([...plans, newPlan]);
    // setNewPlan({
    //   travel_id: null,
    //   plan_id: null,
    //   plan_date: null,
    //   plan_detail: []
    // });

    const new_plan = {
      travel_id: null,
      plan_id: null,
      plan_date: null,
      plan_detail: []
    }
    setPlans([...plans, new_plan]);
  };

  const handleAddDetail = (e, p_idx) => {
    console.log(plans)
    const updatedPlans = [...plans];
    const new_detail = {
      plan_detail_id: null,
      travel_id: null,
      plan_id: null,
      start_time: null,
      end_time: null,
      plan_id: null,
      detail: null,
      map: null,
      memo: null,
    }
    updatedPlans[p_idx].plan_detail.push(new_detail)
    setPlans(updatedPlans)
    // const details = plans[index].plan_detail;
    // plans[index].plan_detail = [...details, new_detail]
    console.log(p_idx)
    console.log(plans)
  };

  const handleSavePlan = async(e, p_idx) => {
    e.preventDefault()
    try{
      plans[p_idx]['travel_id'] = travel['travel_id']
      let result = await axios.post("http://localhost:8800/plan", plans[p_idx])
      console.log(result.data)
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
      console.log(plans)
      console.log(plans[p_idx].plan_detail[d_idx])
      let result = await axios.post("http://localhost:8800/plan_detail", plans[p_idx].plan_detail[d_idx])
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div>
      <h1>plan</h1>
      <input type="text" onChange={handleChangeTravel} name='travel_name' />
      <button onClick={handleSaveTravel}>travel name save</button>
      <br />
      <br />
      {plans.map((plan, p_idx) => (
        <div key={p_idx}>
          <input
            type="date"
            name="plan_date"
            value={plan.plan_date}
            onChange={(e) => handleChangePlan(e, p_idx)}
          />
          <button onClick={(e) => handleSavePlan(e, p_idx)}>save</button>
          <button onClick={(e) => handleAddDetail(e, p_idx)}>detail add</button>
          {plan.plan_detail.map((detail, d_idx) => (
            <div key={d_idx}>
              <input 
                type='text'
                name='plan_detail_id'
                value={detail.plan_detail_id}
                onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
            />
              <button onClick={(e) => handleSaveDetail(e, p_idx, d_idx)}>detail save</button>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleAddPlan}>add</button>
      
    </div>
  );
};

export default Create;
