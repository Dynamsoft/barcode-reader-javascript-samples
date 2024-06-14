import React from 'react';
import reactLogo from './assets/logo.svg';
import VideoCapture from './components/VideoCapture/VideoCapture';
import ImageCapture from './components/ImageCapture/ImageCapture';
import './App.css';

class App extends React.Component {
  state = {
    mode: "video"
  };

  render() {
    return (
      <div className='App'>
        <div className='title'>
          <h2 className='title-text'>Hello World for React</h2>
          <img className='title-logo' src={reactLogo} alt="logo"></img>
        </div>
        <div className='top-btns'>
          <button onClick={() => { this.setState({ mode: "video" }) }} style={{ backgroundColor: this.state.mode === "video" ? "rgb(255, 174, 55)" : "#fff" }}>Video Capture</button>
          <button onClick={() => { this.setState({ mode: "image" }) }} style={{ backgroundColor: this.state.mode === "image" ? "rgb(255, 174, 55)" : "#fff" }}>Image Capture</button>
        </div>
        {this.state.mode === "video" ? <VideoCapture /> : <ImageCapture />}
      </div>
    );
  }
}

export default App;
