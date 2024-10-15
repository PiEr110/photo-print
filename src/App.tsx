import DimensionChooser from "./Components/DimensionChooser";
import PrintPreview from "./Components/PrintPreview";
import { Route, Routes, HashRouter } from "react-router-dom";
import OrderConfirmation from "./Components/OrderConfirmation";
import DimensionProvider from "./context/DimensionContext";

function App() {
  return (
    <DimensionProvider>
      {/* <Router>
        <Routes>
          <Route path="/" element={<DimensionChooser />} />
          <Route path="/preview" element={<PrintPreview />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
        </Routes>
      </Router> */}
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<DimensionChooser />} />
          <Route path="/preview" element={<PrintPreview />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
        </Routes>
      </HashRouter>
    </DimensionProvider>
  );
}

export default App;
