import React from "react";
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
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
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-10 py-20">
      <div className="w-full flex flex-col items-center pb-4">
        <div className="flex items-center mb-2 w-full justify-center">
          <div className="text-lg font-bold">공시 가이드 with</div>
          <img src="/images/logo.png" className="h-10 mb-2" />
        </div>

        <span className="text-blue-md text-center mb-2 font-semibold">
          투자에 필요한 중요한 공시 정보, 핵심만 쏙쏙 알려드립니다!
        </span>
        <div className="w-full border-t-1 border-gray-md mt-4"></div>
      </div>

      <div className="w-full max-w-5xl">
        <Slider {...settings}>
          {fil_introduce_data.map((fil, index) => (
            <div key={index} className="p-4">
              {/* 고정된 높이 (h-80) 설정 */}
              <div className="bg-white p-6 shadow-md rounded-lg flex flex-col justify-between h-80 transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="mb-3 text-sm">{fil.type}</div>
                    <div className="text-2xl font-semibold mb-2">{fil.title}</div>
                    <div className="text-blue-md">{fil.subtitle}</div>
                  </div>
                  <div className="text-5xl text-blue-md">
                    {icons[fil.id] || <IoDocumentTextSharp />}
                  </div>
                </div>

                {/* 텍스트 넘침 방지 및 하단 정렬 */}
                <div className="mt-8 text-sm text-gray-800 overflow-hidden">
                  {fil.description}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
