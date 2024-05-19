import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./Route";

function App() {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
}

export default App;
