import React from "react";
import { Button } from "@nextui-org/button";

interface UtilityBarProps {
  onBack: () => void;
  onPhotoChange: () => void;
  onOrder: () => void;
}

const UtilityBar: React.FC<UtilityBarProps> = ({
  onBack,
  onPhotoChange,
  onOrder,
}) => {
  return (
    <div className="flex w-[64rem] items-center justify-between bg-gray-200 p-4">
      <Button color="default" radius="lg" onClick={onBack}>
        Indietro
      </Button>
      <Button color="primary" radius="lg" onClick={onPhotoChange}>
        Cambia foto
      </Button>
      <Button color="success" radius="lg" onClick={onOrder}>
        Ordina
      </Button>
    </div>
  );
};

export default UtilityBar;
