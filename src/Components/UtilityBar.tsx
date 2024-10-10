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
    <div className="flex w-[64rem] items-center justify-between bg-gray-200 p-4">
      <div className="flex flex-row">
        <Button radius="lg" onClick={onBack} className="bg-black text-white">
          <MoveLeft />
        </Button>
      </div>

      <div className="flex flex-row space-x-3">
        {/* Flip orizzontale  */}
        <Tooltip showArrow={true} content="Capovolgi dx/sx" placement="bottom">
          <Button
            isIconOnly
            onClick={onFLipHorizontal}
            className="bg-black text-white"
          >
            <AlignHorizontalJustifyCenter />
          </Button>
        </Tooltip>
        {/* Flip verticale */}
        <Tooltip
          showArrow={true}
          content="Capovolgi sopra/sotto"
          placement="bottom"
        >
          <Button
            isIconOnly
            onClick={onFlipVertical}
            className="bg-black text-white"
          >
            <AlignVerticalJustifyCenter />
          </Button>
        </Tooltip>
        {/* Routa destra */}
        <Tooltip showArrow={true} content="Ruota a destra" placement="bottom">
          <Button
            isIconOnly
            onClick={onRotateRight}
            className="bg-black text-white"
          >
            <RotateCw />
          </Button>
        </Tooltip>
        {/* Routa sinistra */}
        <Tooltip showArrow={true} content="Ruota a sinistra" placement="bottom">
          <Button
            isIconOnly
            onClick={onRotateLeft}
            className="bg-black text-white"
          >
            <RotateCcw />
          </Button>
        </Tooltip>

        {/* Cambia immagine */}
        <Button
          color="primary"
          radius="lg"
          onClick={onPhotoChange}
          className="bg-black text-white"
        >
          <Image />
          Cambia foto
        </Button>
      </div>

      <div className="flex flex-row">
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
