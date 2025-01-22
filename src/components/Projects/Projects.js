import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png"; // Replace with your image
import emotion from "../../Assets/Projects/emotion.png"; // Replace with your image
import EzmarkMock from "../../Assets/Projects/EzmarkMockup.jpeg"; // Replace with your image
import Writezy from "../../Assets/Projects/Writezy.png"; // Replace with your image
import Nector from "../../Assets/Projects/Nector.png"; // Replace with your image
import bitsOfCode from "../../Assets/Projects/blog.png"; // Replace with your image

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={EzmarkMock}
              isApp={true}
              title="EzMark"
              description="EzMark is a React Native app for managing attendance using biometric verification and MFA authentication for secure attendance verification."
              ghLink="https://github.com/Aswin-Hariram/EzMark"  // Update with your GitHub link
              demoLink="https://www.upload-apk.com/en/5QC5YplxNAh59Ae"  // Update with your demo link
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Nector}
              isBlog={false}
              title="Nector"
              description="Nector is an online grocery store built with React.js and JSON-Server. It offers a seamless shopping experience with a user-friendly interface and secure shopping cart."
              ghLink="https://github.com/Aswin-Hariram/nector"  // Update with your GitHub link
              demoLink="https://nector.vercel.app/"  // Update with your demo link
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Writezy}
              isApp={true}
              title="Writezy"
              description="Writezy is a React Native app that uses Gemini AI to generate content based on user input and allows editing with AI assistance."
              ghLink="https://github.com/Aswin-Hariram/Writezy-Mobile-App"  // Update with your GitHub link
              demoLink="https://www.upload-apk.com/en/Q9qPOdoQAaOc8Q2"  // Update with your demo link
            />
          </Col>






        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
