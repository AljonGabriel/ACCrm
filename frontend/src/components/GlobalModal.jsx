import React, { useEffect, useState } from "react";

const GlobalModal = ({ isOpen, onClose, title, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300); // wait for animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      } bg-black/40 backdrop-blur-sm`}
    >
      <div
        className={`bg-white rounded-lg w-[400px] p-6 transform transition-all duration-300 ${
          isOpen
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GlobalModal;
