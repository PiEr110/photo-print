import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { RiImageAddFill } from "react-icons/ri";
import { FixedCropper, FixedCropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { DimensionContext } from "../context/DimensionContext";
import localforage from "localforage";
import UtilityBar from "./UtilityBar";

interface Size {
  width: number;
  height: number;
}

const calculateResponsiveSize = (vw: number, vh: number): Size => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const widthInPixels = (vw / 100) * viewportWidth;
  const heightInPixels = (vh / 100) * viewportHeight;

  return {
    width: widthInPixels,
    height: heightInPixels,
  };
};

const convertRatioStringToNUmber = (ratio: string): number => {
  const [width, height] = ratio.split(":").map(Number);

  if (height !== 0) {
    return width / height;
  } else {
    throw new Error("L'altezza non può essere zero");
  }
};

const PrintPreview = () => {
  const { width, height, proportion } = useContext(DimensionContext); //Selezioniamo le dimensioni scelte dal contesto

  const navigate = useNavigate();

  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setcroppedImage] = useState<string>();
  const [showCropper, setShowCropper] = useState<boolean>(false);

  const [containerSize, setContainerSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  const [cropSize, setCropSize] = useState<Size>({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<FixedCropperRef>(null);

  // const MAX_WIDTH = 900;
  // const MAX_HEIGHT = 650;

  // function calculateScaleFactor(
  //   canvasWidth: number,
  //   canvasHeight: number,
  //   maxWidth: number,
  //   maxHeight: number,
  // ) {
  //   const widthRatio = maxWidth / canvasWidth;
  //   const heightRatio = maxHeight / canvasHeight;
  //   return Math.min(widthRatio, heightRatio, 1);
  // }

  // const scaleFactor = calculateScaleFactor(
  //   width as number,
  //   height as number,
  //   MAX_WIDTH,
  //   MAX_HEIGHT,
  // );
  // const containerWidth = (width as number) * scaleFactor;
  // const containerHeight = (height as number) * scaleFactor;
  // const aspectRatio = convertRatioStringToNUmber(proportion as string);

  // const cropWidth = containerWidth * 0.8;
  // const cropHeight = containerHeight / aspectRatio;

  // const scaleFactor = Math.min(
  //   MAX_WIDTH / (width ? width : 1),
  //   MAX_HEIGHT / (height ? height : 1),
  // );
  // const scaledWidth = (width ? width : 1) * scaleFactor;
  // const scaledHeight = (height ? height : 1) * scaleFactor;

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

  const handleOrder = () => {
    navigate("/confirmation");
  };

  const handleChangePhoto = () => {
    handleChoosePhoto();
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

  const flip = (horizontal: boolean, vertical: boolean) => {
    if (cropperRef.current) {
      cropperRef.current.flipImage(horizontal, vertical);
    }
  };

  const rotate = (angle: number) => {
    if (cropperRef.current) {
      cropperRef.current.rotateImage(angle);
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

    const updateSize = () => {
      const responsiveSize = calculateResponsiveSize(80, 80); //80% della vieweport
      setContainerSize(responsiveSize);

      const aspectRatioFromString = convertRatioStringToNUmber(
        proportion as string,
      );
      setAspectRatio(aspectRatioFromString);

      const cropScaleFactor = 0.8;
      const cropWidth = responsiveSize.width * cropScaleFactor;
      const cropHeight = responsiveSize.height / aspectRatioFromString;

      setCropSize({ width: cropWidth, height: cropHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [proportion, width, height]);

  return (
    <>
      <div className="flex h-screen flex-row">
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-200 p-4">
          <UtilityBar
            onBack={handleGoBack}
            onOrder={onCrop}
            onPhotoChange={handleChangePhoto}
            onFLipHorizontal={() => flip(true, false)}
            onFlipVertical={() => flip(false, true)}
            onRotateRight={() => rotate(90)}
            onRotateLeft={() => rotate(-90)}
          />
          {/* Preview della foto */}
          <div
            className="relative m-6 flex items-center justify-center rounded-xl border border-black bg-white"
            style={{
              width: `${containerSize.width}px`,
              height: `${containerSize.height}px`,
            }}
          >
            {showCropper ? (
              <div className="relative h-full w-full">
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
                  stencilSize={{
                    width: cropSize.width,
                    height: cropSize.height,
                  }}
                  className="h-full w-full rounded-xl"
                />
              </div>
            ) : !image ? (
              <RiImageAddFill
                size={100}
                onClick={handleChoosePhoto}
                className="cursor-pointer text-gray-500"
              />
            ) : null}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </>
  );
};

export default PrintPreview;
