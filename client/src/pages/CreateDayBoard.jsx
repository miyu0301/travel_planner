import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/main.css";
import common from "./Common.jsx";
import { sortPlans, sortDetails } from "./Create";
import CreateDayBoardContent from "./CreateDayBoardContent";
import { handleError } from "./Common.jsx";
axios.defaults.withCredentials = true;

const CreateDayBoard = ({ plan, p_idx, travel, plans, setPlans }) => {
  const navigate = useNavigate();

  const handleClickPlanLabel = (p_idx) => {
    const updatedPlans = [...plans];
    updatedPlans[p_idx] = {
      ...updatedPlans[p_idx],
      is_input: true,
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

  const handleClickDeletePlan = async (p_idx) => {
    if (common.showDeleteAlert()) {
      try {
        await axios.delete(common.api + "/plan/" + plans[p_idx].plan_id);
      } catch (err) {
        handleError(err, navigate);
      }
      let updatedPlans = [...plans];
      updatedPlans.splice(p_idx, 1);
      setPlans(updatedPlans);
    }
  };

  const handleBlurPlan = async (e, p_idx) => {
    if (e.target.value) {
      try {
        let plan = { ...plans[p_idx] };
        plan.travel_id = travel.travel_id;
        if (!plans[p_idx].plan_id) {
          let result = await axios.post(common.api + "/plan", plan);
          const updatePlans = [...plans];
          updatePlans[p_idx] = {
            ...updatePlans[p_idx],
            plan_id: result.data.insertId,
            is_input: false,
          };
          setPlans(sortPlans(updatePlans, false));
        } else {
          await axios.put(common.api + "/plan/" + plans[p_idx].plan_id, plan);
          const updatePlans = [...plans];
          updatePlans[p_idx] = {
            ...updatePlans[p_idx],
            is_input: false,
          };
          setPlans(sortPlans(updatePlans, false));
        }
      } catch (err) {
        handleError(err, navigate);
      }
    }
  };

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
      is_input: true,
    };
    updatedPlans[p_idx].plan_detail.push(new_detail);
    setPlans(updatedPlans);
  };

  return (
    <div className="day-board">
      <div key={p_idx} className="day-board-header">
        {!plan.is_input && (
          <label onClick={(e) => handleClickPlanLabel(p_idx)}>
            {common.displayDate(plan.plan_date)}
          </label>
        )}
        {plan.is_input && (
          <input
            type="date"
            name="plan_date"
            value={plan.plan_date}
            onChange={(e) => handleChangePlan(e, p_idx)}
            onBlur={(e) => handleBlurPlan(e, p_idx)}
            autoFocus
          />
        )}
      </div>

      {plan.plan_detail.map((detail, d_idx) => (
        <CreateDayBoardContent
          detail={detail}
          d_idx={d_idx}
          travel={travel}
          p_idx={p_idx}
          plans={plans}
          setPlans={setPlans}
        />
      ))}
      {plan.plan_date && (
        <div className="day-board-footer">
          <p className="add-plan" onClick={() => handleClickAddDetail(p_idx)}>
            + Add Plan
          </p>
          <span
            className="material-symbols-outlined"
            onClick={() => handleClickDeletePlan(p_idx)}
          >
            delete
          </span>
        </div>
      )}
    </div>
  );
};

export default CreateDayBoard;
