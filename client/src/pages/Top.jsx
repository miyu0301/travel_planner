import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Top = () => {
  const [travels, setTravels] = useState([])

  useEffect(() => {
      const fechAllTravels = async () => {
          try {
              const res = await axios.get("http://localhost:8800/top")
              setTravels(res.data)
              console.log(res)
          }catch(err){
              console.log(err)
          }
      }
      fechAllTravels()
  }, [])

  const handleDelete = async (id) => {
    try{
      await axios.delete("http://localhost:8800/top/"+id)
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
              {/* {travel.cover && <img src={book.cover} alt='' />} */}
              <h2>{travel.travel_name}</h2>
              <button className="delete" onClick={() => handleDelete(travel.travel_id)}>Delete</button>
              <button className="update"><Link to={`/update/${travel.travel_id}`}>Update</Link></button>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Top