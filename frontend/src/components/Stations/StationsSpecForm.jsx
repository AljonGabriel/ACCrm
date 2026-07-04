// StationsSpecForm.jsx
import React from "react";

const StationsSpecForm = ({ station }) => {
  return (
    <div className="p-4 border rounded bg-gray-50">
      <h3 className="font-semibold text-lg mb-2">Station Specs</h3>
      <div className="text-sm whitespace-pre-wrap">
        {station?.specs || "No specs available"}
      </div>
    </div>
  );
};

export default StationsSpecForm;
