// ref
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

export default function Item({
  update,
  name,
  id,
  quantity,
  minlevel,
  notified,
}) {
  const { setCurrentItem, setIsSuccessful, isSuccessful } = useGlobalContext();
  const tNewName = name.replaceAll(/[ .*+?^${}()|[\]\\]/g, "_"); // $& means the whole matched string
  // console.log(tNewName);

  const fBeforeImportExportClick = () => {
    setCurrentItem({
      currentName: name,
      currentId: id,
      minLevel: minlevel,
      notified: notified,
    });
    setIsSuccessful(0);
    console.log(isSuccessful);
  };

  return (
    <article className="item">
      {/* <div className='img-container'>
        <img src={image} alt={name} />
      </div> */}
      <div className="item-footer">
        <div className="item__updatedate">{update}</div>
        <div className="item__name">{name}</div>
        <div className="item__quantity">{quantity}</div>
        <div className="item__minlevel">{minlevel}</div>
        <div>
          <Link
            to={`/singleitem/${id}/${tNewName.toLowerCase()}`}
            className="btn btn-primary btn-details"
            onClick={fBeforeImportExportClick}
          >
            details
          </Link>
        </div>
        <div>
          <Link
            to={`/importitem/${id}/${tNewName.toLowerCase()}`}
            className="btn btn-primary btn-details"
            onClick={fBeforeImportExportClick}
          >
            import
          </Link>
        </div>
        <div>
          <Link
            to={`/exportitem/${id}/${tNewName.toLowerCase()}`}
            className="btn btn-primary btn-details"
            onClick={fBeforeImportExportClick}
          >
            export
          </Link>
        </div>
        <div>
          <Link
            to={`/edititem/${id}/${tNewName.toLowerCase()}`}
            className="btn btn-primary btn-details"
            onClick={fBeforeImportExportClick}
          >
            edit
          </Link>
        </div>
      </div>
    </article>
  );
}
