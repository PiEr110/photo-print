import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router";
import { CroppedAreaPixels, getCroppedImg } from "./cropImage";
import MenuPreview from "./MenuPreview";
import { RiImageAddFill } from "react-icons/ri";
import { FixedCropper, ImageRestriction } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

interface RouteParams {
  [key: string]: string;
  width: string;
  height: string;
}

const PrintPreview = () => {
  const { width, height } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [image, setImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null);
  const [croppedImage, setcroppedImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_WIDTH = 900;
  const MAX_HEIGHT = 650;
  const scaleFactor = Math.min(
    MAX_WIDTH / (width ? parseInt(width) : 1),
    MAX_HEIGHT / (height ? parseInt(height) : 1),
  );
  const scaledWidth = (width ? parseInt(width) : 1) * scaleFactor;
  const scaledHeight = (height ? parseInt(height) : 1) * scaleFactor;

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
            setcroppedImage(null);
          } else {
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
    [],
  );

  const handleCrop = useCallback(async () => {
    if (image && croppedAreaPixels) {
      try {
        const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels);
        setcroppedImage(croppedImageUrl);
        setShowCropper(false);
      } catch (error) {
        console.error(error);
      }
    }
  }, [image, croppedAreaPixels]);

  const handleCancelCrop = () => {
    setShowCropper(false);
    setImage(null);
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
      <div className="flex h-screen flex-row">
        {/* Menu */}
        <div className="w-1/4 bg-gray-200 p-4">
          <MenuPreview />
        </div>

        <div className="flex w-3/4 flex-col items-center justify-center bg-gray-200 p-4">
          {/* Preview della foto */}

          {showCropper ? (
            <FixedCropper
              src={image}
              stencilProps={{
                handlers: false,
                lines: false,
                movable: true,
                resizable: false,
              }}
              stencilSize={{ width: 300, height: 300 }}
              imageRestriction={ImageRestriction.stencil}
            />
          ) : (
            <div
              className="relative flex items-center justify-center border border-black bg-white"
              style={{
                width: scaledWidth,
                height: scaledHeight,
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
              onContextMenu={image ? handleRightClick : undefined}
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
                onClick={handleOrder}
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
