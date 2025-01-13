import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import React from "react";

const LayoutWithRequireLogin = () => {
  return (
    <div className="flex  min-h-[100vh]">
      <Sidebar />
      <div className="p-2 md:p-4 xl:p-6  w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutWithRequireLogin;
