import React from "react";
import Item from "./Item";
import Loading from "./Loading";
import { useGlobalContext } from "../context";
import { GrAddCircle } from "react-icons/gr";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaRegAddressCard, FaPlus, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ItemList() {
  const { items, loading, openModal } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  if (items.length < 1) {
    return (
      <h2 className="section-title">no items matched your search criteria</h2>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">Stock Items</h2>
      {/* <a class="btn btn-primary btn-details" href="/singleitem/12345">details</a> */}

      {/* <button className="prev">
        <FiChevronLeft />
      </button> */}
      <div className="items-center">
        <div className="display-flex-right">
          <button className="circle-icon" onClick={openModal}>
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="items-center">
        {items.map((item) => {
          return <Item key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}
