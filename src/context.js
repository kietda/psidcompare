// next step: add a button (icons) to add new item
import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
import emailjs from "emailjs-com";
import staticData from "./data";
// import { firebase } from "./initFirebase";
import { appFirebase } from "./initFirebase";
import {
  getDatabase,
  ref,
  onValue,
  get,
  child,
  push,
  set,
  update,
} from "firebase/database";

// abc0
// const db = firebase.database();
const db = getDatabase(appFirebase);
// const rootTableRef = db.ref("firsttable");
const rootTableRef = ref(db, "firsttable");
// const nextDataRef = db.ref("firsttable/items/0");
const nextDataRef = ref(db, "firsttable/items/0");

// get(child(rootTableRef, "items/0")).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//     console.log("snapshot exist!");
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

// JSON structure:
//
// {
//   "users": {
//     "alovelace": {
//       "name": "Ada Lovelace",
//       "contacts": { "ghopper": true },
//     },
//     "ghopper": { ... },
//     "eclarke": { ... }
//   }
// }

// rootTableRef.set({
//   items: [
//     {
//       idItem: 123455,
//       name: "Tape",
//       updateDate: "02/10/2022",
//       quantity: 30,
//       minLevel: 50,
//     },
//     {
//       idItem: 12346,
//       name: "Rubber Band",
//       updateDate: "02/10/2022",
//       quantity: 30,
//       minLevel: 100,
//     },
//     {
//       idItem: 12347,
//       name: "Pen",
//       updateDate: "02/11/2022",
//       quantity: 3000,
//       minLevel: 50,
//     },
//     {
//       idItem: 12348,
//       name: "Label",
//       updateDate: "02/10/2022",
//       quantity: 30,
//       minLevel: 50,
//     },
//     {
//       idItem: 12349,
//       name: "Ink",
//       updateDate: "02/15/2022",
//       quantity: 10,
//       minLevel: 20,
//     },
//   ],
// });

// update will help prevent losing old childrens on same parents
// const updates = {};
// updates["/historyItems"] = [
//   {
//     idItem: 12345,
//     name: "Tape",
//     supplier: "VIRITUM",
//     timedate: "02/10/2022",
//     boolImport: false,
//     numberBox: 10,
//     quantityPerBox: 3,
//   },
//   {
//     idItem: 12345,
//     name: "Tape",
//     supplier: "RSM/US",
//     timedate: "02/08/2022",
//     boolImport: true,
//     numberBox: 20,
//     quantityPerBox: 3,
//   },
//   {
//     idItem: 12346,
//     name: "Rubber Band",
//     supplier: "RSM/US",
//     timedate: "02/08/2022",
//     boolImport: true,
//     numberBox: 5,
//     quantityPerBox: 6,
//   },
// ];
// update(rootTableRef, updates);

// set create a child and delete other children on same parents
// set(rootTableRef, {
//   historyItems: [
//     {
//       idItem: 12345,
//       name: "Tape",
//       supplier: "VIRITUM",
//       timedate: "02/10/2022",
//       boolImport: false,
//       numberBox: 10,
//       quantityPerBox: 3,
//     },
//     {
//       idItem: 12345,
//       name: "Tape",
//       supplier: "RSM/US",
//       timedate: "02/08/2022",
//       boolImport: true,
//       numberBox: 20,
//       quantityPerBox: 3,
//     },
//     {
//       idItem: 12346,
//       name: "Rubber Band",
//       supplier: "RSM/US",
//       timedate: "02/08/2022",
//       boolImport: true,
//       numberBox: 5,
//       quantityPerBox: 6,
//     },
//   ],
// });

// const newRecordRef = rootTableRef.push();
// newRecordRef.set({
//   items: [
//     {
//       idItem: 12345,
//       name: "Tape",
//       updateDate: "02/10/2022",
//       quantity: 30,
//       minLevel: 50,
//     },
//     {
//       idItem: 12346,
//       name: "Rubber Band",
//       updateDate: "02/10/2022",
//       quantity: 30,
//       minLevel: 100,
//     },
//   ],
// });
// console.log(newRecordRef.key);

