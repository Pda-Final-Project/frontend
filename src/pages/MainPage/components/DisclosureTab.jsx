import React from "react";
import DisclosureDetailPage from "../../DisclosureDetailPage";
import DisclosureListPage from "../../DisclosureListPage";
import { useParams } from "react-router-dom";

export default function DisclosureTab() {
  const { filling_id } = useParams();
  return (
    <div className="h-full">
      {filling_id == "all" ? <DisclosureListPage /> : <DisclosureDetailPage />}
    </div>
  );
}
