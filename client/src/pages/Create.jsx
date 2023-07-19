import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Create = () => {
  // const [travel_name, setTravelName] = useState("");
  const [travel, setTravel] = useState({
    travel_id: null,
    travel_name: "",
  });
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    travel_id: null,
    plan_id: null,
    plan_date: null,
    plan_detail: []
  });
  // const [planDetails, setPlanDetails] = useState([]);
  // const [newPlanDetail, setNewPlanDetail] = useState({
  //   travel_id: null,
  //   plan_id: null,
  //   plan_detail: []
  // });

  const handleChangeTravel = (e) => {
    setTravel({
      [e.target.name]: e.target.value
    })
  }
  const handleClick = async e => {
    e.preventDefault()
    try{
      let result = await axios.post("http://localhost:8800/travel", travel)
      travel['travel_id'] = result.data.insertId;
      // navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    console.log(e.target.value)
    const updatedPlans = [...plans];
    updatedPlans[index] = {
      ...updatedPlans[index],
      [name]: value
    };
    setPlans(updatedPlans);
  };

  const handleAddPlan = () => {
    setPlans([...plans, newPlan]);
    setNewPlan({
      travel_id: null,
      plan_id: null,
      plan_date: null,
      plan_detail: []
    });
  };

  const handleAddDetail = (e, index) => {
    let details = plans[index].plan_detail;
    let new_detail = {
      plan_detail_id: null,
    }
    plans[index].plan_detail = [...details, new_detail]
    console.log(plans[index])
  };

  const handleSavePlan = async(e, index) => {
    e.preventDefault()
    try{
      plans[index]['travel_id'] = travel['travel_id']
      let result = await axios.post("http://localhost:8800/plan", plans[index])
      plans[index]['plan_id'] = result.data.insertId;
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div>
      <h1>plan</h1>
      <input type="text" onChange={handleChangeTravel} name='travel_name' />
      <button onClick={handleClick}>travel name save</button>
      <br />
      <br />
      {plans.map((plan, index) => (
        <div key={index}>
          <input
            type="date"
            name="plan_date"
            value={plan.plan_date}
            onChange={(e) => handleInputChange(e, index)}
          />
          <button onClick={(e) => handleSavePlan(e, index)}>save</button>
          <button onClick={(e) => handleAddDetail(e, index)}>detail add</button>
          {plan[index] && plan[index].plan_detail.map((detail, i) => (
            <div key={i}>
              <input 
                type='text' 
                name="plan_deail_id" 
                value={detail.plan_detail_id}
              />
            </div>
          ))}
        </div>
        //here
      ))}
      <button onClick={handleAddPlan}>add</button>
      
    </div>
  );
};

export default Create;
