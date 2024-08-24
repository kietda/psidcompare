import React, { useCallback, useEffect, useRef } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import staticData_historyItem from "../data_historyItem";
import HistoryItem from "../components/HistoryItem";
import { useGlobalContext } from "../context";
import { FaTimes, FaTruckLoading } from "react-icons/fa";
import moment from "moment";
import { ref } from "firebase/database";
// import emailjs from "emailjs-com";

const ExportItem = () => {
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
    addItemImportExport,
    isSuccessful,
    setIsSuccessful,
  } = useGlobalContext();
  const [name, setName] = React.useState("");
  const [currentId, setCurrentId] = React.useState("");
  const [minLevel, setMinLevel] = React.useState("");
  const [supplier, setSupplier] = React.useState("");
  const [timedate, setTimedate] = React.useState(moment().format("YYYY-MM-DD"));
  const [quantityOfBox, setQuantityOfBox] = React.useState("");
  const [quantityOfItemPerBox, setQuantityOfItemPerBox] = React.useState("");
  // abc0906
  const [previousIsSuccessful, setPreviousIsSuccessful] = React.useState(0);

  const refSupplierInput = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItemImportExport = {
      idItem: currentId ? currentId : currentItem.currentId,
      supplier: supplier,
      timedate: moment(timedate).format("L"),
      boolImport: false,
      numberBox: quantityOfBox,
      quantityPerBox: quantityOfItemPerBox,
    };
    addItemImportExport(newItemImportExport);
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

    setSupplier("");
    setQuantityOfBox("");
    setQuantityOfItemPerBox("");
    setNotice("Success!");
  }

  // useEffect(() => {
  //   // console.log(refNameInput.current);
  //   if (isModalOpen) {
  //     refNameInput.current.focus();
  //   }
  // }, [isModalOpen]);
  // console.log(currentItem);
  // console.log(timedate);
  // console.log(moment(timedate).format("L"));

  // abc0607
  // fix error when refreshing the page
  // way 1: fetch data using id from useParams()
  // way 2: back to the home
  // way 3: save to sessions before this page
  // way 1
  // console.log(currentItem);
  // console.log(data);

  // currentItem is applied when user clicks  a link on homepage
  // however, it's not avaiable when user refreshes this page => must use params to get ID and connect database to get other information
  if (Object.keys(currentItem).length === 0 && name === "") {
    // abc0607
    // filter unique item by id from browser link
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
      console.log("CurrentItem in ExportItem is: ");
      console.log(tCurrentItem);

      // can do this since it causes bad setState() error
      // setCurrentItem({
      //   currentName: tCurrentItem.name,
      //   currentId: tCurrentItem.idItem,
      // });

      setCurrentId(tCurrentItem.idItem);
      setName(tCurrentItem.name); // use useState here to update the name on form
      // setCurrentItem(tCurrentItem);

      //a092803
    } else {
      console.log("null or undefined currentitem");
    }
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      setNotice("");
      setIsSuccessful(0);
      setPreviousIsSuccessful(0);
      // refSupplierInput.current.focus();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isSuccessful]);

  useEffect(() => {
    refSupplierInput.current.focus();
  }, []);

  return (
    <section className="section">
      <h2 className="section-title">Export Item</h2>
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
            <label className="item-form__control__label">Date</label>
            <input
              type="date"
              className="item-form__control__input"
              value={timedate}
              onChange={(e) => setTimedate(e.target.value)}
            />
          </div>
          <div className="item-form__control">
            <label className="item-form__control__label">Supplier</label>
            <input
              type="text"
              className="item-form__control__input"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              ref={refSupplierInput}
            />
          </div>
          <div className="item-form__control">
            <label className="item-form__control__label">#Box</label>
            <input
              type="text"
              className="item-form__control__input"
              value={quantityOfBox}
              onChange={(e) => setQuantityOfBox(e.target.value)}
            />
          </div>
          <div className="item-form__control">
            <label className="item-form__control__label">#Item/Box</label>
            <input
              type="text"
              className="item-form__control__input"
              value={quantityOfItemPerBox}
              onChange={(e) => setQuantityOfItemPerBox(e.target.value)}
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

export default ExportItem;
