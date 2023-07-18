import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Create = () => {
  const [travel_name, setTravelName] = useState("");
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    plan_id: null,
  });

  const handleChangeTravel = (e) => {
    setTravelName(e.target.value);
  }
  const handleClick = async e => {
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/travels", travel_name)
      // navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  const handleInputChange = (e, index) => {
    console.log(e)
    const { name, value } = e.target;
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
      plan_id: null,
    });
  };

  const handleSavePlan = async(e, index) => {
    e.preventDefault()
    try{
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
            type="text"
            name="plan_id"
            value={plan.plan_id}
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
