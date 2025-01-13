import "./styles.css";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import { path } from "../../utils/constants";
// import { Button } from "antd";
// import imgLogo from "../../assets/logoFE.png";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const isActive = (route) => {
        if (route === path.common.Home) {
            return location.pathname === route; // Exact match for home
        }
        return location.pathname.includes(route); // Partial match for other routes
    };

    return (
        <div className={`custom-sidebar ${isCollapsed ? "custom-sidebar-collapse" : "custom-sidebar-expand"} `}>
            <img
                className="customer-sidebar-logo"
                // src={imgLogo}
                onClick={() => {
                    navigate("../" + path.common.Home);
                }}
            ></img>
            <button className={"custom-sidebar-toogleButton"}
                onClick={toggleSidebar}
            >
                {isCollapsed ? (
                    <Icon icon={"line-md:menu-fold-right"} className="custom-sidebar-toogleButton-icon" />
                ) : (
                    <Icon icon={"line-md:menu-fold-left"} className="custom-sidebar-toogleButton-icon" />
                )}
            </button>

            {/* Sidebar Menu */}
            <ul className="flex flex-col gap-4">
                <li
                    className={`flex items-center gap-x-4 p-4 text-black text-sm rounded-md cursor-pointer ${isActive(path.common.Home)
                        ? "bg-green-600 text-white"
                        : "hover:bg-[#70B557] hover:text-white"
                        }`}
                    onClick={() => navigate("../" + path.common.Home)}
                >
                    <Icon icon={"material-symbols:dashboard"} className="text-xl" />
                    <span
                        className={`${isCollapsed && "hidden"} origin-left duration-200`}
                    >
                        Trang chủ
                    </span>
                </li>

                <li
                    className={`flex items-center gap-x-4 p-4 text-black text-sm rounded-md cursor-pointer ${isActive(path.private.Motocycle)
                        ? "bg-green-600 text-white"
                        : "hover:bg-[#70B557] hover:text-white"
                        }`}
                    onClick={() => navigate("../" + path.private.Motocycle)}
                >
                    <Icon icon={"ri:e-bike-line"} className="text-xl" />
                    <span
                        className={`${isCollapsed && "hidden"} origin-left duration-200`}
                    >
                        Danh sách xe máy
                    </span>
                </li>

                <li
                    className={`flex items-center gap-x-4 p-4 text-black text-sm rounded-md cursor-pointer ${isActive(path.private.Engagement)
                        ? "bg-green-600 text-white"
                        : "hover:bg-[#70B557] hover:text-white"
                        }`}
                    onClick={() => navigate("../" + path.private.Engagement)}
                >
                    <Icon icon={"hugeicons:touch-interaction-01"} className="text-xl" />
                    <span
                        className={`${isCollapsed && "hidden"} origin-left duration-200`}
                    >
                        Tương tác
                    </span>
                </li>

                <li
                    className={`flex items-center gap-x-4 p-4 text-black text-sm rounded-md cursor-pointer ${isActive(path.private.Inventory)
                        ? "bg-green-600 text-white"
                        : "hover:bg-[#70B557] hover:text-white"
                        }`}
                    onClick={() => navigate("../" + path.private.Inventory)}
                >
                    <Icon icon={"maki:warehouse"} className="text-xl" />
                    <span
                        className={`${isCollapsed && "hidden"} origin-left duration-200`}
                    >
                        Nhập kho
                    </span>
                </li>
            </ul>

            <div
                className={` ${isCollapsed
                    ? "flex items-center flex-col gap-4"
                    : "flex items-center gap-4"
                    }`}
            >
                {/* <Button
          type="default"
          className={
            "mx-1 bg-red-400 hover:bg-[#70B557] flex justify-center items-center text-white hover:text-black"
          }
          onClick={() => {
            sessionStorage.clear();
            navigate("../" + path.common.Login);
          }}
        >
          <Icon icon={"material-symbols:logout"} className="w-6 h-6"></Icon>
        </Button> */}
            </div>
        </div>
    );
};

export default Sidebar;
