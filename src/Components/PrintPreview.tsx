import { useRef, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";

const PrintPreview = () => {
  const [isOpenChooser, setIsOpenChooser] = useState(false);
  const [image, setImage] = useState(null);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const fileInpuRef = useRef(null);

  const handleChoosePhoto = () => {
    setIsOpenChooser(true);
    if (fileInpuRef.current) {
      fileInpuRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setIsOpenChooser(false);
    }
  };

  const handleMouseDown = () => {
    if (image) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (isDragging && image) {
      const { movementX, movementY } = event;
      setBackgroundPosition((prevPosition) => ({
        x: prevPosition.x + movementX,
        y: prevPosition.y + movementY,
      }));
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-200 h-screen">
        <div
          className="flex items-center justify-center bg-white border-black h-[44rem] w-[44rem] relative"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          style={{
            backgroundImage: image ? `url(${image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: `${backgroundPosition.x}px ${backgroundPosition.y}px`,
            cursor: image ? (isDragging ? "grabbing" : "grab") : "default",
          }}
        >
          {!image && (
            <RiImageAddFill
              size={300}
              onClick={handleChoosePhoto}
              className="cursor-pointer"
            />
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInpuRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          ></input>
        </div>
      </div>
    </>
  );
};

export default PrintPreview;
