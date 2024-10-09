import React, {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import localforage from "../localforageConfig";
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

  // Carica i dati nel localForage
  const loadDimensions = async () => {
    try {
      const storedWidth = await localforage.getItem<number>("width");
      const storedHeight = await localforage.getItem<number>("height");
      const storedProportion = await localforage.getItem<string>("proportion");

      setState({
        width: storedWidth ?? 50,
        height: storedHeight ?? 50,
        proportion: storedProportion ?? "1:1",
      });
    } catch (error) {
      console.error("Errore nel caricare le dimensioni:", error);
    }
  };

  // Salva i dati nel localForage
  const saveDimensions = async (
    width?: number,
    height?: number,
    proportion?: string,
  ) => {
    try {
      if (width !== undefined) {
        await localforage.setItem("width", width);
      }
      if (height !== undefined) {
        await localforage.setItem("height", height);
      }
      if (proportion !== undefined) {
        await localforage.setItem("proportion", proportion);
      }
    } catch (error) {
      console.error("Errore nel salvare le dimensioni:", error);
    }
  };

  const setProperty = (
    width?: number,
    height?: number,
    proportion?: string,
  ) => {
    setState((prevState) => ({
      width: width ?? prevState.width,
      height: height ?? prevState.height,
      proportion: proportion ?? prevState.proportion,
    }));

    // Salva le nuove proprietà
    saveDimensions(width, height, proportion);
  };

  useEffect(() => {
    loadDimensions();
  }, []);

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
