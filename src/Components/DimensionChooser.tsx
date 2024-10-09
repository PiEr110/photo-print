// src/components/DimensionChooser.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

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

// const predefinedDimensions: Array<{ width: number; height: number }> = [
//   { width: 20, height: 20 },
//   { width: 20, height: 30 },
//   { width: 30, height: 30 },
//   { width: 30, height: 40 },
//   { width: 40, height: 40 },
//   { width: 40, height: 60 },
//   { width: 50, height: 50 },
//   { width: 50, height: 70 },
//   { width: 50, height: 100 },
//   { width: 60, height: 90 },
//   { width: 90, height: 90 },
//   { width: 90, height: 120 },
//   { width: 120, height: 120 },
// ];

const DimensionChooser: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState<{
    width: number;
    height: number;
  }>({
    width: 20,
    height: 20,
  });

  const navigate = useNavigate();

  const handleDimensionChange = (dimension: {
    width: number;
    height: number;
  }) => {
    setSelectedDimension(dimension);
  };

  const handleContinue = () => {
    navigate(`/preview/${selectedDimension.width}/${selectedDimension.height}`);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-8">
      {/* <div className="flex w-1/2 flex-col items-center">
        <img
          src={`/images/${selectedDimension.width}_${selectedDimension.height}.jpeg`}
          alt={`Stampa su tela ${selectedDimension.width}x${selectedDimension.height}`}
          className="h-80 w-80 border border-gray-300 object-cover"
        />
      </div> */}

      {/* Right Column: Options */}
      {/* <div className="ml-3 w-1/2">
        <p className="mb-4 text-center text-xl font-bold text-black">
          Stampa su tela
        </p>

        <div className="mb-6 rounded border border-gray-300 bg-white p-4 shadow">
          <p className="mb-2 font-semibold">Formato (cm)</p>
          <div className="flex flex-wrap">
            {predefinedDimensions.map((dim) => (
              <button
                key={`${dim.width}x${dim.height}`}
                onClick={() => handleDimensionChange(dim)}
                className={`m-2.5 rounded border px-4 py-2 ${
                  selectedDimension.width === dim.width &&
                  selectedDimension.height === dim.height
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {dim.width}x{dim.height}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 rounded border border-gray-300 bg-white p-4 shadow">
          <p className="mb-2 font-semibold">Bordo</p>

          <div className="flex flex-col">
            <label className="mb-2 flex items-center">
              <input
                type="radio"
                name="bordo"
                className="mr-2"
                defaultChecked
              />
              Allungato
            </label>
            <label className="mb-2 flex items-center">
              <input type="radio" name="bordo" className="mr-2" />
              Ripiegato
            </label>
            <label className="mb-2 flex items-center">
              <input type="radio" name="bordo" className="mr-2" />
              Specchiato
            </label>
          </div>
        </div>

        <div className="mb-6 rounded border border-gray-300 bg-white p-4 shadow">
          <p className="mb-2 font-semibold">Spessore</p>
          <div className="flex flex-col">
            <label className="mb-2 flex items-center">
              <input
                type="radio"
                name="spessore"
                className="mr-2"
                defaultChecked
              />
              2 cm
            </label>
            <label className="mb-2 flex items-center">
              <input type="radio" name="spessore" className="mr-2" />
              3,5 cm (+5,00 €)
            </label>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleContinue}
          >
            Continua
          </button>
        </div>
      </div> */}

      <div className="w-3/4 rounded-lg bg-white p-4 shadow-md">
        <Accordion>
          {Object.entries(proporzioneDimensioni).map(
            ([proporzione, dimensioni]) => (
              <AccordionItem
                key={proporzione}
                title={`Proporzione ${proporzione}`}
                className="mb-2 rounded-lg border border-gray-300 pl-3 shadow-sm"
              >
                <ul className="grid grid-cols-2 gap-4 bg-gray-50 p-4">
                  {dimensioni.map((dimensione) => (
                    <button
                      className="block w-full rounded-lg border border-gray-300 bg-white p-2 text-center text-sm font-semibold text-gray-800 shadow hover:border-blue-500 hover:bg-gray-100 focus:ring focus:ring-blue-200"
                      key={dimensione}
                    >
                      {dimensione + " cm"}
                    </button>
                  ))}
                </ul>
              </AccordionItem>
            ),
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default DimensionChooser;
