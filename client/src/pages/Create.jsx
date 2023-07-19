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
    plan_date: null,
  });

  const handleChangeTravel = (e) => {
    setTravel({
      [e.target.name]: e.target.value
    })
  }
  const handleClick = async e => {
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/travels", travel)
      travel['travel_id'] = 999;
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
    });
  };

  const handleSavePlan = async(e, index) => {
    e.preventDefault()
    try{
      plans[index]['travel_id'] = travel['travel_id']
      await axios.post("http://localhost:8800/plan", plans[index])
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
        </div>
      ))}
      <button onClick={handleAddPlan}>add</button>
      
    </div>
  );
};

export default Create;
