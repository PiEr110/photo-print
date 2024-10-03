import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { RiComputerLine } from "react-icons/ri";
import { GalleryContext } from "../../context/GalleryContext";

const Photo = () => {
  const { images, addImages } = useContext(GalleryContext)!;
  //   const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const fileArray = Array.from(files);
      const newImages = fileArray.map((file) => URL.createObjectURL(file));
      //   setImages((prevImages) => [...prevImages, ...newImages]);
      addImages(newImages);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLImageElement>,
    src: string
  ) => {
    event.dataTransfer.setData("text/plain", src);
  };

  return (
    <>
      <div className="flex flex-col h-screen p-4">
        <div className="flex-none">
          <h1 className="font-bold text-lg">Le mie foto</h1>
        </div>

        {/* Contenitore principale con foto */}
        <div className="flex-grow overflow-auto mt-4">
          <div className="flex flex-wrap gap-4">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="h-24 w-24 object-cover rounded cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, src)}
              />
            ))}

            {/* Bottone per l'aggiunta di nuove foto */}
            <button
              onClick={handleClick}
              className="flex flex-row items-center justify-center bg-white px-5 py-3 rounded-full hover:bg-gray-50 border border-dashed border-gray-300 space-x-3"
            >
              <RiComputerLine className="text-2xl mb-2" />
              <span className="text-sm">Scegli file</span>
            </button>

            {/* Input file nascosto */}
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: "none" }}
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Photo;
