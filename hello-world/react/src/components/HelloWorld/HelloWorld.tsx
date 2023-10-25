import React from "react";
import "../../dbr"; // import side effects. The license, engineResourcePath, so on.
import "../../cvr"; // import side effects. The license, engineResourcePath, so on.
import "../../dce"; // import side effects. The license, engineResourcePath, so on.
import { VideoCapture } from "../VideoCapture/VideoCapture";
import { ImageCapture } from "../ImageCapture/ImageCapture";
import "./HelloWorld.css";

export class HelloWorld extends React.Component {
  state = {
    bShowVideoCapture: true,
    bShowImageCapture: false,
  };

  showVideoCapture = () => {
    this.setState({
      bShowVideoCapture: true,
      bShowImageCapture: false,
    });
  };

  showImageCapture = () => {
    this.setState({
      bShowVideoCapture: false,
      bShowImageCapture: true,
    });
  };

  render() {
    return (
      <div className="div-hello-world">
        <h1>Hello World for React</h1>
        <div>
          <button
            style={{
              marginRight: "10px",
              backgroundColor: this.state.bShowVideoCapture
                ? "rgb(255,174,55)"
                : "white",
            }}
            onClick={this.showVideoCapture}
          >
            Decode Video
          </button>
          <button
            style={{
              backgroundColor: this.state.bShowImageCapture
                ? "rgb(255,174,55)"
                : "white",
            }}
            onClick={this.showImageCapture}
          >
            Decode Image
          </button>
        </div>
        <div className="container">
          {this.state.bShowVideoCapture ? <VideoCapture></VideoCapture> : ""}
          {this.state.bShowImageCapture ? <ImageCapture></ImageCapture> : ""}
        </div>
      </div>
    );
  }
}
