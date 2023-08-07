import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Top = () => {
  const [travel_name, setTravelName] = useState("")
  const [travels, setTravels] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fechAllTravels = async () => {
      try {
        const res = await axios.get("http://localhost:8800/travel")
        setTravels(res.data)
        console.log(res)
      }catch(err){
        console.log(err)
      }
    }
    fechAllTravels()
  }, [])

  const changeTravel = (e) => {
    setTravelName(e.target.value)
  }

  const clickSaveTravel = async() => {
    let data = {
      travel_name: travel_name
    }
    let result = await axios.post("http://localhost:8800/travel", data)

    navigate(`/create/${result.data.insertId}`);
  }

  const clickDeleteTravel = async (id) => {
    try{
      await axios.delete("http://localhost:8800/travel/" + id)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }
  
  return (
      <div>
        <button><Link to={`/create`}>create</Link></button>
        <h1>your travels</h1>
        <div>
          <h2>New Plan</h2>
          <input 
            type="text"
            value={travel_name}
            onChange={(e) => changeTravel(e)} />
          <button onClick={() => {clickSaveTravel()}}>Add</button>
          {travels.map(travel => (
            <div key={travel.travel_id}>
              <h2>{travel.travel_name}</h2>
              <button className="delete" onClick={() => clickDeleteTravel(travel.travel_id)}>Delete</button>
              <button className="update"><Link to={`/create/${travel.travel_id}`}>Update</Link></button>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Top