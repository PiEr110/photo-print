// src/components/DimensionChooser.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const predefinedDimensions: Array<{ width: number; height: number }> = [
  { width: 20, height: 20 },
  { width: 20, height: 30 },
  { width: 30, height: 30 },
  { width: 30, height: 40 },
  { width: 40, height: 40 },
  { width: 40, height: 60 },
  { width: 50, height: 50 },
  { width: 50, height: 70 },
  { width: 50, height: 100 },
  { width: 60, height: 90 },
  { width: 90, height: 90 },
  { width: 90, height: 120 },
  { width: 120, height: 120 },
];

const DimensionChooser: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState<{
    width: number;
    height: number;
  }>({
    width: 20,
    height: 30,
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
    <div className="h-screen flex justify-center items-center p-8 bg-gray-100">
      {/* Left Column: Image */}
      <div className="w-1/2 flex flex-col items-center">
        <img
          src={`/images/${selectedDimension.width}_${selectedDimension.height}.jpeg`}
          alt={`Stampa su tela ${selectedDimension.width}x${selectedDimension.height}`}
          className="border border-gray-300 w-80 h-80 object-cover"
        />
      </div>

      {/* Right Column: Options */}
      <div className="w-1/2 ml-8">
        <p className="font-bold text-black text-xl mb-4">Stampa su tela</p>

        {/* Box formato */}
        <div className="bg-white border border-gray-300 p-4 mb-6 shadow rounded">
          <p className="font-semibold mb-2">Formato (cm)</p>
          <div className="flex space-x-4 flex-wrap space-y-4">
            {predefinedDimensions.map((dim) => (
              <button
                key={`${dim.width}x${dim.height}`}
                onClick={() => handleDimensionChange(dim)}
                className={`px-4 py-2 border rounded ${
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

        {/* Box bordo */}
        <div className="bg-white border border-gray-300 p-4 mb-6 shadow rounded">
          <p className="font-semibold mb-2">Bordo</p>

          {/* Opzioni bordo */}
          <div className="flex flex-col">
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="bordo"
                className="mr-2"
                defaultChecked
                // Aggiungi la gestione dello stato se necessario
              />
              Allungato
            </label>
            <label className="flex items-center mb-2">
              <input type="radio" name="bordo" className="mr-2" />
              Ripiegato
            </label>
            <label className="flex items-center mb-2">
              <input type="radio" name="bordo" className="mr-2" />
              Specchiato
            </label>
          </div>
        </div>

        {/* Box spessore */}
        <div className="bg-white border border-gray-300 p-4 mb-6 shadow rounded">
          <p className="font-semibold mb-2">Spessore</p>
          {/* Opzioni spessore */}
          <div className="flex flex-col">
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="spessore"
                className="mr-2"
                defaultChecked
                // Aggiungi la gestione dello stato se necessario
              />
              2 cm
            </label>
            <label className="flex items-center mb-2">
              <input type="radio" name="spessore" className="mr-2" />
              3,5 cm (+5,00 €)
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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
