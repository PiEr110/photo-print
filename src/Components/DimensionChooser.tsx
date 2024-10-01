import BoxFormato from "./BoxFormato";

const DimensionChooser = ({ openPreview }: { openPreview: () => void }) => {
  return (
    <div className="h-screen flex justify-center items-start p-8">
      {/* Nella colonna a sx mettiamo l'immagine dimostrativa */}
      <div className="w-1/2 flex flex-col items-center">
        <img
          src="src/image/20_20.jpeg"
          alt="stampa su tela"
          className="border border-gray-300 w-80 h-80 object-cover"
        />
      </div>

      {/* Nella colonna a dx mettiamo le opzioni */}
      <div className="w-1/2 ml-8">
        <p className="font-bold text-black text-xl mb-4">Stampa su tela</p>

        {/* Box formato */}
        <div className="bg-gray-100 border border-gray-300 p-4 mb-6">
          <p className="font-semibold mb-2">Formato (cm)</p>
          <BoxFormato />
        </div>

        {/* Box bordo */}
        <div className="bg-gray-100 border border-gray-300 p-4 mb-6">
          <p className="font-semibold mb-2">Bordo</p>

          {/* Opzioni bordo */}
          <div>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="bordo"
                className="mr-2"
                defaultChecked
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
        <div className="bg-gray-100 border border-gray-300 p-4">
          <p className="font-semibold mb-2">Spessore</p>
          {/* Opzioni spessore */}
          <div>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="spessore"
                className="mr-2"
                defaultChecked
              />
              2 cm
            </label>
            <label className="flex items-center mb-2">
              <input type="radio" name="spessore" className="mr-2" />
              3,5 cm (+5,00 €)
            </label>
          </div>
        </div>

        <div className=" flex justify-end mt-2 mb-1">
          <button
            className="bg-blue-400 text-white py-2 px-4 rounded"
            onClick={openPreview}
          >
            Continua
          </button>
        </div>
      </div>
    </div>
  );
};

export default DimensionChooser;
