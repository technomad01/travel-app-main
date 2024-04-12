import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useContext } from "react";
import {
  Card,
  Button,
  Modal,
  Col,
  Image,
  Container,
  Row,
  Carousel,
  Dropdown,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { LinkContainer } from "react-router-bootstrap";
import ReactTooltip from "react-tooltip";
import { PlannerIDsContext } from "../../context/plannerContext";

export default function AttractionCards({ data }) {
  const [plannerIDsData, setPlannerIDsData] = useContext(PlannerIDsContext);

  const [attraction, setAttraction] = useState(data);
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const showSuccessAdd = () => setShowSuccess();

  function handleAddToPlanner(e) {
    console.log(attraction);
    axios({
      url: "/api/planner",
      method: "put",
      data: { uuid: e.target.id, data: attraction },
    }).then((res) => {
      console.log(res.data);
      setShowSuccess(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    });
  }
  return (
    <>
      <Col className="d-flex">
        <Card className="flex-fill text-start">
          <Card.Body className="w-100 h-100 d-flex flex-column justify-content-around">
            <h5>{attraction.name}</h5>
            <p>{attraction.location.formatted_address}</p>
            <p>
              <FontAwesomeIcon icon={solid("location-pin")} /> &nbsp;{" "}
              {(attraction.distance / 1000).toFixed(2)} KM from City Center
            </p>
            <Button
              variant="outline-secondary"
              className="align-self-end"
              onClick={() => setShow(!show)}
              centered={true}
            >
              More Info
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className="attraction-modal"
        centered
      >
        <Modal.Body className="">
          <Container className="">
            <Row>
              <Col>
                <Modal.Title>{attraction.name}</Modal.Title>
              </Col>
              <Col className="text-end">
                {attraction.categories.map((category) => {
                  const categoryIcon =
                    category.icon.prefix + "bg_32" + category.icon.suffix;
                  return (
                    <>
                      <Image src={categoryIcon} data-tip={category.name} />
                      <ReactTooltip />
                    </>
                  );
                })}
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <h5 className="d-inline me-1">{attraction.rating}</h5>
                    <FontAwesomeIcon icon={solid("star")} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>{attraction.location.formatted_address}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>
                      <FontAwesomeIcon icon={solid("location-pin")} /> &nbsp;{" "}
                      {(attraction.distance / 1000).toFixed(2)} KM from City
                      Center
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>{attraction.hours.display}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>{attraction.description}</p>
                  </Col>
                </Row>
              </Col>
              <Col lg="6" sm="6" md="6">
                <Carousel slide className="">
                  {attraction.photos.map((photo) => {
                    const photoURL = photo.prefix + "original" + photo.suffix;
                    return (
                      <Carousel.Item>
                        <Image
                          className="d-block mx-auto"
                          src={photoURL}
                          alt={attraction.name}
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </Col>
            </Row>
            {/*  */}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Dropdown>
            <Dropdown.Toggle>
              <FontAwesomeIcon icon={solid("plus-circle")} />
              &nbsp; Add to Planner
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {plannerIDsData &&
                plannerIDsData.map((planner) => {
                  return (
                    <DropdownItem
                      key={planner.uuid}
                      id={planner.uuid}
                      onClick={handleAddToPlanner}
                    >
                      {planner.name}
                    </DropdownItem>
                  );
                })}
              <LinkContainer to="/planner/create">
                <Dropdown.Item>
                  <FontAwesomeIcon icon={solid("circle-plus")} />
                  Create a Planner
                </Dropdown.Item>
              </LinkContainer>
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Footer>
        <ToastContainer position="bottom-end" className="me-3 mb-3">
          <Toast
            show={showSuccess}
            onClose={() => setShowSuccess(false)}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <FontAwesomeIcon
                icon={solid("check-circle")}
                color="green"
                className="me-1"
              />
              <strong className="me-auto">Attraction Added</strong>
            </Toast.Header>
            <Toast.Body>Added {attraction.name}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Modal>
    </>
  );
}

/*  */
