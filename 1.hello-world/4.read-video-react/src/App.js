import './App.css';
import reactLogo from './logo.svg';
import HelloWorld from './components/HelloWorld.js';

function App() {
  return (
    <div className="App">
      <div className="App-logo"><img src={reactLogo} className="App-logo" alt="logo" /></div>
      <HelloWorld></HelloWorld>
    </div>
  );
}

export default App;
