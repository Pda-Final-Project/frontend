import React, { useState, useEffect } from "react";
import HoldingSidebar from "./SidebarTab/HoldingStockTab";
import InterestStockTab from "./SidebarTab/InterestStockTab";
import { FaHeart } from "react-icons/fa";
import { GoGraph } from "react-icons/go";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSidebar, setCurrentSidebar] = useState("");

  useEffect(() => {
    console.log(isOpen, currentSidebar);
  }, [isOpen, currentSidebar]);

  const handleSidebar = (sidebarType) => {
    console.log(sidebarType, isOpen);
    if (currentSidebar === sidebarType && isOpen) {
      setIsOpen(false);
    } else {
      setCurrentSidebar(sidebarType);
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* 바깥 사이드바 */}
      <div className="fixed left-0 top-0 h-full w-16 bg-gray-light p-4 px-2  text-gray-md">
        <div className="space-y-4">
          <div
            onClick={() => handleSidebar("interest")}
            className={`flex flex-col justify-center items-center cursor-pointer text-center py-2 text-3xl hover:text-blue-md hover:bg-blue-light rounded-lg font-semibold space-y-2 ${
              currentSidebar == "interest" && isOpen
                ? "text-blue-md bg-blue-light"
                : ""
            }`}
          >
            <FaHeart className="text-xl" />
            <div className="text-xs">관심주식</div>
          </div>
          <div
            onClick={() => handleSidebar("holding")}
            className={`flex flex-col justify-center items-center cursor-pointer text-center py-2 text-3xl hover:text-blue-md hover:bg-blue-light rounded-lg font-semibold space-y-2 ${
              currentSidebar == "holding" && isOpen
                ? "text-blue-md bg-blue-light"
                : ""
            }`}
          >
            <GoGraph className="text-xl" />
            <div className="text-xs">보유주식</div>
          </div>
        </div>
      </div>

      {/* 내부 사이드바 - 선택된 경우만 표시 */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50"
            a
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="fixed left-16 top-0 h-full w-80 bg-white z-50">
            {currentSidebar === "interest" ? (
              <InterestStockTab closeTab={() => setIsOpen(false)} />
            ) : (
              <HoldingSidebar closeTab={() => setIsOpen(false)} />
            )}
          </div>
        </>
      )}
    </>
  );
}
