import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../css/main.css"

const Create = () => {
  const { id } = useParams();
  const [travel, setTravel] = useState({});
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const getTravelPlans = async () => {
      console.log(id)
      
      let res = await axios.get("http://localhost:8800/travel/" + id)
      console.log("travel")
      console.log(res)
      // travel data
      setTravel({
        travel_id: id,
        travel_name: res.data.travel_name,
        is_input: false
      })
      if(res.data.plan){
        setPlans(res.data.plan)
      }
    }
    getTravelPlans();
  }, [])

  // 
  // TRAVEL
  // 
  const handleChangeTravel = (e) => {
    setTravel({
      ...travel,
      [e.target.name]: e.target.value,
    })
  }
  const handleClickTravelLabel = () => {
    setTravel({
      ...travel,
      is_input: true
    })
  }

  const handleBlurTravel = async (e) => {
      e.preventDefault()
    try{
      console.log("SAVE TRAVEL")
      console.log(travel)
      await axios.put("http://localhost:8800/travel/" + travel.travel_id, travel)
      setTravel({
        ...travel,
        is_input: false
      })
    }catch(err){
      console.log(err)
    }
  }
  
  // 
  // PLAN
  // 
  const handleClickAddPlan = () => {
    const new_plan = {
      travel_id: null,
      plan_id: null,
      plan_date: null,
      is_input: true,
      plan_detail: []
    }
    setPlans([...plans, new_plan]);
  };

  const handleClickPlanLabel = (p_idx) => {
    const updatedPlans = [...plans];
    updatedPlans[p_idx] = {
      ...updatedPlans[p_idx],
      is_input: true
    };
    setPlans(updatedPlans);
  };

  const handleChangePlan = (e, p_idx) => {
    const { name, value } = e.target;
    const updatedPlans = [...plans];
    updatedPlans[p_idx] = {
      ...updatedPlans[p_idx],
      [name]: value,
    };
    setPlans(updatedPlans);
  };

  const handleClickDeletePlan = async(p_idx) => {
    try{
      console.log(p_idx)
      console.log(plans)
      console.log(plans[p_idx].plan_id)
      await axios.delete("http://localhost:8800/plan/" + plans[p_idx].plan_id)
    }catch(err){
      console.log(err)
    }
    let updatedPlans = [...plans];
    updatedPlans.splice(p_idx, 1);
    setPlans(updatedPlans)
  };

  const handleBlurPlan = async(e, p_idx) => {
    console.log("SAVE PLAN")
    e.preventDefault()
    try{
      plans[p_idx].travel_id = travel.travel_id
      if(!plans[p_idx].plan_id){
        let result = await axios.post("http://localhost:8800/plan", plans[p_idx])
        console.log(result)
        const updatePlans = [...plans];
        updatePlans[p_idx] = {
          ...updatePlans[p_idx],
          plan_id: result.data.insertId,
          is_input: false
        };
        setPlans(updatePlans)  
      }else{
        await axios.put("http://localhost:8800/plan/" + plans[p_idx].plan_id, plans[p_idx])
        const updatePlans = [...plans];
        updatePlans[p_idx] = {
          ...updatePlans[p_idx],
          is_input: false
        };
        setPlans(updatePlans)  
      }
    }catch(err){
      console.log(err)
    }
  };

  // 
  // DETAIL
  // 
  const handleClickAddDetail = (p_idx) => {
    const updatedPlans = [...plans];
    const new_detail = {
      plan_detail_id: null,
      travel_id: null,
      plan_id: null,
      start_time: null,
      end_time: null,
      detail: null,
      map: null,
      memo: null,
      is_input: true
    }
    updatedPlans[p_idx].plan_detail.push(new_detail)
    setPlans(updatedPlans)
  };


  const handleClickDetailLabel = (p_idx, d_idx) => {
    const updatedPlans = [...plans];
    updatedPlans[p_idx].plan_detail[d_idx] = {
      ...updatedPlans[p_idx].plan_detail[d_idx],
      is_input: true
    };
    setPlans(updatedPlans);
  };

  const handleChangeDetail = (e, p_idx, d_idx) => {
    const { name, value } = e.target;

    const updatedPlans = [...plans];
    updatedPlans[p_idx].plan_detail[d_idx] = {
      ...updatedPlans[p_idx].plan_detail[d_idx],
      [name]: value
    };
    console.log(updatedPlans[p_idx].plan_detail[d_idx])
    setPlans(updatedPlans)
  };

  const handleClickDeleteDetail = async(p_idx, d_idx) => {
    try{
      const plan_detail_id = plans[p_idx].plan_detail[d_idx].plan_detail_id;
      console.log(plan_detail_id)
      await axios.delete("http://localhost:8800/plan_detail/" + plan_detail_id)
    }catch(err){
      console.log(err)
    }
    const updatedPlans = [...plans];
    updatedPlans[p_idx].plan_detail.splice(d_idx, 1);
    setPlans(updatedPlans)
  };


  const handleSaveDetail = async(p_idx, d_idx) => {
    try{
      console.log("SAVE DETAIL")
      let detail = plans[p_idx].plan_detail[d_idx];
      if(!detail.plan_detail_id){
        detail.travel_id = travel.travel_id
        detail.plan_id = plans[p_idx].plan_id
        let result = await axios.post("http://localhost:8800/plan_detail", detail)
  
        const updatePlans = [...plans];
        updatePlans[p_idx].plan_detail[d_idx] = {
          ...updatePlans[p_idx].plan_detail[d_idx],
          plan_detail_id: result.data.insertId,
          is_input: false
        };
        setPlans(updatePlans)
      }else{
        await axios.put("http://localhost:8800/plan_detail/" + detail.plan_detail_id, detail)
        const updatePlans = [...plans];
        updatePlans[p_idx].plan_detail[d_idx] = {
          ...updatePlans[p_idx].plan_detail[d_idx],
          is_input: false
        };
        setPlans(updatePlans)
      }
    }catch(err){
      console.log(err)
    }
  };

  return (
    <main>
      <Header />
      <section class="plan-board-header">
        <div class="header-wrap">
          {!travel.is_input &&
            <h1 
              onClick={(e) => handleClickTravelLabel(e)}
              name='travel_name'>
              {travel.travel_name}
            </h1>
          }
          {travel.is_input &&
            <input 
              type="text"
              value={travel.travel_name}
              onChange={(e) => handleChangeTravel(e)} 
              onBlur={(e) => handleBlurTravel(e)}
              name='travel_name' />
          }
          <p><i class="fa-solid fa-ellipsis"></i></p>
        </div>
      </section>
      
      <section class="plan-board-content">
        {plans.map((plan, p_idx) => (
        <div class="day-board">
          <div key={p_idx} class="day-board-header">
            {!plan.is_input && 
            <label 
              onClick={(e) => handleClickPlanLabel(p_idx)}>
              {plan.plan_date}
            </label>
            }
            {plan.is_input &&
            <input
              type="date"
              name="plan_date"
              value={plan.plan_date}
              onChange={(e) => handleChangePlan(e, p_idx)}
              onBlur={(e) => handleBlurPlan(e, p_idx)}
            />
            }
            {/* <p><i class="fa-solid fa-ellipsis"></i></p> */}
            {plan.plan_date &&
            <button onClick={() => handleClickDeletePlan(p_idx)}>Del</button>
            }
          </div>


          {plan.plan_detail.map((detail, d_idx) => (
          <div class="day-board-content">
            <div key={d_idx} class="plan">
              {!detail.is_input && 
                <div>
                  <button onClick={() => handleClickDeleteDetail(p_idx, d_idx)}>Del</button>
                  <label 
                    onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                    {detail.start_time}
                  </label>
                  {detail.end_time &&
                  <p>-</p>
                  }
                  <label 
                    onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                    {detail.end_time}
                  </label>
                  <label 
                    onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                    {detail.detail}
                  </label>
                  <label 
                    onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                    {detail.memo}
                  </label>
                </div>
              }
              {detail.is_input && 
                <div>
                  <label for="time-start">Time</label>
                  <input 
                    type='time'
                    name='start_time'
                    class="time-start"
                    value={detail.start_time}
                    onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
                  />
                  <p>-</p>
                  <input 
                    type='time'
                    name='end_time'
                    class="time-end"
                    value={detail.end_time}
                    onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
                  />
                  <label for="time-start">Plan</label>
                  <input 
                    type='text'
                    name='detail'
                    value={detail.detail}
                    onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
                  />
                  <label for="memo">Memo</label>
                  <input 
                    type='text'
                    name='memo'
                    value={detail.memo}
                    onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
                  />
                  <button className='btn-detail' onClick={(e) => handleSaveDetail(p_idx, d_idx)}>Save</button>
                </div>
              }
            </div>
          </div>
          ))}
          {plan.plan_date &&
          <p class="add-plan" onClick={() => handleClickAddDetail(p_idx)}>+ Add Plan</p>
          }
        </div>
        ))}
        <div class="day-board">
          <p class="add-day" onClick={(e) => handleClickAddPlan()}>+ Add day</p>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Create;
