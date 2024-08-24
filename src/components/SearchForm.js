import React from "react";
import { useGlobalContext } from "../context";
export default function SearchForm() {
  const { setSearchTerm, isModalOpen } = useGlobalContext();
  const searchValue = React.useRef("");

  React.useEffect(() => {
    if (!isModalOpen) searchValue.current.focus();
  }, [isModalOpen]);

  function searchItem() {
    setSearchTerm(searchValue.current.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search stock items </label>
          <input
            type="text"
            name="name"
            id="name"
            ref={searchValue}
            onChange={searchItem}
          />
        </div>
      </form>
    </section>
  );
}
