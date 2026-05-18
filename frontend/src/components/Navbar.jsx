import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [timezone, setTimezone] = useState("PH"); // default Philippine time
  const [currentTime, setCurrentTime] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Function to format time based on selected timezone
  const getTimeForZone = (zone) => {
    const now = new Date();
    let options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

    if (zone === "PH") {
      return now.toLocaleTimeString("en-US", {
        ...options,
        timeZone: "Asia/Manila",
      });
    } else if (zone === "EST") {
      return now.toLocaleTimeString("en-US", {
        ...options,
        timeZone: "America/New_York",
      });
    }
    return now.toLocaleTimeString();
  };

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTimeForZone(timezone));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        {/* Left side navigation links */}
        <div className="flex space-x-6">
          <Link to="/home" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/inventory" className="hover:text-gray-200">
            Inventory
          </Link>
          <Link to="/knowledge" className="hover:text-gray-200">
            KB
          </Link>
          <Link to="/employees" className="hover:text-gray-200">
            Employees
          </Link>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Timezone dropdown + live time */}
          <div className="flex items-center space-x-2">
            <span className="text-sm">{currentTime}</span>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="bg-white text-blue-600 px-2 py-1 rounded text-sm"
            >
              <option value="PH">Philippines (PHT)</option>
              <option value="EST">Eastern US (EST)</option>
            </select>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
