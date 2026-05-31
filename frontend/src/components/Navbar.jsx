import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [timezone, setTimezone] = useState("EST");
  const [currentTime, setCurrentTime] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getTimeForZone = (zone) => {
    const now = new Date();
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    let formatted = now.toLocaleTimeString("en-US", {
      ...options,
      timeZone: zone === "PH" ? "Asia/Manila" : "America/New_York",
    });

    // Split into [time, AM/PM]
    const [time, period] = formatted.split(" ");
    return { time, period };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTimeForZone(timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="navbar bg-blue-600 text-primary-content px-6 shadow-md">
      {/* Left side */}
      <div className="flex-1">
        {/* Mobile dropdown */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
          >
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/inventory">Inventory</Link>
            </li>
            <li>
              <Link to="/kb">KB</Link>
            </li>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/stations">Stations</Link>
            </li>
          </ul>
        </div>

        {/* Desktop menu */}
        <ul className="menu menu-horizontal hidden lg:flex px-1">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
          <li>
            <Link to="/kb">KB</Link>
          </li>
          <li>
            <Link to="/employees">Employees</Link>
          </li>
          <li>
            <Link to="/stations">Stations</Link>
          </li>
        </ul>
      </div>

      {/* Right side */}
      <div className="flex-none flex items-center gap-4">
        {/* Time + dropdown */}
        <div className="text-sm font-mono flex items-baseline gap-1">
          <div>
            <span>{currentTime.time}</span>
            <span className="font-bold">{currentTime.period}</span>
          </div>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="select select-bordered select-sm text-primary"
          >
            <option value="EST">(EST)</option>
            <option value="PH">(PHT)</option>
          </select>
        </div>

        {/* Logout button */}
        <button onClick={handleLogout} className="btn btn-error btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
