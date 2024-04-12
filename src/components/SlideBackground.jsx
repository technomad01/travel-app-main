import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.css";
import newYork from "../images/new_york.jpg";
import cairo from "../images/cairo.jpg";
import seoul from "../images/seoul.jpg";
import sydney from "../images/sydney.jpg";
import rioDeJaneiro from "../images/rio_de_janeiro.jpg";
import paris from "../images/paris.jpg";

export default function SlideBackground() {
  // eslint-disable-next-line no-unused-vars
  const [cityImages, setCityImages] = useState([
    { name: "New York, USA", image: newYork },
    { name: "Paris, France", image: paris },
    { name: "Cairo, Egypt", image: cairo },
    { name: "Sydney, Australia", image: sydney },
    { name: "Seoul, South Korea", image: seoul },
    { name: "Rio de Janeiro, Brazil", image: rioDeJaneiro },
  ]);

  function slideshow() {
    const imgDuration = 5000;
    const fadeSpeed = 2000;
    let currIndex = 0;

    const startSlideshow = () => {
      $(`.slide-${currIndex}`).hide("slide", { direction: "right" }, fadeSpeed);

      currIndex++;
      if (currIndex >= $(".slides").length) {
        currIndex = 0;
      }

      $(`.slide-${currIndex}`).show("slide", { direction: "left" }, fadeSpeed);
      setTimeout(() => {
        startSlideshow();
      }, imgDuration);
    };

    setTimeout(startSlideshow, imgDuration);
  }

  useEffect(() => {
    slideshow();
  }, []);

  return (
    <Container fluid={true} className="p-0 d-flex" id="slideshow">
      {cityImages.map((city, idx) => {
        return (
          <Container
            fluid={true}
            key={idx}
            className={`p-0 slides slide-${idx} position-absolute bottom-0 left-0 vh-100 w-100`}
            style={{
              backgroundImage: `url(${city.image})`,
              display: idx === 0 ? "flex" : "none",
            }}
          >
            {/* <Image className="landing-bg" src={city.img} alt={city.name} /> */}
            <div className="caption-landing">
              <h5 className="m-0 p-0">{city.name}</h5>
            </div>
          </Container>
        );
      })}
    </Container>
  );
}
