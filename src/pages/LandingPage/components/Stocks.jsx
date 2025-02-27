import React from "react";
import StocksSortedByRate from "./StocksSortedByRate";
import StocksSortedByVol from "./StocksSortedByVol";

export default function Stocks() {
  return (
    <div className="flex justify-between mt-4 w-full">
      <StocksSortedByVol />
      <StocksSortedByRate />
    </div>
  );
}
