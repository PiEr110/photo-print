// src/components/OrderConfirmation.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Ordine Effettuato</h1>
        <p className="mb-6">
          Grazie per il tuo ordine! Ti contatteremo a breve.
        </p>
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          onClick={handleBackToHome}
        >
          Torna alla Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
