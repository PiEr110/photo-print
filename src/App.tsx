import DimensionChooser from "./Components/DimensionChooser";
import PrintPreview from "./Components/PrintPreview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrderConfirmation from "./Components/OrderConfirmation";
import { GalleryProvider } from "./context/GalleryContext";

function App() {
  return (
    <GalleryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DimensionChooser />} />
          <Route path="/preview/:width/:height" element={<PrintPreview />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
        </Routes>
      </Router>
    </GalleryProvider>
  );
}

export default App;
