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
      {/* Left Column: Image */}
      <div className="flex w-1/2 flex-col items-center">
        <img
          src={`/images/${selectedDimension.width}_${selectedDimension.height}.jpeg`}
          alt={`Stampa su tela ${selectedDimension.width}x${selectedDimension.height}`}
          className="h-80 w-80 border border-gray-300 object-cover"
        />
      </div>

      {/* Right Column: Options */}
      <div className="ml-3 w-1/2">
        <p className="mb-4 text-center text-xl font-bold text-black">
          Stampa su tela
        </p>

        {/* Box formato */}
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

        {/* Box bordo */}
        <div className="mb-6 rounded border border-gray-300 bg-white p-4 shadow">
          <p className="mb-2 font-semibold">Bordo</p>

          {/* Opzioni bordo */}
          <div className="flex flex-col">
            <label className="mb-2 flex items-center">
              <input
                type="radio"
                name="bordo"
                className="mr-2"
                defaultChecked
                // Aggiungere la gestione del bordo se serve
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

        {/* Box spessore */}
        <div className="mb-6 rounded border border-gray-300 bg-white p-4 shadow">
          <p className="mb-2 font-semibold">Spessore</p>
          {/* Opzioni spessore */}
          <div className="flex flex-col">
            <label className="mb-2 flex items-center">
              <input
                type="radio"
                name="spessore"
                className="mr-2"
                defaultChecked
                // Aggiungere la gestione dello spessore se necessario
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
      </div>
    </div>
  );
};

export default DimensionChooser;
