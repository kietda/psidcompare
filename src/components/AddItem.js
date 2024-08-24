import React, { useEffect, useRef } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import staticData_historyItem from "../data_historyItem";
import HistoryItem from "../components/HistoryItem";
import { useGlobalContext } from "../context";
import { FaTimes } from "react-icons/fa";
import moment from "moment";
import { ref } from "firebase/database";

const AddItem = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [historyItems, setHistoryItems] = React.useState([]);
  const { isModalOpen, closeModal, addItemData } = useGlobalContext();
  const [name, setName] = React.useState("");
  const [minLevel, setMinLevel] = React.useState("");
  const refNameInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItemData = {
      name: name,
      updateDate: moment().format("L"),
      quantity: "null",
      minLevel: minLevel,
    };
    addItemData(newItemData);
    setName("");
    setMinLevel("");
    closeModal();
  };

  useEffect(() => {
    // console.log(refNameInput.current);
    if (isModalOpen) {
      refNameInput.current.focus();
    }
  }, [isModalOpen]);
  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes></FaTimes>
        </button>
        <div>
          <form className="item-form" onSubmit={handleSubmit}>
            <div className="item-form__title">
              <h3>Add new items:</h3>
            </div>
            <div className="item-form__control">
              <label className="item-form__control__label">Name</label>
              <input
                type="text"
                className="item-form__control__input"
                ref={refNameInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="item-form__control">
              <label className="item-form__control__label">MinLevel</label>
              <input
                type="text"
                className="item-form__control__input"
                value={minLevel}
                onChange={(e) => setMinLevel(e.target.value)}
              />
            </div>
            <div className="item-form__submit">
              <button
                type="submit"
                className="btn-primary btn-detail add-item-button-transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
