import React, { useState, useEffect } from "react";
import HoldingSidebar from "./SidebarTab/HoldingStockTab";
import InterestStockTab from "./SidebarTab/InterestStockTab";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSidebar, setCurrentSidebar] = useState(""); //none, like, have

  useEffect(() => {
    console.log(isOpen, currentSidebar);
  }, [isOpen, currentSidebar]);

  const handleSidebar = (sidebarType) => {
    if (currentSidebar == sidebarType && isOpen) {
      setIsOpen(false);
    } else {
      setCurrentSidebar(sidebarType);
      setIsOpen(true);
    }
  };
  return (
    <div>
      <div
        onClick={() => {
          handleSidebar("like");
        }}
      >
        관심종목
      </div>
      <div
        onClick={() => {
          handleSidebar("have");
        }}
      >
        보유종목
      </div>
      {isOpen ? (
        currentSidebar === "like" ? (
          <InterestStockTab />
        ) : (
          <HoldingSidebar />
        )
      ) : (
        ""
      )}
    </div>
  );
}
