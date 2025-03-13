import React from "react";
import DisclosureDetail from "../../../components/disclosure/DisclosureDetail";
import DisclosureList from "../../../components/disclosure/DisclosureList";
import { useParams } from "react-router-dom";

function DisclosureTab({ ticker }) {
  const { filling_id } = useParams();
  return (
    <div className="bg-white p-4">
      {filling_id == "all" ? (
        <div className="mt-4">
          <DisclosureList ticker={ticker} />
        </div>
      ) : (
        <DisclosureDetail />
      )}
    </div>
  );
}
export default React.memo(DisclosureTab);
