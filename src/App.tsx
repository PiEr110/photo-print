import { useState } from "react";
import DimensionChooser from "./Components/DimensionChooser";
import PrintPreview from "./Components/PrintPreview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrderConfirmation from "./Components/OrderConfirmation";

function App() {
  // const [showPreview, setShowPreview] = useState(false);
  // const [selectedDimension, setSelectedDimension] = useState<{
  //   width: number;
  //   height: number;
  // } | null>(null);

  // const goPreview = (dimensions: { width: number; height: number }) => {
  //   setSelectedDimension(dimensions);
  //   setShowPreview(true);
  // };

  // return (
  //   <>
  //     <div>
  //       {showPreview && selectedDimension ? (
  //         <PrintPreview dimensions />
  //       ) : (
  //         <DimensionChooser openPreview={goPreview} />
  //       )}
  //     </div>
  //   </>
  // );

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
