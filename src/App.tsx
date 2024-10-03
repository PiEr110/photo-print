import DimensionChooser from "./Components/DimensionChooser";
import PrintPreview from "./Components/PrintPreview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrderConfirmation from "./Components/OrderConfirmation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DimensionChooser />} />
        <Route path="/preview/:width/:height" element={<PrintPreview />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
