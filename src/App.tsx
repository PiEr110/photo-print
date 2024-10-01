import { useState } from "react";
import DimensionChooser from "./Components/DimensionChooser";
import PrintPreview from "./Components/PrintPreview";

function App() {
  const [showPreview, setShowPreview] = useState(false);

  const goPreview = () => {
    setShowPreview(true);
  };

  return (
    <>
      <div>
        {showPreview ? (
          <PrintPreview />
        ) : (
          <DimensionChooser openPreview={goPreview} />
        )}
      </div>
    </>
  );
}

export default App;
