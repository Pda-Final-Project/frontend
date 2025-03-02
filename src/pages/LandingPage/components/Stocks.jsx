import React from "react";
import StocksSortedByRate from "./StocksSortedByRate";
import StocksSortedByVol from "./StocksSortedByVol";

export default function Stocks() {
  return (
    <div className="flex justify-between w-full gap-8">
      <StocksSortedByVol />
      <StocksSortedByRate />
    </div>
  );
}
