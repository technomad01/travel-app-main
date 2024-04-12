import React, { ReactDOM, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import cityData from "../data/destinations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import ReactTooltip from "react-tooltip";
import AttractionList from "../components/DestinationsComponent/AttractionList";

export default function DestinationDetails() {
  const { slug } = useParams();
  const [city, setCity] = useState(cityData[slug]);

  const metrics = {
    covid: {
      //larger than with max value at 100
      75: "Extreme",
      25: "Critical",
      10: "High",
      1: "Medium",
      0: "Low",
    },
    known_for: {
      charming: solid("heart"),
      foodie: solid("utensils"),
      nightlife: solid("martini-glass-citrus"),
      architecture: solid("city"),
      history: solid("place-of-worship"),
      museums: solid("landmark"),
      "performing-arts": solid("ticket"),
      music: solid("music"),
      hipster: solid("bicycle"),
      hippie: solid("peace"),
      posh: solid("gem"),
      "family-friendly": solid("children"),
      "lgbt-friendly": solid("venus-mars"),
      diversity: solid("people-group"),
      "beach-town": solid("umbrella-beach"),
      "college-town": solid("graduation-cap"),
      "ski-town": solid("person-skiing-nordic"),
      outdoorsy: solid("tree"),
      wineries: solid("wine-bottle"),
      shopping: solid("bag-shopping"),
    },
  };
  console.log(city);
  const featured_photo = city.included.find(
    (data) =>
      data.id !== city.included[0].relationships.featured_photo.data.id &&
      data.type === "photo"
  ).attributes.image.full;

  function printIcons(key, value) {
    const iconsArr = [];
    if (key === "average_rating") {
      const fullRating = Math.floor(value);
      const halfRating = Math.ceil((Math.round(value * 2) / 2) % fullRating);

      for (let index = 1; index <= 5; index++) {
        if (index <= fullRating) {
          iconsArr.push(
            <FontAwesomeIcon
              icon={solid("star")}
              className="mx-1 p-1 border border-2 rounded border-dark"
              color="black"
            />
          );
        } else if (index === fullRating + 1 && halfRating !== 0) {
          iconsArr.push(
            <FontAwesomeIcon
              icon={solid("star-half-stroke")}
              className="mx-1 p-1 border border-2 rounded border-dark"
              color="black"
            />
          );
        } else {
          iconsArr.push(
            <FontAwesomeIcon
              icon={solid("star")}
              className="mx-1 p-1 border border-2 rounded border-dark"
              color="gray"
            />
          );
        }
      }
    } else if (key === "budget") {
      const rating = Math.round(value / 2);
      for (let index = 1; index <= 4; index++) {
        if (index <= rating) {
          iconsArr.push(
            <FontAwesomeIcon
              icon={solid("dollar-sign")}
              className="mx-1 p-1 border border-2 rounded border-dark"
              color="black"
            />
          );
        } else {
          iconsArr.push(
            <FontAwesomeIcon
              icon={solid("dollar-sign")}
              className="mx-1 p-1 border border-2 rounded border-dark"
              color="gray"
            />
          );
        }
      }
    } else if (key === "safety") {
      for (let index = 1; index <= 5; index++) {
        if (index <= value) {
          if (value >= 4) {
            iconsArr.push(
              <FontAwesomeIcon
                icon={solid("shield")}
                className="mx-1 p-1 border border-2 rounded border-dark"
                color="green"
              />
            );
          } else if (value >= 2) {
            iconsArr.push(
              <FontAwesomeIcon
                icon={solid("shield")}
                className="mx-1 p-1 border border-2 rounded border-dark"
                color="orange"
              />
            );
          } else {
            iconsArr.push(
              <FontAwesomeIcon
                icon={solid("shield")}
                className="mx-1 p-1 border border-2 rounded border-dark"
                color="red"
              />
            );
          }
        } else {
          iconsArr.push(
            <FontAwesomeIcon
              icon={solid("shield")}
              className="mx-1 p-1 border border-2 rounded border-dark"
              color="gray"
            />
          );
        }
      }
    }
    return iconsArr;
  }

  return (
    <>
      <Container
        fluid={true}
        style={{
          backgroundImage: `url(${featured_photo})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          padding: 0,
        }}
      >
        <Container
          fluid={true}
          className="py-4 text-start d-flex flex-column justify-content-around align-items-start"
          style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        >
          <h2 className="flex-fill">{`${city.data.attributes.name}`}</h2>

          <Container fluid={true} className="d-flex flex-row">
            <Card className="h-100 m-1">
              <Card.Body className="py-1">
                <h6 className="mx-0 my-2">Budget</h6>
                {printIcons(
                  "budget",
                  city.data.attributes.budget[city.data.attributes.name].value
                )}
              </Card.Body>
            </Card>

            <Card className="h-100 m-1">
              <Card.Body className="py-1">
                <h6 className="mx-0 my-2">Rating</h6>
                {printIcons(
                  "average_rating",
                  city.data.attributes.average_rating
                )}
              </Card.Body>
            </Card>

            <Card className="h-100 m-1">
              <Card.Body className="py-1">
                <h6 className="mx-0 my-2">Safety</h6>
                {printIcons(
                  "safety",
                  city.data.attributes.safety[city.data.attributes.name].value
                )}
              </Card.Body>
            </Card>
            <Card className="h-100 m-1">
              <Card.Body className="py-1">
                <h6 className="mx-0 my-2">Known For</h6>

                {city.data.relationships.known_for.data.length >= 1 ? (
                  city.data.relationships.known_for.data.map((kf, idx) => {
                    const kfId = kf.id;
                    const kfdata = city.included.find(
                      (data) => data.id === kfId
                    ).attributes;
                    return (
                      <>
                        <FontAwesomeIcon
                          icon={metrics.known_for[kfdata.slug]}
                          className="mx-1 p-1 border border-2 rounded border-dark"
                          data-tip={kfdata.name}
                          key={`icon-${idx}`}
                        />
                        <ReactTooltip />
                      </>
                    );
                  })
                ) : (
                  <p>Data Unavailable</p>
                )}
              </Card.Body>
            </Card>
          </Container>
        </Container>
      </Container>

      <AttractionList city={city.data.attributes.long_name} />
    </>
  );
}
