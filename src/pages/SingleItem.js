import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
// import staticData_historyItem from "../data_historyItem";
import { useGlobalContext } from "../context";
import HistoryItem from "../components/HistoryItem";
import { appFirebase } from "../initFirebase";
import { getDatabase, ref, child, get } from "firebase/database";

const db = getDatabase(appFirebase);
const rootTableRef = ref(db, "firsttable");
const historyItemRef = ref(db, "firsttable/historyItems");
export default function SingleItem() {
  const { id } = useParams();
  const { data, currentItem } = useGlobalContext();
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [historyItems, setHistoryItems] = React.useState([]);

  // why data empty here????? abc0706
  if (Object.keys(currentItem).length === 0 && name === "") {
    const filterItem = data.filter((item) => {
      if (item.idItem.toString() === id) {
        return true;
      } else {
        return false;
      }
    });
    const tCurrentItem = filterItem[0];
    if (tCurrentItem !== null && tCurrentItem !== undefined) {
      console.log(tCurrentItem);
      setName(tCurrentItem.name);
    } else {
      console.log("null or undefined currentitem");
    }
  }

  React.useEffect(() => {
    setLoading(true);
    // async function getHistoryItem() {
    //   try {
    //     const filterStaticData_historyItem = staticData_historyItem.filter(
    //       (item) => item.idItem == id
    //     );
    //     const newHistoryItems = filterStaticData_historyItem.map((item) => {
    //       const {
    //         idItem,
    //         description,
    //         supplier,
    //         timedate,
    //         boolImport,
    //         numberBox,
    //         quantityPerBox,
    //       } = item;

    //       return {
    //         id: idItem,
    //         name: description,
    //         supplier: supplier,
    //         time: timedate,
    //         isImport: boolImport,
    //         numberBox: numberBox,
    //         quantityPerBox: quantityPerBox,
    //       };
    //     });
    //     const newTitle = {
    //       id: -1,
    //       name: "Name",
    //       supplier: "Supplier",
    //       time: "Date",
    //       isImport: "Status",
    //       numberBox: " #Boxes",
    //       quantityPerBox: "#Items/Box",
    //     };

    //     setHistoryItems([newTitle, ...newHistoryItems]);
    //     console.log(historyItems);
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   setLoading(false);
    // }
    // getHistoryItem();
    get(child(rootTableRef, `historyItems/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          const newHistoryItems = Object.values(snapshot.val());
          console.log(newHistoryItems);
          let fullNewHistoryItems = newHistoryItems.map((tItem) => {
            return {
              ...tItem,
              name: name ? name : currentItem.currentName,
              timedate: tItem.timedate,
            };
          });
          console.log("sort result:::::");
          // fullNewHistoryItems.sort(
          //   (a, b) => Date.parse(b.timedate) - Date.parse(a.timedate)
          // );
          fullNewHistoryItems.reverse();
          const newTitle = {
            id: -1,
            name: "Name",
            supplier: "Supplier",
            timedate: "Date",
            boolImport: "Status",
            numberBox: " #Boxes",
            quantityPerBox: "#Items/Box",
          };
          setHistoryItems([newTitle, ...fullNewHistoryItems]);
          console.log(fullNewHistoryItems);
        } else {
          console.log("no data avaialbe for historyItems");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, [id, name]);
  if (loading) {
    return <Loading />;
  }
  if (historyItems.length < 1) {
    return <h2 className="section-title">no data to display</h2>;
  }
  return (
    <section className="section">
      <h2 className="section-title">Transaction History</h2>
      <div className="items-center">
        {historyItems.map((item, index) => {
          return <HistoryItem key={index} {...item} />;
        })}
      </div>
    </section>
  );
}
