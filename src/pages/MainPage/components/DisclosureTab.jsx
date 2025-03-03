import React from "react";
import DisclosureDetail from "../../../components/disclosure/DisclosureDetail";
import DisclosureList from "../../../components/disclosure/DisclosureList";
import { useParams } from "react-router-dom";

export default function DisclosureTab() {
  const { filling_id } = useParams();
  return (
    <div className="h-full rounded-lg">
      {filling_id == "all" ? <DisclosureList /> : <DisclosureDetail />}
    </div>
  );
}
