import React from "react";

const BoxFormato = () => {
  return (
    <div>
      <div className="flex flex-col">
        {[
          "20x20",
          "20x30 (+5,00 €)",
          "30x30 (+10,00 €)",
          "30x40 (+15,00 €)",
          "40x40 (+35,00 €)",
          "40x60 (+40,00 €)",
          "50x50 (+45,00 €)",
          "50x70 (+50,00 €)",
          "50x100 (+79,10 €)",
          "60x90 (+65,00 €)",
          "90x90 (+125,00 €)",
          "90x120 (+130,00 €)",
          "120x120 (+160,00 €)",
        ].map((format, index) => (
          <label className="flex items-center mb-2" key={index}>
            <input
              type="radio"
              name="formato"
              className="mr-2"
              defaultChecked={index === 0}
            />
            {format}
          </label>
        ))}
      </div>
    </div>
  );
};

export default BoxFormato;
