import React from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

// save data from api call

// current user
const getCurrentUser = async (setInterventions) => {
  const token = localStorage.getItem("user"); // get token from local storage
  try {
    const res = await axios.get("/customers/current", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setInterventions(res.data.interventions);
    localStorage.setItem("user_id", res.data.id);

    console.log("respone:", res.data);
  } catch (error) {
    console.warn("[getInterventions] error:", error);
  }
};

// go to intervention page
const go_to_intervention = (navigate) => {
  let path = `/InternventionsForm`;
  navigate(path);
};
// return to authentication page and erase local storage

const go_to_authentication = (navigate) => {
  let path = `/Authentication`;
  navigate(path);
  localStorage.removeItem("user");
  localStorage.removeItem("user_id");
};

function Home() {
  const [interventions, setInterventions] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      console.log("Home mounted!");

      await getCurrentUser(setInterventions);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("interventions test:", interventions);
    console.log("interventions changed:", interventions);
  }, [interventions]);

  // format string to return for all intervention
  const listInterventions = interventions.map((intervention) => {
    let str = "Intervention ";
    Object.entries(intervention).map(([key, value]) => {
      // handle execptions
      if (
        key != "createdAt" &&
        key != "intervention_ended" &&
        key != "intervention_started" &&
        key != "updatedAt" &&
        key != "author" &&
        key != "employee" &&
        key != "customer" &&
        key != "status" &&
        key != "report"
      ) {
        // output value depends if object or number or string
        if (typeof value == "object" && value != null && key != "id") {
          str = str + key + " id: " + value.id + " ";
        } else if (typeof value == "object" && value != null && key == "id") {
          str = str + key + ": " + value.id + " ";
        } else if (typeof value == "number" && value != null && key == "id") {
          str = str + key + ": " + value + " ";
        } else if (typeof value == "number" && value != null && key != "id") {
          str = str + key + " id: " + value + " ";
        } else if (typeof value == "string" && value != null) {
          str = str + key + ": " + value + " ";
        }
      }
    });
    return (
      <li className="border border-end-0 border-start-0 border-top-0 border-secondary m-2">
        {str}
      </li>
    );
  });

  return (
    <div className="flex-column">
      <Button
        className="align-self-end m-3"
        variant="danger"
        onClick={() => go_to_authentication(navigate)}
      >
        Log out
      </Button>
      <div className="top-section">
        <h2>Welcome back to your Rockect Elevators Portail</h2>
        <div className="flex-row">
          <h6>{interventions.compagny_name}</h6>
          <button onClick={() => go_to_intervention(navigate)}>
            Create new intervention
          </button>
        </div>
      </div>
      <div className="flex-column border border-secondary">
        <h3>Your interventions</h3>
        <ul className="m-2">{listInterventions}</ul>
      </div>
    </div>
  );
}

export default Home;
