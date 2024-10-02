// src/components/PrintPreview.tsx
import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  useEffect,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import { getCroppedImg, CroppedAreaPixels } from "./cropImage";
import { RiImageAddFill } from "react-icons/ri";

interface RouteParams {
  width: string;
  height: string;
}

const PrintPreview: React.FC = () => {
  const { width, height } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Conversione da cm a pixel (1 cm ≈ 35.4331 px)
  const CM_TO_PX = 35.4331;
  const DIV_WIDTH: number = width ? parseInt(width) * CM_TO_PX : 704;
  const DIV_HEIGHT: number = height ? parseInt(height) * CM_TO_PX : 704;

  const handleChoosePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = reader.result as string;
        const img = new Image();
        img.src = result;
        img.onload = () => {
          if (img.width <= DIV_WIDTH && img.height <= DIV_HEIGHT) {
            setImage(result);
            setCroppedImage(null);
          } else {
            setMessage(
              "L'immagine selezionata supera le dimensioni consentite. Per favore, ritagliala per adattarla alla tela di stampa."
            );
            setShowCropper(true);
            setImage(result);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: CroppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCrop = useCallback(async () => {
    if (image && croppedAreaPixels) {
      try {
        const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels);
        setCroppedImage(croppedImageUrl);
        setShowCropper(false);
      } catch (error) {
        console.error(error);
      }
    }
  }, [image, croppedAreaPixels]);

  const handleCancelCrop = () => {
    setShowCropper(false);
    setImage(null);
    setMessage("");
  };

  const handleOrder = () => {
    navigate("/confirmation");
  };

  useEffect(() => {
    return () => {
      if (croppedImage) {
        URL.revokeObjectURL(croppedImage);
      }
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [croppedImage, image]);

  return (
    <>
      <div className="flex items-center justify-center bg-gray-200 min-h-screen p-4">
        <div
          className="flex items-center justify-center bg-white border border-black relative"
          style={{
            width: DIV_WIDTH,
            height: DIV_HEIGHT,
            backgroundImage: croppedImage
              ? `url(${croppedImage})`
              : image
              ? `url(${image})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: image ? "grab" : "default",
          }}
          onClick={!image ? handleChoosePhoto : undefined}
        >
          {!image && (
            <RiImageAddFill
              size={100}
              onClick={handleChoosePhoto}
              className="cursor-pointer text-gray-500"
            />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      {/* Cropper Modal */}
      {showCropper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-11/12 md:w-2/3 lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Ritaglia l'Immagine</h2>
            <div className="relative w-full h-64 bg-gray-300">
              {image && (
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={DIV_WIDTH / DIV_HEIGHT}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              )}
            </div>
            <div className="mt-4">
              <label className="block mb-2">Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCancelCrop}
              >
                Annulla
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleCrop}
              >
                Ritaglia
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {message && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-11/12 md:w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              Immagine Troppo Grande
            </h2>
            <p className="mb-4">{message}</p>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setMessage("")}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ordina Button */}
      {image && (
        <div className="fixed bottom-4 right-4">
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600"
            onClick={handleOrder}
          >
            Ordina
          </button>
        </div>
      )}
    </>
  );
};

export default PrintPreview;
