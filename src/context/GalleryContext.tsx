import React, { createContext, useState, ReactNode } from "react";

interface GalleryContextType {
  images: string[];
  addImages: (newImages: string[]) => void;
}

export const GalleryContext = createContext<GalleryContextType | undefined>(
  undefined
);

interface GalleryProviderProps {
  children: ReactNode;
}

export const GalleryProvider: React.FC<GalleryProviderProps> = ({
  children,
}) => {
  const [images, setImages] = useState<string[]>([]);

  const addImages = (newImages: string[]) => {
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  //   useEffect(() => {
  //     return () => {
  //       images.forEach((src) => URL.revokeObjectURL(src));
  //     };
  //   }, [images]);

  return (
    <GalleryContext.Provider value={{ images, addImages }}>
      {children}
    </GalleryContext.Provider>
  );
};
