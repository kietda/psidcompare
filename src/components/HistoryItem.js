import React from "react";
import { Link } from "react-router-dom";
export default function HistoryItem({
  timedate,
  name,
  id,
  supplier,
  boolImport,
  numberBox,
  quantityPerBox,
}) {
  console.log("boolImport: " + boolImport);
  return (
    <article className="item">
      {/* <div className='img-container'>
        <img src={image} alt={name} />
      </div> */}
      <div className="item-footer">
        <div className="item__name">{name}</div>
        <div className="item__name">{supplier}</div>
        <div className="item__status">
          {boolImport === "Status"
            ? "Status"
            : boolImport
            ? "Import"
            : "Export"}
        </div>
        <div className="item__updatedate">{timedate}</div>
        <div className="item__quantity">
          <div className="custom_align_center">{numberBox}</div>
        </div>
        <div className="item__perbox">
          <div className="custom_align_center">{quantityPerBox}</div>
        </div>
      </div>
    </article>
  );
}
