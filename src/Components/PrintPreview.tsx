import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { RiImageAddFill } from "react-icons/ri";
import { FixedCropper, FixedCropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { DimensionContext } from "../context/DimensionContext";
import localforage from "localforage";
import UtilityBar from "./UtilityBar";

const PrintPreview = () => {
  const { width, height, proportion } = useContext(DimensionContext);

  const navigate = useNavigate();

  const [image, setImage] = useState<string | null>(null);

  const [croppedImage, setcroppedImage] = useState<string>();
  const [showCropper, setShowCropper] = useState<boolean>(false);

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
          setImage(result);
          setShowCropper(true);
          saveImage("printPreview_image", result);
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

  //   if (cropperRef.current) {
  //     const canvas = cropperRef.current.getCanvas();

  //     if (canvas) {
  //       const croppedDataUrl = canvas.toDataURL();
  //       setcroppedImage(croppedDataUrl);
  //       saveImage("printPreview_croppedImage", croppedDataUrl);
  //       handleOrder();
  //     }
  //   }
  // };

  const handleOrder = () => {
    navigate("/confirmation");
  };

  const handleChangePhoto = () => {
    handleChoosePhoto();
  };

  // const handleresizePhoto = () => {
  //   setShowCropper(true);
  //   handleMenuClose();
  // };

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

        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-200 p-4">
          <UtilityBar
            onBack={handleGoBack}
            onOrder={onCrop}
            onPhotoChange={handleChangePhoto}
          />
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
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {/* Pulsanti ordina e indietro */}
        </div>
      </div>
    </>
  );
};

export default PrintPreview;
