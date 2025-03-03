import React from "react";
import { fil_introduce_data } from "./introduceInfo";
import { IoDocumentTextSharp } from "react-icons/io5";
import { PiWarningCircleBold } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsPersonBadgeFill } from "react-icons/bs";
import { TbBuildingPlus } from "react-icons/tb";

const icons = {
  form_10q: <IoDocumentTextSharp />,
  form_8k: <PiWarningCircleBold />,
  schedule_13D_13G: <BsFillPeopleFill />,
  form_4: <BsPersonBadgeFill />,
  form_s1: <TbBuildingPlus />,
};

export default function Index() {
  // 첫 번째 줄에는 첫 3개, 두 번째 줄에는 나머지 2개
  const splitData = [
    fil_introduce_data.slice(0, 3),
    fil_introduce_data.slice(3),
  ];

  return (
    <div className="flex flex-col items-center justify-center mx-24">
      <div className="w-full flex flex-col items-center pb-4">
        <div className="flex items-center mb-2 w-full justify-center">
          <div className="text-3xl font-bold">공시 가이드 with</div>
          <img src="../../../public/images/logo.png" className="h-16" />
        </div>
  
        <span className="text-[14px] text-blue-md text-center mt-1 mb-2">
          <span>어떤 공시인지 모르겠다면? 핵심만 쏙쏙 알려드립니다. </span>
          <br />
          <span>투자에 필요한 중요한 공시 정보를 놓치지 마세요!</span>
        </span>
        <div className="w-full border-t-1 border-gray-md mt-4"></div>
      </div>

      
      <div className=" grid grid-rows-2 p-4">
        {splitData.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-4 p-2">
            {row.map((fil, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-lg rounded-lg flex flex-col justify-center font-semibold"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="mb-2">{fil.type}</div>
                    <div className="text-2xl font-semibold mb-2">
                      {fil.title}
                    </div>
                    <div className="text-blue-md">{fil.subtitle}</div>
                  </div>
                  <div className="text-5xl text-blue-md">
                    {icons[fil.id] || <IoDocumentTextSharp />}
                  </div>
                </div>

                <div className="mt-8 font-medium">{fil.description}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
