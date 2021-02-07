import React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import "./SearchBar.css";

const SearchSubmitButton = () => {
  return (
    <div>
      <button type="Submit" className="submitButton" />
    </div>
  );
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="containerMe">
      <div class="input-group-prepend">
        <span class="input-group-text">#</span>
      </div>
      <input
        className="searchBar"
        type="text"
        placeholder="Search a hashtag"
        value={searchTerm}
        onChange={handleChange}
      />
      <SearchSubmitButton>Submit</SearchSubmitButton>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { searchTerm: state.searchTerm };
};

export default connect(mapStateToProps)(SearchBar);
