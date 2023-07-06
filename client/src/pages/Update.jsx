import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
  const [travels, setTravels] = useState({
    travel_name: "",
  })

  const navigate = useNavigate()
  const location = useLocation()
  const travelId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setTravels((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  const handleClick = async e => {
    e.preventDefault()
    try{
      await axios.put("http://localhost:8800/top/" + travelId, travels)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <h1>Update new plan</h1>
      <input type="text" placeholder='travel_name' onChange={handleChange} name='travel_name' />
      <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update