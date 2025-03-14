import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisclosureTab from "./components/DisclosureTab";
import TradingTab from "./components/TradingTab";
import LikeButton from "../../components/common/LikeButton";
import { fetchStocks } from "../../api/stockApi";
import { formatNumber } from "../../utils/numberFormat";
import { useStockSse } from "../../hooks/useSseStockInfo";
import { RiExpandLeftLine } from "react-icons/ri";
import { RiExpandRightLine } from "react-icons/ri";

export default function MainPage() {
  const { ticker, filling_id } = useParams();
  const [extend, setExtend] = useState("none");
  const [stockInfo, setStockInfo] = useState([
    {
      ticker: ticker,
      name: "",
      current_price: 0,
      change_rate: 0,
    },
  ]);

  const tryFetchStock = async () => {
    try {
      const response = await fetchStocks("", ticker);
      if (response.data.status === "OK") {
        const filteredStock = response.data.data
          .flat()
          .find((stock) => stock.ticker === ticker);
        if (filteredStock) {
          setStockInfo([filteredStock]);
        } else {
          setStockInfo([]);
        }
      }
    } catch (error) {
      console.error("주식 정보 조회 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (ticker) {
      tryFetchStock();
    }
  }, [ticker]);

  // 실시간 시세 및 등락율 SSE 연결
  const { isConnected, error } = useStockSse(setStockInfo);

  if (stockInfo.length === 0) {
    return <div className="text-center">로딩 중...</div>;
  }

  const currentStock = stockInfo[0]; // 배열에서 첫 번째 요소 사용

  return (
    <div className="flex flex-col w-full h-[calc(100vh-62px)] bg-gray-light p-8">
      {/** 종목 기본 정보(로고, 종목명, 종목 코드, 현재가, 변동률) */}
      <div className="flex items-center gap-4 pb-4 font-semibold">
        <div>
          <img
            src={`${import.meta.env.VITE_STOCK_LOGO_URL}${ticker}.png`}
            className="w-full h-14 rounded-full"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="text-lg">{currentStock.name}</div>
            <div className="text-lg text-gray-md">{ticker}</div>
            <LikeButton ticker={ticker} />
          </div>
          <div className="flex items-end gap-2">
            <div className="text-2xl">
              {formatNumber(parseInt(currentStock.current_price))}원
            </div>
            <div className="text-sm">
              <span
                className={
                  currentStock.change_rate?.toString().startsWith("+")
                    ? "text-red-md"
                    : currentStock.change_rate?.toString().startsWith("-")
                    ? "text-blue-dark"
                    : ""
                }
              >
                {currentStock.change_rate}%
              </span>
            </div>
          </div>
        </div>
      </div>
      {/** 작게 보기, 크게보기 */}
      <div className="flex justify-between font-semibold text-xs mb-2">
        <div>
          <div
            onClick={() => {
              setExtend(extend !== "fill" ? "fill" : "none");
            }}
            className="flex items-center py-2 px-3 rounded-lg bg-blue-light cursor-pointer hover:bg-blue-md hover:text-white duration-300"
          >
            공시 {extend == "fill" ? "작게" : "크게"} 보기
            <span className="text-lg">
              <RiExpandRightLine />
            </span>
          </div>
        </div>
        <div>
          <div
            onClick={() => {
              setExtend(extend !== "trade" ? "trade" : "none");
            }}
            className="flex items-center py-2 px-3 rounded-lg bg-blue-light cursor-pointer hover:bg-blue-md hover:text-white duration-300"
          >
            <span className="text-lg">
              <RiExpandLeftLine />
            </span>
            트레이딩 {extend == "trade" ? "작게" : "크게"} 보기
          </div>
        </div>
      </div>

      {/** 공시, 트레이딩 탭 */}
      <div
        className={`flex w-full h-[calc(100vh-150px)] overflow-hidden transition-all duration-300 ${
          extend != "none" ? "" : "gap-8"
        }`}
      >
        {/* 공시 탭 */}
        <div
          className={`transition-all duration-300 overflow-hidden flex flex-col min-h-0
      ${
        extend === "fill"
          ? "w-full h-full"
          : extend === "trade"
          ? "w-0 h-0"
          : "w-1/2 h-full"
      }
    `}
        >
          <div className="h-full overflow-y-auto">
            <DisclosureTab ticker={ticker} />
          </div>
        </div>

        {/* 트레이딩 탭 */}
        <div
          className={`transition-all duration-300 overflow-hidden flex flex-col min-h-0
      ${
        extend === "trade"
          ? "w-full h-full"
          : extend === "fill"
          ? "w-0 h-0"
          : "w-1/2 h-full"
      }
    `}
        >
          <div className="h-full overflow-y-auto">
            <TradingTab ticker={ticker} extend={extend} />
          </div>
        </div>
      </div>
    </div>
  );
}
