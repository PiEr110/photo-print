import React, { createContext, FC, PropsWithChildren, useState } from "react";

interface DimensionContext {
  height?: number;
  width?: number;
  proportion?: string;
  setProperty: (width?: number, height?: number, proportion?: string) => void;
}

export const DimensionContext = createContext<DimensionContext>({
  height: 50,
  width: 50,
  proportion: "1:1",
  setProperty() {},
});

const DimensionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<Omit<DimensionContext, "setProperty">>({
    height: 1,
    width: 1,
    proportion: "1:1",
  });

  const setProperty = (
    width?: number,
    height?: number,
    proportion?: string,
  ) => {
    setState({
      width,
      height,
      proportion,
    });
  };

  return (
    <DimensionContext.Provider
      value={{
        ...state,
        setProperty,
      }}
    >
      {children}
    </DimensionContext.Provider>
  );
};

export default DimensionProvider;
