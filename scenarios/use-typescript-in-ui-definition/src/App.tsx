import reactLogo from "./assets/logo.svg";
import VideoCapture from "./components/VideoCapture/VideoCapture";
import "./App.css";

function App() {

  return (
    <div className="hello-world-page">
      <div className="title">
        <h2 className="title-text">React with Customized Camera UI</h2>
        <img className="title-logo" src={reactLogo} alt="logo"></img>
      </div>
      <div className="container"><VideoCapture /></div>
    </div>
  );
}

export default App;
