import React, { useCallback, useEffect, useRef } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import staticData_historyItem from "../data_historyItem";
import HistoryItem from "../components/HistoryItem";
import { useGlobalContext } from "../context";
import {
  FaCreativeCommonsSamplingPlus,
  FaTimes,
  FaTruckLoading,
} from "react-icons/fa";
import moment from "moment";
import { ref } from "firebase/database";

const ImportItem = () => {
  const { id } = useParams();
  // const [loading, setLoading] = React.useState(false);
  const [historyItems, setHistoryItems] = React.useState([]);
  const [notice, setNotice] = React.useState("");
  const {
    data,
    isModalOpen,
    closeModal,
    addItemData,
    currentItem,
    setCurrentItem,
    editCurrentItem,
    isSuccessful,
    setIsSuccessful,
  } = useGlobalContext();
  const [name, setName] = React.useState("");
  const [currentId, setCurrentId] = React.useState("");
  const [minLevel, setMinLevel] = React.useState("");
  // const [supplier, setSupplier] = React.useState("");
  const [timedate, setTimedate] = React.useState(moment().format("YYYY-MM-DD"));
  // const [quantityOfBox, setQuantityOfBox] = React.useState("");
  // const [quantityOfItemPerBox, setQuantityOfItemPerBox] = React.useState("");
  // abc0906
  const [previousIsSuccessful, setPreviousIsSuccessful] = React.useState(0);

  const refMinLevelInput = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    // don't use name and timedate below unless we want to update its name here
    const tUpdateItem = {
      idItem: currentId ? currentId : currentItem.currentId,
      minLevel: minLevel,
      name: name ? name : currentItem.currentName,
      timedate: moment(timedate).format("L"),
    };
    editCurrentItem(tUpdateItem);
  };

  console.log("IsSuccessful:" + isSuccessful);
  console.log("PreviousIsSuccessful:" + previousIsSuccessful);
  if (previousIsSuccessful != isSuccessful && isSuccessful === -1) {
    setPreviousIsSuccessful(isSuccessful);
    setNotice("Failed to save! Try Again!");
  }
  if (previousIsSuccessful != isSuccessful && isSuccessful === 1) {
    console.log(isSuccessful);
    setPreviousIsSuccessful(isSuccessful);
    setNotice("Success!");
  }
  if (Object.keys(currentItem).length === 0 && name === "") {
    // abc0607
    // filter unique item by id
    const filterItem = data.filter((item) => {
      // console.log(typeof item.idItem);
      // console.log(typeof id);
      if (item.idItem.toString() === id) {
        return true;
      } else {
        return false;
      }
    });
    // console.log(filterItem[0]);
    const tCurrentItem = filterItem[0];
    if (tCurrentItem !== null && tCurrentItem !== undefined) {
      console.log(tCurrentItem.idItem);
      setCurrentId(tCurrentItem.idItem);
      setName(tCurrentItem.name);
      setMinLevel(tCurrentItem.minLevel);
    } else {
      console.log("null or undefined currentitem");
    }
  }

  // important code to make browser clear isSuccessful
  useEffect(() => {
    let timer = setTimeout(() => {
      setNotice("");
      setIsSuccessful(0);
      setPreviousIsSuccessful(0);
      // refMinLevelInput.current.focus();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isSuccessful]);

  useEffect(() => {
    refMinLevelInput.current.focus();
  }, []);

  return (
    <section className="section">
      <h2 className="section-title">Edit Item</h2>
      <div className="items-center">
        <form className="item-form" onSubmit={handleSubmit}>
          {/* <div className="item-form__title">
            <h3>Add new items:</h3>
          </div> */}
          <div className="item-form__control">
            <label className="item-form__control__label">Name</label>

            <label className="item-form__control__NoInput">
              {name ? name : currentItem.currentName}
            </label>
          </div>
          <div className="item-form__control">
            <label className="item-form__control__label">Min Level</label>
            <input
              type="text"
              className="item-form__control__input"
              onChange={(e) => setMinLevel(e.target.value)}
              ref={refMinLevelInput}
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
        <div className="import-notice">{notice}</div>
      </div>
    </section>
  );
};

export default ImportItem;
