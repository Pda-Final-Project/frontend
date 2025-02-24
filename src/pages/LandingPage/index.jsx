import React, { useState } from "react";
import Disclosures from "./components/Disclosures";
import News from "./components/News";
import Stocks from "./components/Stocks";

import AlarmModal from "../../components/common/AlarmModal"; // 임시

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [alarms, setAlarms] = useState([]); // 기본 알람 상태 추가

  return (
    <div>
      <button 
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        알람 보기
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <AlarmModal alarms={alarms} onClose={() => setShowModal(false)} /> 
          {/* alarms prop 전달 */}
        </div>
      )}

      {/** 실시간 공시 정보 */}
      <div>
        <Disclosures />
      </div>

      {/** 해외 경제 뉴스 */}
      <div>
        <News />
      </div>

      {/** 해외 종목 순위 */}
      <div>
        <Stocks />
      </div>
    </div>
  );
}
