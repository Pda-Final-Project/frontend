import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { fil_introduce_data } from "./introduceInfo";
import { IoDocumentTextSharp } from "react-icons/io5";
import { PiWarningCircleBold } from "react-icons/pi";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsPersonBadgeFill } from "react-icons/bs";
import { TbBuildingPlus } from "react-icons/tb";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const icons = {
  form_10q: <IoDocumentTextSharp />,
  form_8k: <PiWarningCircleBold />,
  schedule_13D_13G: <BsFillPeopleFill />,
  form_4: <BsPersonBadgeFill />,
  form_s1: <TbBuildingPlus />,
};

export default function IntroduceDisclosure() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div
      className={`w-full h-full flex flex-col justify-center items-center px-32 py-20 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="w-full flex flex-col items-center justify-center">
        {/* 부모 요소의 넓이를 제한 */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-1">
            <div className="text-[18px] font-bold mr-2">공시 가이드 with</div>
            <img src="/images/logo.png" alt="Logo" className="h-10" />
          </div>
          <p className="text-blue-md text-center text-[14px] font-semibold">
            투자에 필요한 중요한 공시 정보, 핵심만 쏙쏙 알려드립니다!
          </p>
        </div>
        <div className="w-full max-w-5xl">
          <Slider
            className="w-full"
            {...{
              dots: true,
              infinite: true,
              speed: 500,
              slidesToShow: 3,
              slidesToScroll: 3,
              arrows: true,
              autoplay: true,
              autoplaySpeed: 3000,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ],
            }}
          >
            {fil_introduce_data.map((item, index) => (
              <div key={index} className="p-4">
                <div className="w-full bg-white p-6 shadow-md rounded-lg flex flex-col justify-between h-80 transition-transform duration-300 ease-in-out hover:scale-105">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-lg font-bold">{item.title}</div>
                      <div className="text-blue-md">{item.subtitle}</div>
                    </div>
                    <div className="text-5xl text-blue-md">
                      {icons[item.id] || <IoDocumentTextSharp />}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
