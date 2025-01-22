import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              Hi, I’m Aswin H, a passionate developer from Coimbatore, India.
              I specialize in building engaging applications using cutting-edge technologies.
              <br />
              <br />I am proficient in
              <i>
                <b className="purple"> JavaScript, React, React Native, and Spring Boot. </b>
              </i>
              <br />
              <br />
              My current focus lies in creating innovative solutions in
              <b className="purple"> Mobile App Development </b>,
              <b className="purple"> Web Development </b>, and exploring
              <b className="purple"> Cloud Technologies.</b>
              <br />
              <br />
              I am also dedicated to enhancing user experiences by developing products using
              <b className="purple"> Node.js </b> and modern frameworks like
              <i>
                <b className="purple"> React.js and Next.js. </b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={require("../../Assets/mypic.jpeg")} className="img-fluid" alt="avatar" style={{ borderRadius: '100%', marginLeft: 50 }} />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Aswin-Hariram"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/aswin-hariram/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/aswin_hariram_"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>

            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
