import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { SlideBackground } from "../components";

export default function Home() {
  return (
    <Container className="p-0 d-flex flex-column flex-fill" fluid>
      <SlideBackground />
      <div
        className="d-flex flex-fill flex-column justify-content-center align-items-end"
        id="landing"
      >
        <div
          className="d-flex flex-column gap-1 justify-content-center align-items-end "
          id="landing-text"
        >
          <h2>Travel App</h2>
          <h4>Plan your next trip with ease!</h4>
          <br />
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="d-flex gap-2">
            <LinkContainer to="/register">
              <Button className="px-4" size="lg" variant="primary">
                Sign Up
              </Button>
            </LinkContainer>
            <LinkContainer to="/login">
              <Button variant="dark" size="lg">
                Sign In
              </Button>
            </LinkContainer>
          </div>
        </div>
      </div>
    </Container>
  );
}
