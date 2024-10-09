import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { RiImageAddFill } from "react-icons/ri";
import { FixedCropper, FixedCropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { DimensionContext } from "../context/DimensionContext";
import localforage from "localforage";

const PrintPreview = () => {
  const { width, height, proportion } = useContext(DimensionContext);

  const navigate = useNavigate();

  const [image, setImage] = useState<string | null>(null);

  const [croppedImage, setcroppedImage] = useState<string>();

  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<FixedCropperRef>(null);

  const MAX_WIDTH = 900;
  const MAX_HEIGHT = 650;
  const scaleFactor = Math.min(
    MAX_WIDTH / (width ? width : 1),
    MAX_HEIGHT / (height ? height : 1),
  );
  const scaledWidth = (width ? width : 1) * scaleFactor;
  const scaledHeight = (height ? height : 1) * scaleFactor;

  const refactorRatio: (proportion: string) => number = (
    proportion: string,
  ) => {
    const [numerator, denominator] = proportion.split(":").map(Number);
    return numerator / denominator;
  };

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
          if (img.width <= scaledWidth && img.height <= scaledHeight) {
            setImage(result);
            setcroppedImage("");
            saveImage("printPreview_image", result);
            saveImage("printPreview_croppedImage", null);
          } else {
            setShowCropper(true);
            setImage(result);
            saveImage("printPreview_image", result);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const onCrop = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();

      if (canvas) {
        const croppedDataUrl = canvas.toDataURL();
        setcroppedImage(croppedDataUrl);
        saveImage("printPreview_croppedImage", croppedDataUrl);
        handleOrder();
      }
    }
  };

  const handleOrder = () => {
    navigate("/confirmation");
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenuVisible(true);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMenuClose = () => {
    setContextMenuVisible(false);
  };

  const handleChangePhoto = () => {
    handleChoosePhoto();
    handleMenuClose();
  };

  const handleresizePhoto = () => {
    setShowCropper(true);
    handleMenuClose();
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const saveImage = async (key: string, data: string | null) => {
    try {
      if (data) {
        await localforage.setItem(key, data);
      } else {
        await localforage.removeItem(key);
      }
    } catch (error) {
      console.error(`Errore nel salvare ${key}:`, error);
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        const storedImage =
          await localforage.getItem<string>("printPreview_image");
        const storedCroppedImage = await localforage.getItem<string>(
          "printPreview_croppedImage",
        );

        if (storedImage) {
          setImage(storedImage);
        }

        if (storedCroppedImage) {
          setcroppedImage(storedCroppedImage);
        }
      } catch (error) {
        console.error("Errore nel caricare le immagini:", error);
      }
    };
    loadImage();
    localforage
      .getItem("printPreview_image")
      .then((prop) => prop && setShowCropper(true));
  }, []);

  return (
    <>
      <div className="flex h-screen flex-row">
        {/* Menu
        <div className="w-1/4 bg-gray-200 p-4">
          <MenuPreview />
        </div> */}
        <div
          className="flex h-screen w-screen flex-col items-center justify-center bg-gray-200 p-4"
          onContextMenu={image ? handleRightClick : undefined}
        >
          {/* Preview della foto */}
          {showCropper ? (
            <FixedCropper
              ref={cropperRef}
              src={image}
              stencilProps={{
                handlers: false,
                movable: true,
                resizable: false,
                grid: true,
                aspectRatio: refactorRatio(proportion ?? "1:1"),
              }}
              stencilSize={{ width: scaledWidth, height: scaledHeight }}
            />
          ) : (
            <div
              className="relative flex items-center justify-center border border-black bg-white"
              style={{
                width: MAX_WIDTH,
                height: MAX_HEIGHT,
                backgroundImage: croppedImage
                  ? `url(${croppedImage})`
                  : image
                    ? `url(${image})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "default",
                marginBottom: "20px",
              }}
              // onContextMenu={image ? handleRightClick : undefined}
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
          )}

          {/* Pulsanti ordina e indietro */}
          <div className="flex justify-between space-x-8 p-4">
            <button
              className="rounded-full bg-gray-500 px-6 py-3 text-white shadow-lg hover:bg-gray-600"
              onClick={handleGoBack}
            >
              Indietro
            </button>
            {image && (
              <button
                className="rounded-full bg-blue-500 px-6 py-3 text-white shadow-lg hover:bg-blue-600"
                onClick={onCrop}
              >
                Ordina
              </button>
            )}
          </div>
        </div>
        {/* Context Menu */}
        {contextMenuVisible && contextMenuPosition && (
          <div
            className="fixed rounded border border-gray-300 bg-white shadow-lg"
            style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
            onMouseLeave={handleMenuClose}
          >
            <ul className="p-2">
              <li
                className="cursor-pointer p-1 hover:bg-gray-200"
                onClick={handleChangePhoto}
              >
                Cambia foto
              </li>
              <li
                className="cursor-pointer p-1 hover:bg-gray-200"
                onClick={handleresizePhoto}
              >
                Ritaglia/Ridimensiona
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default PrintPreview;
