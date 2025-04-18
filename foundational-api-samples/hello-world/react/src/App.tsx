import React from "react";
import reactLogo from "./assets/logo.svg";
import "./dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import VideoCapture from "./components/VideoCapture/VideoCapture";
import ImageCapture from "./components/ImageCapture/ImageCapture";
import "./App.css";

enum Modes {
  VIDEO_CAPTURE = "video",
  IMAGE_CAPTURE = "image",
}

class App extends React.Component {
  state = {
    mode: Modes.VIDEO_CAPTURE,
  };

  showVideoCapture = () => {
    this.setState({
      mode: Modes.VIDEO_CAPTURE,
    });
  };

  showImageCapture = () => {
    this.setState({
      mode: Modes.IMAGE_CAPTURE,
    });
  };

  render() {
    return (
      <div className="hello-world-page">
        <div className="title">
          <h2 className="title-text">Hello World for React</h2>
          <img className="title-logo" src={reactLogo} alt="logo"></img>
        </div>
        <div className="buttons-container">
          <button
            style={{
              backgroundColor: this.state.mode === Modes.VIDEO_CAPTURE ? "rgb(255,174,55)" : "white",
            }}
            onClick={this.showVideoCapture}
          >
            Decode Video
          </button>
          <button
            style={{
              backgroundColor: this.state.mode === Modes.IMAGE_CAPTURE ? "rgb(255,174,55)" : "white",
            }}
            onClick={this.showImageCapture}
          >
            Decode Image
          </button>
        </div>
        <div className="container">{this.state.mode === Modes.VIDEO_CAPTURE ? <VideoCapture /> : <ImageCapture />}</div>
      </div>
    );
  }
}

export default App;
