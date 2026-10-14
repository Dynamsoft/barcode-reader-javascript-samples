import ImageCapture from "./components/ImageCapture";
import "./App.css";

function App() {
  return (
    <div>
      <h2>Read an Image</h2>
      <p style={{ margin: "10px 0", color: "#666" }}>Select an image file containing barcodes to decode.</p>
      <ImageCapture />
    </div>
  );
}

export default App;
