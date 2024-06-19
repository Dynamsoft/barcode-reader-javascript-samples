import { useState } from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import reactLogo from "../../assets/logo.svg";
import VideoCapture from "../VideoCapture/VideoCapture";
import ImageCapture from "../ImageCapture/ImageCapture";
import "./HelloWorld.css";

enum Modes {
  VIDEO_CAPTURE = "video",
  IMAGE_CAPTURE = "image",
}

function HelloWorld() {
  const [mode, setMode] = useState(Modes.VIDEO_CAPTURE);

  const showVideoCapture = () => setMode(Modes.VIDEO_CAPTURE);

  const showImageCapture = () => setMode(Modes.IMAGE_CAPTURE);

  return (
    <div className="hello-world-page">
      <div className="title">
        <h2 className="title-text">Hello World for React</h2>
        <img className="title-logo" src={reactLogo} alt="logo"></img>
      </div>
      <div className="buttons-container">
        <button
          style={{
            backgroundColor: mode === Modes.VIDEO_CAPTURE ? "rgb(255,174,55)" : "white",
          }}
          onClick={showVideoCapture}
        >
          Decode Video
        </button>
        <button
          style={{
            backgroundColor: mode === Modes.IMAGE_CAPTURE ? "rgb(255,174,55)" : "white",
          }}
          onClick={showImageCapture}
        >
          Decode Image
        </button>
      </div>
      <div className="container">{mode === Modes.VIDEO_CAPTURE ? <VideoCapture /> : <ImageCapture />}</div>
    </div>
  );
}

export default HelloWorld;
