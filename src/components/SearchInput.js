import React from "react";

function SearchInput(props) {
    const {searchParameter,setSearchParameter,onClickHandler}=props;
  return (
    <div className="input-container">
      <div className="search-div">
        <input
          id="search"
          type="text"
          placeholder="Search News here"
          value={searchParameter}
          onChange={(event) => {
            setSearchParameter(event.target.value);
          }}
        />
        <button className="search-btn" onClick={onClickHandler}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
