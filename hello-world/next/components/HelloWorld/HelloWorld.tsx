"use client"

import React, { useState } from "react";
import "../../dbr"; // import side effects. The license, engineResourcePath, so on.
import "../../cvr"; // import side effects. The license, engineResourcePath, so on.
import "../../dce"; // import side effects. The license, engineResourcePath, so on.
import VideoCapture from "../VideoCapture/VideoCapture";
import ImageCapture from "../ImageCapture/ImageCapture";
import "./HelloWorld.css";

function HelloWorld() {
  let [bShowVideoCapture, setBShowVideoCapture] = useState(true);
  let [bShowImageCapture, setBShowImageCapture] = useState(false);

  const showVideoCapture = () => {
    setBShowVideoCapture(true);
    setBShowImageCapture(false);
  };

  const showImageCapture = () => {
    setBShowVideoCapture(false);
    setBShowImageCapture(true);
  };

  return (
    <div className="div-hello-world">
      <h1>Hello World for Next</h1>
      <div>
        <button
          style={{
            marginRight: "10px",
            backgroundColor: bShowVideoCapture ? "rgb(255,174,55)" : "white",
          }}
          onClick={showVideoCapture}
        >
          Decode Video
        </button>
        <button
          style={{
            backgroundColor: bShowImageCapture ? "rgb(255,174,55)" : "white",
          }}
          onClick={showImageCapture}
        >
          Decode Image
        </button>
      </div>
      <div className="container">
        {bShowVideoCapture ? <VideoCapture></VideoCapture> : ""}
        {bShowImageCapture ? <ImageCapture></ImageCapture> : ""}
      </div>
    </div>
  );
}

export default HelloWorld;
