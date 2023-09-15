import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../css/main.css"
import common from './Common.jsx';

const Create = () => {
  const { id } = useParams();
  const [travel, setTravel] = useState({});
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTravelPlans = async () => {
      let res = await axios.get(common.api + "/travel/" + id)
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
    if(!document.cookie){
      navigate(`/login`);
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
    try{
      let data = {
        travel_name: travel.travel_name ? travel.travel_name : common.unTitledTravelName
      }  
      await axios.put(common.api + "/travel/" + travel.travel_id, data)
      setTravel({
        ...travel,
        travel_name: data.travel_name,
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
    if (common.showDeleteAlert()){
      try{
        await axios.delete(common.api + "/plan/" + plans[p_idx].plan_id)
      }catch(err){
        console.log(err)
      }
      let updatedPlans = [...plans];
      updatedPlans.splice(p_idx, 1);
      setPlans(updatedPlans)
    }
  };

  const handleBlurPlan = async(e, p_idx) => {
    if(e.target.value){
      try{
        plans[p_idx].travel_id = travel.travel_id
        if(!plans[p_idx].plan_id){
          let result = await axios.post(common.api + "/plan", plans[p_idx])
          console.log(result)
          const updatePlans = [...plans];
          updatePlans[p_idx] = {
            ...updatePlans[p_idx],
            plan_id: result.data.insertId,
            is_input: false
          };
          setPlans(updatePlans)  
        }else{
          await axios.put(common.api + "/plan/" + plans[p_idx].plan_id, plans[p_idx])
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
    setPlans(updatedPlans)
  };

  const handleClickDeleteDetail = async(p_idx, d_idx) => {
    if (common.showDeleteAlert()){
      try{
        const plan_detail_id = plans[p_idx].plan_detail[d_idx].plan_detail_id;
        await axios.delete(common.api + "/plan_detail/" + plan_detail_id)
      }catch(err){
        console.log(err)
      }
      const updatedPlans = [...plans];
      updatedPlans[p_idx].plan_detail.splice(d_idx, 1);
      setPlans(updatedPlans)
    }    
  };

  const handleSaveDetail = async(p_idx, d_idx) => {
    try{
      let detail = plans[p_idx].plan_detail[d_idx];

      if(!detail.start_time && !detail.end_time &&
          !detail.detail && !detail.memo){
            detail.detail = common.notWritten;
      }
      if(!detail.plan_detail_id){
        detail.travel_id = travel.travel_id
        detail.plan_id = plans[p_idx].plan_id
        let result = await axios.post(common.api + "/plan_detail", detail)
  
        const updatePlans = [...plans];
        updatePlans[p_idx].plan_detail[d_idx] = {
          ...updatePlans[p_idx].plan_detail[d_idx],
          plan_detail_id: result.data.insertId,
          is_input: false
        };
        setPlans(updatePlans)
      }else{
        await axios.put(common.api + "/plan_detail/" + detail.plan_detail_id, detail)
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
      <Header logined={true}/>
      <section className="plan-board-header">
        <div className="header-wrap">
          {!travel.is_input &&
            <label 
              onClick={(e) => handleClickTravelLabel(e)}
              name='travel_name'>
              {travel.travel_name}
            </label>
          }
          {travel.is_input &&
          <form novalidate>
            <input 
              type="text"
              value={travel.travel_name}
              onChange={(e) => handleChangeTravel(e)} 
              onBlur={(e) => handleBlurTravel(e)}
              name='travel_name'
              required
              autoFocus />
          </form>
          }
          <p><i className="fa-solid fa-ellipsis"></i></p>
        </div>
      </section>
      
      <section className="plan-board-content">
        {plans.map((plan, p_idx) => (
        <div className="day-board">
          <div key={p_idx} className="day-board-header">
            {!plan.is_input && 
            <label 
              onClick={(e) => handleClickPlanLabel(p_idx)}>
              {common.displayDate(plan.plan_date)}
            </label>
            }
            {plan.is_input &&
            <input
              type="date"
              name="plan_date"
              value={plan.plan_date}
              onChange={(e) => handleChangePlan(e, p_idx)}
              onBlur={(e) => handleBlurPlan(e, p_idx)}
              autoFocus />
            }
          </div>


          {plan.plan_detail.map((detail, d_idx) => (
          <div className="day-board-content">
            <div key={d_idx} className="plan">
              {!detail.is_input && 
                <div className="plan-label">
                  <div className="plan-time">
                    {detail.start_time &&
                      <label 
                      onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                      {common.displayTime(detail.start_time)}
                      </label>
                    }
                    {detail.end_time &&
                      <label 
                      onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                      {" - " + common.displayTime(detail.end_time)}
                      </label>
                    }
                  </div>
                  <label 
                    onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                    {detail.detail}
                  </label>
                  <label 
                    onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                    {detail.memo}
                  </label>
                  <div className="plan-footer">
                    <span className="material-symbols-outlined" onClick={() => handleClickDeleteDetail(p_idx, d_idx)}>
                    delete
                    </span>
                  </div>
                </div>
              }
              {detail.is_input && 
                <div className="plan-input">
                  <label for="time-start">Time</label>
                  <input 
                    type='time'
                    name='start_time'
                    className="time-start"
                    value={detail.start_time}
                    onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
                    autoFocus />
                  <p>-</p>
                  <input 
                    type='time'
                    name='end_time'
                    className="time-end"
                    value={detail.end_time}
                    onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
                     />
                  <label for="time-start">Plan</label>
                  <input 
                    type='text'
                    name='detail'
                    className='detail'
                    value={detail.detail}
                    onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
                     />
                  <label for="memo">Memo</label>
                  <input 
                    type='text'
                    name='memo'
                    className='memo'
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
          <div className="day-board-footer">
            <p className="add-plan" onClick={() => handleClickAddDetail(p_idx)}>+ Add Plan</p>
            <span className="material-symbols-outlined" onClick={() => handleClickDeletePlan(p_idx)}>
            delete
            </span>
          </div>
          }
        </div>
        ))}
        <div className="day-board">
          <p className="add-day" onClick={(e) => handleClickAddPlan()}>+ Add day</p>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Create;
