// src/components/DimensionChooser.tsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { DimensionContext } from "../context/DimensionContext";

type ProporzioneDimensioni = {
  [key: string]: string[];
};

const proporzioneDimensioni: ProporzioneDimensioni = {
  "1:1": ["50x50", "70x70", "90x90", "110x110", "140x140"],
  "2:3": ["40x60", "80x120", "60x90", "100x150"],
  "3:2": ["60x40", "150x100", "120x80", "90x60"],
  "5:7": ["50x70"],
  "7:5": ["70x50"],
  "7:10": ["70x100"],
  "10:7": ["100x70"],
  "1:2": ["50x100", "75x150", "100x200"],
  "2:1": ["100x50", "150x75", "200x100"],
};

const DimensionChooser: React.FC = () => {
  const { setProperty } = useContext(DimensionContext);

  const [selectedDimension, setSelectedDimension] = useState<{
    width: number;
    height: number;
  }>({
    width: 50,
    height: 50,
  });

  const [selectedProportion, setSelectedProportion] = useState<string>("1:1");

  const navigate = useNavigate();

  const handleDimensionChange = (dimension: string) => {
    const [width, height] = dimension.split("x").map(Number);
    setSelectedDimension({ width, height });
  };

  const handleProportionChange = (proportion: string) => {
    setSelectedProportion(proportion);
  };

  const handleContinue = () => {
    navigate("/preview");
    setProperty(
      selectedDimension.width,
      selectedDimension.height,
      selectedProportion,
    );
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-8">
      <div className="w-3/4 rounded-lg bg-white p-4 shadow-md">
        <Accordion>
          {Object.entries(proporzioneDimensioni).map(
            ([proporzione, dimensioni]) => (
              <AccordionItem
                key={proporzione}
                title={`Proporzione ${proporzione}`}
                className="mb-2 rounded-lg border border-gray-300 pl-3 shadow-sm"
                onClick={() => handleProportionChange(proporzione)}
              >
                <ul className="grid grid-cols-2 gap-4 bg-gray-50 p-4">
                  {dimensioni.map((dimensione) => (
                    <button
                      className="block w-full rounded-lg border border-gray-300 bg-white p-2 text-center text-sm font-semibold text-gray-800 shadow hover:border-blue-500 hover:bg-gray-100 focus:ring focus:ring-blue-200"
                      key={dimensione}
                      onClick={() => handleDimensionChange(dimensione)}
                    >
                      {dimensione + " cm"}
                    </button>
                  ))}
                </ul>
              </AccordionItem>
            ),
          )}
        </Accordion>

        <div className="mt-4 flex justify-end">
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleContinue}
          >
            Continua
          </button>
        </div>
      </div>
    </div>
  );
};

export default DimensionChooser;
