/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { GlobalContext } from "../../plugins/globalContext";
function Search() {
  return (
    <div className="field">
      <div className="control has-icons-right">
        <input
          className="input is-rounded"
          type="text"
          placeholder="Search by location | name | or any other searm term"
        />
        <span className="icon is-small is-right">
          <i className="fas fa-search fa-xs"></i>
        </span>
      </div>
    </div>
  );
}

export default Search;