// const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [isSuccessful, setIsSuccessful] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // useEffect(async () => {
  //   setLoading(true);
  //   try {
  //     const response = await rootTableRef.get();
  //     const dataObject = await response.toJSON().items;
  //     // console.log(Object.values(dataObject));
  //     console.log(dataObject);
  //     setData(Object.values(dataObject));

  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // }, []);

  // step 1: get data, step 2: wait data, step 3: process data (2nd useEffect)

  const fetchData = useCallback(async () => {
    setLoading(true);
    console.log("start feching data");
    get(child(rootTableRef, "items"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          // const dataObject = snapshot.val().toJSON();
          setData(Object.values(snapshot.val()));
          setLoading(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // try {
    //   const response = await rootTableRef.get();
    //   console.log("after fetching KK:" + response);
    //   const dataObject = await response.toJSON().items;
    //   console.log(dataObject);

    //   const anyResult = setData(Object.values(dataObject));
    //   console.log(data);
    //   // setLoading(false);
    // } catch (error) {
    //   console.log("Loi roi !!");
    //   console.log(error);
    //   // setLoading(false);
    // }
  }, []);

  useEffect(() => {
    fetchData();
    console.log("result: " + data); // may be not up-to-date beause fetchData in progress
  }, [fetchData]);

  //abc0520_1
  // const newItemData = {
  //   name: "ExampleName",
  //   updateDate: moment().format("L"),
  //   quantity: "0",
  //   minLevel: "100",
  // };
  const addItemData = useCallback(async (newItemData) => {
    // setIsSuccessful(false);
    const newPostKey = push(child(rootTableRef, "items")).key;
    await set(ref(db, "firsttable/items/" + newPostKey), {
      idItem: newPostKey,
      notified: "0",
      ...newItemData,
    })
      .then(() => {
        console.log("save data success");
        // setIsSuccessful(isSuccessful + 1);
        fetchData();
      })
      .catch((error) => {
        console.log("the write to firebase failed");
      });
  }, []);
  //ABC0617
  // update this variable on "Items" table, not "History" table
  const editQuantityOfCurrentItem = (idItem, pTimedate) => {
    console.log("start feching data");
    get(child(rootTableRef, `historyItems/${idItem}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("newdata:");
          console.log(snapshot.val());
          // const dataObject = snapshot.val().toJSON();
          //  setData(Object.values(snapshot.val()));
          var tQuantity = 0;
          Object.values(snapshot.val()).forEach((historyItem) => {
            if (historyItem.boolImport) {
              tQuantity =
                tQuantity +
                parseInt(historyItem.numberBox) *
                  parseInt(historyItem.quantityPerBox);
              // console.log(historyItem);
            } else {
              tQuantity =
                tQuantity -
                parseInt(historyItem.numberBox) *
                  parseInt(historyItem.quantityPerBox);
            }
          });

          //abc0706
          //abc08274
          var tMinLevel = 0;
          var tNotified = "0";
          var tName = "";
          // it takes time to get the minLevel value
          get(child(rootTableRef, `items/${idItem}`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log("Get Snapshot reresul:::: ");
              console.log(snapshot.val());
              tMinLevel = snapshot.val().minLevel;
              tNotified = snapshot.val().notified;
              tName = snapshot.val().name;
              //a08311 update date & quantity
              const tNewItem = {
                ...snapshot.val(),
                quantity: tQuantity.toString(),
                updateDate: pTimedate,
              };
              console.log("tNewItem:");
              console.log(tNewItem);
              set(ref(db, `firsttable/items/${idItem}`), tNewItem)
                .then(() => {
                  console.log("save quantity of item success");
                  // we don't move sendEmail inside here since history saved successfully the transaction. This number is only calculated by history >> must find out how to save both historyItem and quantity passed ( or failed at the same time)
                })
                .catch((error) => {
                  console.log("the write to firebase failed");
                  console.log(error);
                });
              fetchData(); // to refresh data to update new quantity
              //a081702
              //a0829
              console.log("tQuantity:" + tQuantity);
              console.log("tMinLevel:" + tMinLevel);
              if (tQuantity < tMinLevel) {
                if (tNotified === "0") {
                  //08301
                  const formData = {
                    html_message:
                      "Current quantity: " +
                      tQuantity +
                      "\nMin Level: " +
                      tMinLevel,
                    from_name: tName,
                    from_email: "do_not_reply@gmail.com",
                  };
                  emailjs
                    .send(
                      "service_lc0747r",
                      "template_y8tpsnb",
                      formData,
                      "ocn9KLzX1o5moirCe"
                    )
                    .then(
                      (result) => {
                        // window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
                        console.log("send mail succeeded!!");
                        //a0829

                        // if (tNotified === "0") {
                        set(ref(db, `firsttable/items/${idItem}/notified`), "1")
                          .then(() => {
                            console.log("email sent and notified field saved");
                          })
                          .catch((error) => {
                            console.log("the write to firebase failed");
                            console.log(error);
                          });
                        // }
                      },
                      (error) => {
                        console.log(error.text);
                      }
                    );
                }
              } else {
                if (tNotified === "1") {
                  set(ref(db, `firsttable/items/${idItem}/notified`), "0")
                    .then(() => {
                      console.log(
                        "Amount of items is just higher than limit. Reset notified value."
                      );
                    })
                    .catch((error) => {
                      console.log("the write to firebase failed");
                      console.log(error);
                    });
                }
              }
            } else {
              console.log("Get item id: " + idItem + "failed");
            }
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //abc0602
  // newItemImportExport is the item from the "history" table
  const addItemImportExport = useCallback(async (newItemImportExport) => {
    console.log(newItemImportExport);
    // setIsSuccessful(false);
    const newPostKey = push(
      child(rootTableRef, `/historyItems/${newItemImportExport.idItem}`)
    ).key; // create folder "idItem" & create new "key"
    set(
      ref(
        db,
        `firsttable/historyItems/${newItemImportExport.idItem}/` + newPostKey
      ),
      {
        ...newItemImportExport,
      }
    )
      .then(() => {
        console.log("save data success");
        editQuantityOfCurrentItem(
          newItemImportExport.idItem,
          newItemImportExport.timedate
        );
        setIsSuccessful(1);
        // fetchData();

        // check if minLevel > Quantity, if so, must send email
        //a1708
      })
      .catch((error) => {
        console.log("the write to firebase failed");
        console.log(error);
        setIsSuccessful(-1);
      });
  }, []);

  //abc0726
  //abc08302
  const editCurrentItem = (tUpdatedItem) => {
    console.log("item received from EditItem: ");
    console.log(tUpdatedItem);
    console.log("start feching data");
    get(child(rootTableRef, `items/${tUpdatedItem.idItem}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("item found:");
          console.log(snapshot.val());

          // var tQuantity = 0;
          // Object.values(snapshot.val()).forEach((historyItem) => {
          //   if (historyItem.boolImport) {
          //     tQuantity =
          //       tQuantity +
          //       parseInt(historyItem.numberBox) *
          //         parseInt(historyItem.quantityPerBox);
          //     // console.log(historyItem);
          //   } else {
          //     tQuantity =
          //       tQuantity -
          //       parseInt(historyItem.numberBox) *
          //         parseInt(historyItem.quantityPerBox);
          //   }
          // });
          // console.log("tQuantity:" + tQuantity);

          //08303
          // do: check 2 case: newMinLevel > quantity > oldMinLevel
          //                  newMinLevel <  quantity < oldMinLevel
          var tNotified = snapshot.val().notified;
          console.log("notified value from snapshot:  " + tNotified);
          if (
            tUpdatedItem.minLevel >= snapshot.val().quantity &&
            snapshot.val().quantity >= snapshot.val().minLevel
          ) {
            tNotified = "0";
          }
          if (
            tUpdatedItem.minLevel < snapshot.val().quantity &&
            snapshot.val().quantity <= snapshot.val().minLevel
          ) {
            tNotified = "1";
            //send notified email
            const formData = {
              html_message:
                "Current quantity: " +
                snapshot.val().quantity +
                "\nMin Level: " +
                tUpdatedItem.minLevel,
              from_name: snapshot.val().name,
              from_email: "do_not_reply@gmail.com",
            };
            emailjs
              .send(
                "service_lc0747r",
                "template_y8tpsnb",
                formData,
                "ocn9KLzX1o5moirCe"
              )
              .then((result) => {
                // window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
                console.log("send mail succeeded!!");
              });
          }
          const tFullUpdatedItem = {
            idItem: tUpdatedItem.idItem,
            minLevel: tUpdatedItem.minLevel,
            name: tUpdatedItem.name,
            notified: tNotified,
            quantity: snapshot.val().quantity,
            updateDate: snapshot.val().updateDate,
          };

          // do update item
          // next step: do update Date when import and export item ?? maybe just need when import and export item
          set(
            ref(db, `firsttable/items/${tUpdatedItem.idItem}`),
            tFullUpdatedItem
          )
            .then(() => {
              console.log("Set minLevel succeeded");

              setIsSuccessful(1);
              // fetchData();

              // check if minLevel >= Quantity, if so, must send email
            })
            .catch((error) => {
              console.log("the write to firebase failed");
              console.log(error);
              setIsSuccessful(-1);
            });
          fetchData(); // to refresh data to update new quantity
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //abc524
  const filterItems = useCallback(async () => {
    setLoading(true);
    try {
      // abc1
      // console.log(staticData);
      // console.log("data from filterItems function:" + data);
      const tResults = data.filter((item) =>
        item.name === ""
          ? true
          : item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // console.log(tResults);
      if (tResults) {
        const newItems = tResults
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => {
            const { idItem, name, updateDate, quantity, minLevel, notified } =
              item;

            return {
              id: idItem,
              name: name,
              update: updateDate,
              quantity: quantity,
              minlevel: minLevel,
              notified: notified,
            };
          });

        const newItem = {
          id: "ID",
          name: "Name",
          update: "Date",
          quantity: "Quantity",
          minlevel: "Min Level",
          notified: "-1", // don't care the value of notified here, since we don't need it for GUI
        };

        // setItems(newItems);
        setItems([newItem, ...newItems]);
      } else {
        setItems([]);
      }
      if (data.length === 0) setLoading(true);
      else setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm, data]);

  useEffect(() => {
    filterItems();
    // console.log(data);
  }, [searchTerm, filterItems, data]);

  return (
    <AppContext.Provider
      value={{
        loading,
        data,
        items,
        searchTerm,
        setSearchTerm,
        isModalOpen,
        openModal,
        closeModal,
        addItemData,
        currentItem,
        setCurrentItem,
        addItemImportExport,
        isSuccessful,
        setIsSuccessful,
        editCurrentItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
