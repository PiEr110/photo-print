import React from "react";
import { Button } from "@nextui-org/button";

import {
  AlignHorizontalJustifyCenter,
  AlignVerticalJustifyCenter,
  MoveLeft,
  RotateCcw,
  RotateCw,
  Image,
  ShoppingCart,
} from "lucide-react";
import { Tooltip } from "@nextui-org/react";

interface UtilityBarProps {
  onBack: () => void;
  onPhotoChange: () => void;
  onOrder: () => void;
  onRotateRight: () => void;
  onRotateLeft: () => void;
  onFlipVertical: () => void;
  onFLipHorizontal: () => void;
}

const UtilityBar: React.FC<UtilityBarProps> = ({
  onBack,
  onPhotoChange,
  onOrder,
  onRotateRight,
  onRotateLeft,
  onFlipVertical,
  onFLipHorizontal,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-between space-y-4 bg-gray-200 px-6 md:flex-row md:space-x-4 md:space-y-0">
      {/*  */}
      {/* Sezione sinistra --> torna indietro */}
      <div className="flex w-full justify-center md:w-auto md:justify-start">
        <Button radius="lg" onClick={onBack}>
          <MoveLeft />
        </Button>
      </div>
      {/*  */}
      {/* Sezione centrale --> controlli */}
      <div className="flex w-full flex-row justify-center space-x-3 md:w-auto">
        {/*  */}
        {/* Flip orizzontale  */}
        <Tooltip showArrow={true} content="Capovolgi dx/sx" placement="bottom">
          <Button isIconOnly onClick={onFLipHorizontal}>
            <AlignHorizontalJustifyCenter />
          </Button>
        </Tooltip>
        {/*  */}
        {/* Flip verticale */}
        <Tooltip
          showArrow={true}
          content="Capovolgi sopra/sotto"
          placement="bottom"
        >
          <Button isIconOnly onClick={onFlipVertical}>
            <AlignVerticalJustifyCenter />
          </Button>
        </Tooltip>
        {/*  */}
        {/* Routa destra */}
        <Tooltip showArrow={true} content="Ruota a destra" placement="bottom">
          <Button isIconOnly onClick={onRotateRight}>
            <RotateCw />
          </Button>
        </Tooltip>
        {/*  */}
        {/* Routa sinistra */}
        <Tooltip showArrow={true} content="Ruota a sinistra" placement="bottom">
          <Button isIconOnly onClick={onRotateLeft}>
            <RotateCcw />
          </Button>
        </Tooltip>
        {/*  */}
        {/* Cambia immagine */}
        <Button radius="lg" onClick={onPhotoChange}>
          <Image />
          Cambia foto
        </Button>
      </div>
      {/*  */}
      {/* Sezione destra --> ordina */}
      <div className="flex w-full justify-center md:w-auto md:justify-end">
        <Button
          color="success"
          radius="lg"
          onClick={onOrder}
          className="bg-black text-white"
        >
          <ShoppingCart />
          Ordina
        </Button>
      </div>
    </div>
  );
};

export default UtilityBar;
