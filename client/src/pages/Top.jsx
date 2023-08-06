import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Top = () => {
  const [travels, setTravels] = useState([])

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
          {travels.map(travel => (
            <div key={travel.travel_id}>
              <h2>{travel.travel_name}</h2>
              <button className="delete" onClick={() => clickDeleteTravel(travel.travel_id)}>Delete</button>
              <button className="update"><Link to={`/update/${travel.travel_id}`}>Update</Link></button>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Top