import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Create = () => {
  // const [travels, setTravels] = useState({
  //   travel_name: "",
  // })
  const [travel_name, setTravelName] = useState("");
  const [plans, setPlans] = useState([]);
  // const [travels, setTravels] = useState({
  //   travel_name: "",
  //   plans: []
  // });


  const navigate = useNavigate()

  const handleChangeTravel = (e) => {
    console.log("aaaaaaaaa");
    console.log(e.target.name);
    console.log(e.target.value);
    setTravelName(e.target.value);

    // const list = [{plan_id: 100},{plan_id: 200}];
    // setPlans(list)
    // setTravels({travel_name: "AAA", plans: list})
  }
  const handleChangePlan = (e) => {
    // setPlans((prev) => ({...prev, [e.target.name]: e.target.value}))
    setPlans([...plans, { [e.target.name]: e.target.value }])

  }
  const handleClick = async e => {
    e.preventDefault()
    let data = {
      travel_name: travel_name,
      plans: plans
    }

    try{
      console.log(data);

      await axios.post("http://localhost:8800/travels", data)
      // navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <h1>create new plan</h1>
      <input type="text" placeholder='travel_name' onChange={handleChangeTravel} name='travel_name' />
      <input type='number' onChange={handleChangePlan} name='plan_id' />
      <input type='number' onChange={handleChangePlan} name='plan_id' />
      <button onClick={handleClick}>create</button>
    </div>
  )
}

export default Create