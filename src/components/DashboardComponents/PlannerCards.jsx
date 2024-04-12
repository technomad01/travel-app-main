import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Toast, ToastContainer } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { PlannerIDsContext } from "../../context/plannerContext";

function PlannerCards({ data, state }) {
  const [plannerIDsData, setPlannerIDsData] = useContext(PlannerIDsContext);
  const [plannerData, setPlannerData] = useState(data);

  function renderDates() {
    const start = new Date(plannerData.travelPeriod.start);
    const end = new Date(plannerData.travelPeriod.end);

    // const dates = start date
  }
  function handleDelete(e) {
    const uuid = plannerData.uuid;
    axios({
      url: `/api/planner/${uuid}`,
      method: "delete",
    }).then(() => {
      state(false);
      axios({
        url: "/api/planner",
        method: "get",
      }).then((res) => {
        setPlannerIDsData(
          res.data.map((planner) => {
            return { name: planner.name, uuid: planner.uuid };
          })
        );
      });
    });
  }

  return (
    <>
      <Card className="flex-grow-0 flex-shrink-0 w-25 text-start mb-3">
        <Card.Body>
          <Card.Title>{plannerData.name}</Card.Title>
          <Card.Text>
            Travel Period :
            {plannerData.travelPeriod.start +
              " - " +
              plannerData.travelPeriod.end}
            <br />
            Planner Destination : {plannerData.destination}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
          <LinkContainer to={`/planner/${plannerData.uuid}`}>
            <Button variant="primary" className="me-1">
              <FontAwesomeIcon icon={solid("eye")} />
            </Button>
          </LinkContainer>
          <Button
            variant="danger"
            onClick={handleDelete}
            data-uuid={plannerData.uuid}
          >
            <FontAwesomeIcon icon={solid("x")} />
          </Button>
        </Card.Footer>
      </Card>{" "}
    </>
  );
}

export default PlannerCards;
