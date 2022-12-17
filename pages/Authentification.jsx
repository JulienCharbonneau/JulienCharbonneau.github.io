import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Authentication() {
  // change page with react-router-dom
  let navigate = useNavigate();

  function routeChange() {
    let path = `/Home`;
    navigate(path);
  }

  // get user credential
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "authenticate?email=" + email + "&password=" + password,
    })
      .then((response) => {
        if (response.data.access_token !== null) {
          localStorage.setItem(
            "user",
            response.data.access_token
          );
          routeChange();
        }
      })
      .catch(function (error) {
        // handle error
        alert("Log in failed. Please try again.");
        console.log(error);
      });
    console.log("this credential: " + email + " " + password);
  };
  console.log(email);

  // Get acces token

  //   ends
  return (
    <div
      style={{ padding: "100px" }}
      className="d-flex flex-column align-items-center"
    >
      <h4 style={{ padding: "50px" }}>
        Please sign-in to your Rocket Elevators account.
      </h4>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Authentication;
// onClick={routeChange}
