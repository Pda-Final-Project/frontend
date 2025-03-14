import React, { useEffect, useState } from "react";
import DisclosureList from "../../components/disclosure/DisclosureList";

export default function DisclosureListPage() {
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
      <DisclosureList />
    </div>
  );
}
