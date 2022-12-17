import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Home.css"; // use home css for one class top section
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";

// return to authentication page and erase local storage

const go_to_authentication = (navigate) => {
  let path = `/Authentication`;
  navigate(path);
  localStorage.removeItem("user");
  localStorage.removeItem("user_id");
};

// go to home page
const go_to_home = (navigate) => {
  let path = `/Home`;
  navigate(path);
};

// current user building
const getCurrentUserBuildings = async (setBuildings) => {
  const token = localStorage.getItem("user"); // get token from local storage
  try {
    const res = await axios.get("/buildings/current", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setBuildings(res.data);

    console.log("respone:", res.data);
  } catch (error) {
    console.warn("[getInterventions] error:", error);
  }
};

const BuildingsList = ({ buildings }) => {
  return buildings.map((building) => {
    return (
      <option key={building.id} required value={building.id}>
        {building.address}
      </option>
    );
  });
};
// get current user batteries
async function getBatteries(id, setBatteries) {
  const token = localStorage.getItem("user"); // get token from local storage
  try {
    const res = await axios.get("/buildings/" + id + "/batteries", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setBatteries(res.data);
    console.log("respone battery:", res.data);
  } catch (error) {
    console.warn("[getInterventions] error:", error);
  }
}

const BatteriesList = ({ batteries }) => {
  return batteries.map((batterie) => {
    return <option value={batterie.id}> Battery id: {batterie.id}</option>;
  });
};

// get current user column
async function getColumns(id, setColumns) {
  const token = localStorage.getItem("user"); // get token from local storage
  try {
    const res = await axios.get("/batteries/" + id + "/columns", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setColumns(res.data);
    console.log("respone column:", res.data);
  } catch (error) {
    console.warn("[getInterventions] error:", error);
  }
}

const ColumnsList = ({ columns }) => {
  return columns.map((column) => {
    return <option key={column.id} value={column.id}> Column id: {column.id}</option>;
  });
};

// get current user elevator
async function getElevator(id, setElevators) {
  const token = localStorage.getItem("user"); // get token from local storage
  try {
    const res = await axios.get("/columns/" + id + "/elevators", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setElevators(res.data);
    console.log("respone elevator:", res.data);
  } catch (error) {
    console.warn("[getInterventions] error:", error);
  }
}

const ElevatorsList = ({ elevators }) => {
  return elevators.map((elevator) => {
    return <option key={elevators.id} value={elevator.id}> Elevator id: {elevator.id}</option>;
  });
};

function getReport(value, setReport) {
  setReport(value);
  console.log(value);
}

// async function handleSubmit(event) {
//   const token = localStorage.getItem("user"); // get token from local storage
//   const user_id = localStorage.getItem("user_id"); // get user id from local storage
//   alert("test even.data: ", building_id)
//   // try {
//   //   const res = await axios.post("/interventions/new", {
//   //     headers: {
//   //       Authorization: "Bearer " + token,
//   //     },
//   //     data: {
//   //       "customerID": user_id,
//   //       "buildingID": building_id,
//   //       "batteryID": battery_id,
//   //       "columnID": column_id,
//   //       "elevatorID": elevator_id,
//   //       "report": report,
//   //     },
//   //   });
//   //   console.log("respone post form:", res);
//   // } catch (error) {
//   //   console.warn("[post form] error:", error);
//   // }
// }


// function writeAnswer () {
//   const user_id = localStorage.getItem("user_id"); // get user id from local storage

//   let answer = {
//     "customerID": user_id,
//   "buildingID": building_id,
//   "batteryID": battery_id,
//   "columnID": column_id,
//   "elevatorID": elevator_id,
//   "report": report
//   }

// }
// ///////////////////////////////////////////////////////////
function InternventionsForm() {
  const [buildings, setBuildings] = useState([]);
  const [building_id, setBuildingId] = useState(0);
  const [batteries, setBatteries] = useState([]);
  const [battery_id, setBatteryId] = useState(0);
  const [columns, setColumns] = useState([]);
  const [column_id, setColumnId] = useState(0);
  const [elevators, setElevators] = useState([]);
  const [elevator_id, setElevatorId] = useState(0);
  const [report, setReport] = useState(0);
  const [isValid, setIsValid] = useState(false);
  
  async function handleSubmit(event) {
    const token = localStorage.getItem("user"); // get token from local storage
    const user_id = localStorage.getItem("user_id"); // get user id from local storage
    try {
      const res = await axios.post("/interventions/new", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          customerID: user_id,
          buildingID: building_id,
          batteryID: battery_id,
          columnID: column_id,
          elevatorID: elevator_id,
          report: report,
        },
      });
      alert("success")
      console.log("respone post form:", res);
    } catch (error) {
      console.warn("[post form] error:", error);
      alert("failed")

    }
  }
  let navigate = useNavigate();
  
  //fetch buildins data building   on page load
  useEffect(() => {
    async function fetchData() {
      console.log("Form mounted!");
      await getCurrentUserBuildings(setBuildings);
    }
    fetchData();
  }, []);
  
  // fetch batteries data on building select option change
  useEffect(() => {
    setIsValid(building_id ? true : false);
    console.log("select building option: ", building_id);
    async function fetchData() {
      setBatteries(getBatteries(building_id, setBatteries));
    }
    fetchData();
  }, [building_id]);
  
  // fetch columns data on battery select option change
  
  useEffect(() => {
    console.log("select battery option: ", building_id);
    async function fetchData() {
      setBatteries(getColumns(battery_id, setColumns));
    }
    fetchData();
  }, [battery_id]);
  
  // fetch elevators data on columns select option change
  
  useEffect(() => {
    console.log("select elevator option: ", elevator_id);
    async function fetchData() {
      setElevators(getElevator(column_id, setElevators));
    }
    fetchData();
  }, [column_id]);

  let initialValues = {
    // "customerID": user_id,
    "buildingID": building_id,
    "batteryID": battery_id,
    "columnID": column_id,
    "elevatorID": elevator_id,
    "report": report
  }
  const [values, setValues] = useState(initialValues);

  // const handleOnSubmit = (e) => {
  //   const { name, value } = e.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };

  ///////////////////
  return (
    <div className="flex-column">
      <div className="flex-row align-self-end">
        <Button
          className="align-self-end m-3"
          variant="primary"
          onClick={() => go_to_home(navigate)}
          >
          Return Back
        </Button>
        <Button
          className="align-self-end m-3"
          variant="danger"
          onClick={() => go_to_authentication(navigate)}
        >
          Log out
        </Button>
      </div>
      <div className="top-section"></div>
      <h1>Request for intervention </h1>
      <div className="m-3">
      
        <Form
          onSubmit={handleSubmit}
        >
          <Form.Select
            onChange={(e) => setBuildingId(e.target.value)}
            id="building_option"
            name="customerID"
            aria-label="Default select example"
          >
            <option className="m-3">Select a building</option>
            {buildings.length > 0 && <BuildingsList buildings={buildings} />}
          </Form.Select>

          <Form.Select
            onChange={(e) => setBatteryId(e.target.value)}
            id="battery_option"
            
            aria-label="Default select example"
          >
            <option className="m-3">Select a Battery</option>
            {batteries.length > 0 && <BatteriesList batteries={batteries} />}
          </Form.Select>

          <Form.Select
            onChange={(e) => setColumnId(e.target.value)}
            id="column_option"
            
            aria-label="Default select example"
          >
            <option className="m-3">Select a Column</option>
            {columns.length > 0 && <ColumnsList columns={columns} />}
          </Form.Select>

          <Form.Select
            onChange={(e) => setElevatorId(e.target.value)}
            id="elevator_option"
            
            aria-label="Default select example"
          >
            <option className="m-3">Select a Elevator</option>
            {elevators.length > 0 && <ElevatorsList elevators={elevators} />}
          </Form.Select>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Write report</label>
            <textarea
              required
              onChange={(e) => getReport(e.target.value, setReport)}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
            />
          </div>
          <Button
          
            disabled={!isValid}
            className="m-3"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default InternventionsForm;
