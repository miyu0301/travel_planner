import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../css/main.css";
import common from "./Common.jsx";
import CreateDayBoard from "./CreateDayBoard";

axios.defaults.withCredentials = true;
const Create = () => {
  const { id } = useParams();
  const [travel, setTravel] = useState({});
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTravelPlans = async () => {
      try {
        let res = await axios.get(common.api + "/travel/" + id);
        // travel data
        setTravel({
          travel_id: id,
          travel_name: res.data.travel_name,
          is_input: false,
        });
        if (res.data.plan) {
          setPlans(sortPlans(res.data.plan, true));
        }
      } catch (error) {
        console.log(error);
        navigate(`/login`, { state: { err: true } });
      }
    };
    getTravelPlans();
  }, []);

  const handleChangeTravel = (e) => {
    setTravel({
      ...travel,
      [e.target.name]: e.target.value,
    });
  };
  const handleClickTravelLabel = () => {
    setTravel({
      ...travel,
      is_input: true,
    });
  };

  const handleBlurTravel = async (e) => {
    try {
      let data = {
        travel_name: travel.travel_name
          ? travel.travel_name
          : common.unTitledTravelName,
      };
      await axios.put(common.api + "/travel/" + travel.travel_id, data);
      setTravel({
        ...travel,
        travel_name: data.travel_name,
        is_input: false,
      });
    } catch (err) {
      console.log(err);
      navigate(`/login`, { state: { err: true } });
    }
  };

  const handleClickAddPlan = () => {
    const new_plan = {
      travel_id: null,
      plan_id: null,
      plan_date: null,
      is_input: true,
      plan_detail: [],
    };
    setPlans([...plans, new_plan]);
  };

  return (
    <main>
      <Header logined={true} />
      <section className="plan-board-header">
        <div className="header-wrap">
          {!travel.is_input && (
            <label
              onClick={(e) => handleClickTravelLabel(e)}
              name="travel_name"
            >
              {travel.travel_name}
            </label>
          )}
          {travel.is_input && (
            <form novalidate>
              <input
                type="text"
                value={travel.travel_name}
                onChange={(e) => handleChangeTravel(e)}
                onBlur={(e) => handleBlurTravel(e)}
                name="travel_name"
                required
                autoFocus
              />
            </form>
          )}
          {/* <p>
            <i className="fa-solid fa-ellipsis"></i>
          </p> */}
        </div>
      </section>

      <section className="plan-board-content">
        {plans.map((plan, p_idx) => (
          <CreateDayBoard
            plan={plan}
            p_idx={p_idx}
            travel={travel}
            plans={plans}
            setPlans={setPlans}
          />
        ))}
        <div className="day-board">
          <p className="add-day" onClick={(e) => handleClickAddPlan()}>
            + Add day
          </p>
        </div>
      </section>
    </main>
  );
};

export const sortPlans = (plans, shouldSortDetail) => {
  if (shouldSortDetail) {
    plans.map((plan) => sortDetails(plan.plan_detail));
  }
  plans.sort((a, b) => {
    if (a.plan_date < b.plan_date) {
      return -1;
    }
    if (a.plan_date > b.plan_date) {
      return 1;
    }
  });
  return plans;
};
export const sortDetails = (details) => {
  details.sort((a, b) => {
    if (a.start_time < b.start_time) {
      return -1;
    }
    if (a.start_time > b.start_time) {
      return 1;
    }
  });
  return details;
};

export default Create;
