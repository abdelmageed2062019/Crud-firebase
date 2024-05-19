import { Routes, Route } from "react-router-dom";
import Crud from "./Crud";
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Crud />} />
    </Routes>
  );
};

export default RoutesComponent;
