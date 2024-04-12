import { useState, useEffect, useContext } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Toast,
  ToastContainer,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios";
import $ from "jquery";
import { CurrentUserContext } from "../context/CurrentUser";
import { PlannerIDsContext } from "../context/plannerContext";

const Login = () => {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [plannerIDsData, setPlannerIDsData] = useContext(PlannerIDsContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [invalidPassword, setInvalidPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerErrMsg] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const toggleShowSuccess = () => setSuccess(!success);
  const toggleInvalidPassword = () => setInvalidPassword(!invalidPassword);
  const toggleServerErrMsg = () => setServerErrMsg(!serverError);
  const toggleUserNotFound = () => setUserNotFound(!userNotFound);

  function handleChange(e) {
    setUserData((prevState) => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  }

  function handleLogin(e) {
    e.preventDefault();

    axios({
      url: "/api/session",
      method: "post",
      data: userData,
    })
      .then((res) => {
        setCurrentUser(res.data);
      })
      .then(() => {
        axios({
          url: "/api/planner",
          method: "get",
        }).then((res) => {
          console.log(res);
          setPlannerIDsData(
            res.data.map((planner) => {
              return {
                name: planner.name,
                uuid: planner.uuid,
                destination: planner.destination,
              };
            })
          );
        });
      })
      .then(() => {
        console.log(plannerIDsData);
        toggleShowSuccess();
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      })
      .catch((err) => {
        const status = err.response.status;
        console.log(err);
        if (status === 404) {
          toggleUserNotFound();
        } else if (status === 401) {
          $("#password").trigger("focus");
          toggleInvalidPassword();
        } else {
          toggleServerErrMsg();
        }
      });
  }

  return (
    <Container
      fluid={true}
      className="flex-fill d-flex flex-column justify-content-center align-items-center position-relative"
    >
      <Card className="w-75 h-50">
        <Card.Body className="h-100 d-flex flex-column justify-content-center align-items-center gap-4">
          <h4>Sign In</h4>
          <Form
            onSubmit={handleLogin}
            className="w-75 d-flex flex-column justify-content-center align-content-center gap-3"
          >
            <FloatingLabel controlId="username" label="Username">
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={handleChange}
                value={userData.username}
                autoComplete="username"
                required
              />
            </FloatingLabel>
            <FloatingLabel controlId="password" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={userData.password}
                autoComplete="current-password"
                required
              />
            </FloatingLabel>

            <Button
              className="flex-grow-0 flex-shrink-0 w-50 mx-auto"
              type="submit"
            >
              Sign In
            </Button>
          </Form>
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link> instead.
          </p>
        </Card.Body>
      </Card>
      <ToastContainer position="bottom-end" className="me-2 mb-3">
        <Toast show={success} onClose={toggleShowSuccess} delay={3000} autohide>
          {/* login success */}
          <Toast.Header>
            <FontAwesomeIcon
              icon={solid("circle-check")}
              className="me-1"
              color="green"
            />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Login successfully. Redirecting...</Toast.Body>
        </Toast>
        <Toast
          show={invalidPassword}
          onClose={toggleInvalidPassword}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <FontAwesomeIcon
              icon={solid("circle-exclamation")}
              className="me-1"
              color="red"
            />
            <strong className="me-auto">Password Invalid</strong>
          </Toast.Header>
          <Toast.Body>
            Password invalid. Please re-type your password.
          </Toast.Body>
        </Toast>
        <Toast
          show={userNotFound}
          onClose={toggleUserNotFound}
          delay={3000}
          autohide
        >
          {/* password invalid */}
          <Toast.Header>
            <FontAwesomeIcon
              icon={solid("triangle-exclamation")}
              className="me-1"
              color="orange"
            />
            <strong className="me-auto">User not found</strong>
          </Toast.Header>
          <Toast.Body>User does not exist. Please register.</Toast.Body>
        </Toast>
        <Toast
          show={serverError}
          onClose={toggleServerErrMsg}
          delay={3000}
          autohide
        >
          {/* server error */}
          <Toast.Header>
            <FontAwesomeIcon
              icon={solid("circle-exclamation")}
              className="me-1"
              color="red"
            />
            <strong className="me-auto">Server Error</strong>
          </Toast.Header>
          <Toast.Body>Internal server error. Please try again</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Login;
