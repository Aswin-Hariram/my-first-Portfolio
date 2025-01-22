import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Aswin H </span>
            from <span className="purple"> Coimbatore, India.</span>
            <br />
            I am a passionate developer specializing in React, React Native, and Android Native development.
            <br />
            I am currently working on various projects, including EzMark, Writezy, and Nector.
            <br />
            <br />
            I enjoy doing the following:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Mobile App Development
            </li>
            <li className="about-activity">
              <ImPointRight /> Web Development
            </li>
            <li className="about-activity">
              <ImPointRight /> Learning New Technologies
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Aswin H</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
