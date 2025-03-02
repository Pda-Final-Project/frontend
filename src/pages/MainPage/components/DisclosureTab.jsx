import React from "react";
import DisclosureDetailPage from "../../DisclosureDetailPage";
import DisclosureList from "../../../components/disclosure/DisclosureList";
import { useParams } from "react-router-dom";

export default function DisclosureTab() {
  const { filling_id } = useParams();
  return (
    <div className="h-full bg-white rounded-lg p-4 py-8">
      {filling_id == "all" ? <DisclosureList /> : <DisclosureDetailPage />}
    </div>
  );
}
