import GridReader from "./components/GridReader";
import "./App.css";

function App() {
  return (
    <div>
      <h2>Grid Barcode Reading</h2>
      <p style={{ margin: "10px 0", color: "#666" }}>Select an image containing a grid of barcodes.</p>
      <GridReader />
    </div>
  );
}

export default App;
