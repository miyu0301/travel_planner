import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/main.css";
import common from "./Common.jsx";
import UserContext from "../context/UserContext.jsx";

axios.defaults.withCredentials = true;

const Top = () => {
  const [travel_name, setTravelName] = useState("");
  const [travels, setTravels] = useState([]);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userId", userId);
    if (userId.length === 0) {
      navigate(`/login`);
    } else {
      const fechAllTravels = async () => {
        try {
          const res = await axios.get(common.api + "/travels/" + userId);
          setTravels(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fechAllTravels();
    }
  }, []);

  const clickSaveTravel = async (e) => {
    e.preventDefault();
    let data = {
      user_id: userId,
      travel_name: travel_name ? travel_name : common.unTitledTravelName,
    };
    try {
      let result = await axios.post(common.api + "/travel", data);
      navigate(`/create/${result.data.insertId}`);
    } catch (error) {
      console.log(error);
      navigate(`/login`, { state: { err: true } });
    }
  };

  const clickDeleteTravel = async (idx, travel_id) => {
    if (common.showDeleteAlert()) {
      try {
        await axios.delete(common.api + "/travel/" + travel_id);
      } catch (err) {
        console.log(err);
        navigate(`/login`, { state: { err: true } });
      }
      let updatedTravels = [...travels];
      updatedTravels.splice(idx, 1);
      setTravels(updatedTravels);
    }
  };

  return (
    <main>
      <Header logined={true} />
      <section className="create-plan">
        <div className="create-wrap">
          <p>Create New Plan</p>
          <div className="create-box">
            <p>Title</p>
            <input
              type="text"
              value={travel_name}
              onChange={(e) => setTravelName(e.target.value)}
            />
            <button
              onClick={(e) => {
                clickSaveTravel(e);
              }}
            >
              CREATE PLAN
            </button>
          </div>
        </div>
      </section>
      <section className="show-plans">
        <div className="plan-wrap">
          <p>All Plans</p>
          {travels.map((travel, idx) => (
            <div className="plan-box" key={travel.travel_id}>
              <span
                className="material-symbols-outlined"
                onClick={() => clickDeleteTravel(idx, travel.travel_id)}
              >
                delete
              </span>
              <Link to={`/create/${travel.travel_id}`}>
                <span className="material-symbols-outlined">edit</span>
              </Link>

              {travel.min_date != travel.max_date && (
                <p>
                  {common.displayDate(travel.min_date)} -{" "}
                  {common.displayDate(travel.max_date)}
                </p>
              )}
              {travel.min_date &&
                travel.max_date &&
                travel.min_date == travel.max_date && (
                  <p>{common.displayDate(travel.min_date)}</p>
                )}
              <p>{travel.travel_name}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Top;
