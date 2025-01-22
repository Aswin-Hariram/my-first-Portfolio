import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Computer Science Student",
          "Web Developer",
          "Mobile App Developer",
          "MERN Stack Developer",
          "Native Android Developer",
          "Open Source Contributor",

        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
