import React, { useState, useEffect } from "react";
import HoldingSidebar from "./SidebarTab/HoldingStockTab";
import InterestStockTab from "./SidebarTab/InterestStockTab";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSidebar, setCurrentSidebar] = useState("");

  useEffect(() => {
    console.log(isOpen, currentSidebar);
  }, [isOpen, currentSidebar]);

  const handleSidebar = (sidebarType) => {
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
      <div className="fixed left-0 top-0 h-full w-20 bg-gray-300  z-50 p-4">
        <div className="space-y-4">
          <div
            onClick={() => handleSidebar("interest")}
            className="cursor-pointer"
          >
            관심종목
          </div>
          <div
            onClick={() => handleSidebar("holding")}
            className="cursor-pointer"
          >
            보유종목
          </div>
        </div>
      </div>

      {/* 내부 사이드바 - 선택된 경우만 표시 */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="fixed left-20 top-0 h-full w-80 bg-white z-50">
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
