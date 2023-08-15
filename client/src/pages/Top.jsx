import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../css/main.css"

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
  console.log("travel")
  console.log(travels)

  const changeTravel = (e) => {
    setTravelName(e.target.value)
  }

  const clickSaveTravel = async() => {
    let data = {
      travel_name: travel_name
    }
    let result = await axios.post("http://localhost:8800/travel", data)
    console.log(result)
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
    <main>
      <Header />
      <section className="create-plan">
        <div className="create-wrap">
          <p>Create New Plan</p>
          <div className="create-box">
            <p>Title</p>
            <input 
              type="text"
              value={travel_name}
              onChange={(e) => changeTravel(e)} />
            <button onClick={() => {clickSaveTravel()}}>CREATE PLAN</button>
          </div>
        </div>
      </section>
      <section className="show-plans">
        <div className="plan-wrap">
          <p>All Plans</p>
          {travels.map(travel => (
          <div className="plan-box" key={travel.travel_id}>
            <span className="material-symbols-outlined" onClick={() => clickDeleteTravel(travel.travel_id)}>
              delete
              </span>
            <Link to={`/create/${travel.travel_id}`}>
              <span className="material-symbols-outlined">
              edit
              </span></Link>
            
            <p>Sut 24/7 - Fri 29/9&emsp;{travel.travel_name}</p>
          </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Top