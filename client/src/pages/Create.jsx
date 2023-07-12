import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Create = () => {
  // const [travels, setTravels] = useState({
  //     travel_name: "",
  // })
  const [plans, setPlans] = useState([]);
  const [travels, setTravels] = useState({
    travel_name: "",
    plans: []
  });


  const navigate = useNavigate()

  const handleChange = (e) => {
    // setTravels((prev) => ({...prev, [e.target.name]: e.target.value}))
    const list = [{plan_id: 100}];
    // console.log(list);
    setPlans(list)
    setTravels({travel_name: "AAA", plans: list})
    // console.log(travels);
}
  const handleClick = async e => {
    e.preventDefault()
    try{
      console.log(travels);

      await axios.post("http://localhost:8800/travels", travels)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <h1>create new plan</h1>
      <input type="text" placeholder='travel_name' onChange={handleChange} name='travel_name' />
      <button onClick={handleClick}>create</button>
    </div>
  )
}

export default Create