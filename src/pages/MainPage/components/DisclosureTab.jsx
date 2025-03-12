import React from "react";
import DisclosureDetail from "../../../components/disclosure/DisclosureDetail";
import DisclosureList from "../../../components/disclosure/DisclosureList";
import { useParams } from "react-router-dom";

function DisclosureTab({ ticker }) {
  const { filling_id } = useParams();
  return (
    <div className="">
      {filling_id == "all" ? (
        <DisclosureList ticker={ticker} />
      ) : (
        <DisclosureDetail />
      )}
    </div>
  );
}
export default React.memo(DisclosureTab);
