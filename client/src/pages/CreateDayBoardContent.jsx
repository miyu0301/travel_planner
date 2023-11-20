import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/main.css";
import common from "./Common.jsx";
import { sortPlans, sortDetails } from "./Create";
import { handleError } from "./Common.jsx";
axios.defaults.withCredentials = true;

const CreateDayBoardContent = ({
  detail,
  d_idx,
  travel,
  p_idx,
  plans,
  setPlans,
}) => {
  const navigate = useNavigate();
  const handleClickDetailLabel = (p_idx, d_idx) => {
    const updatedPlans = [...plans];
    updatedPlans[p_idx].plan_detail[d_idx] = {
      ...updatedPlans[p_idx].plan_detail[d_idx],
      is_input: true,
    };
    setPlans(updatedPlans);
  };

  const handleChangeDetail = (e, p_idx, d_idx) => {
    const { name, value } = e.target;
    const updatedPlans = [...plans];
    updatedPlans[p_idx].plan_detail[d_idx] = {
      ...updatedPlans[p_idx].plan_detail[d_idx],
      [name]: value,
    };
    setPlans(updatedPlans);
  };

  const handleClickDeleteDetail = async (p_idx, d_idx) => {
    if (common.showDeleteAlert()) {
      try {
        const plan_detail_id = plans[p_idx].plan_detail[d_idx].plan_detail_id;
        await axios.delete(common.api + "/plan_detail/" + plan_detail_id);
      } catch (err) {
        handleError(err, navigate);
      }
      const updatedPlans = [...plans];
      updatedPlans[p_idx].plan_detail.splice(d_idx, 1);
      setPlans(updatedPlans);
    }
  };

  const handleSaveDetail = async (p_idx, d_idx) => {
    try {
      let targetDetail = { ...plans[p_idx].plan_detail[d_idx] };

      if (
        !targetDetail.start_time &&
        !targetDetail.end_time &&
        !targetDetail.detail &&
        !targetDetail.memo
      ) {
        targetDetail.detail = common.notWritten;
      }
      if (!targetDetail.plan_detail_id) {
        targetDetail.travel_id = travel.travel_id;
        targetDetail.plan_id = plans[p_idx].plan_id;
        let result = await axios.post(
          common.api + "/plan_detail",
          targetDetail
        );

        const updatePlans = [...plans];
        updatePlans[p_idx].plan_detail[d_idx] = {
          ...updatePlans[p_idx].plan_detail[d_idx],
          plan_detail_id: result.data.insertId,
          is_input: false,
        };
        updatePlans[p_idx].plan_detail = sortDetails(
          updatePlans[p_idx].plan_detail
        );
        setPlans(sortDetails(updatePlans));
      } else {
        await axios.put(
          common.api + "/plan_detail/" + targetDetail.plan_detail_id,
          targetDetail
        );
        const updatePlans = [...plans];
        updatePlans[p_idx].plan_detail[d_idx] = {
          ...updatePlans[p_idx].plan_detail[d_idx],
          is_input: false,
        };
        updatePlans[p_idx].plan_detail = sortDetails(
          updatePlans[p_idx].plan_detail
        );
        setPlans(updatePlans);
      }
    } catch (err) {
      handleError(err, navigate);
    }
  };

  return (
    <div className="day-board-content">
      <div key={d_idx} className="plan">
        {!detail.is_input && (
          <div className="plan-label">
            <div className="plan-time">
              {detail.start_time && (
                <label onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                  {common.displayTime(detail.start_time)}
                </label>
              )}
              {detail.end_time && (
                <label onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
                  {" - " + common.displayTime(detail.end_time)}
                </label>
              )}
            </div>
            <label onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
              {detail.detail}
            </label>
            <label onClick={(e) => handleClickDetailLabel(p_idx, d_idx)}>
              {detail.memo}
            </label>
            <div className="plan-footer">
              <span
                className="material-symbols-outlined"
                onClick={() => handleClickDeleteDetail(p_idx, d_idx)}
              >
                delete
              </span>
            </div>
          </div>
        )}
        {detail.is_input && (
          <div className="plan-input">
            <label>Time</label>
            <input
              type="time"
              name="start_time"
              className="time-start"
              value={detail.start_time}
              onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
              autoFocus
            />
            <p>-</p>
            <input
              type="time"
              name="end_time"
              className="time-end"
              value={detail.end_time}
              onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
            />
            <label>Plan</label>
            <input
              type="text"
              name="detail"
              className="detail"
              value={detail.detail}
              onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
            />
            <label>Memo</label>
            <input
              type="text"
              name="memo"
              className="memo"
              value={detail.memo}
              onChange={(e) => handleChangeDetail(e, p_idx, d_idx)}
            />
            <button
              className="btn-detail"
              onClick={(e) => handleSaveDetail(p_idx, d_idx)}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateDayBoardContent;
