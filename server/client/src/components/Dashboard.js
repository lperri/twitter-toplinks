import React from "react";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import "./Dashboard.css";

const Dashboard = (props) => {
  const renderContent = (props) => {
    switch (props.auth) {
      case null:
        return <h1>Loading...</h1>;
      default:
        return (
          <div>
            <h1>
              Hey, {props.auth.firstName}! <br />
            </h1>
            <SearchBar />
          </div>
        );
    }
  };
  return <div>{renderContent(props)}</div>;
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Dashboard);
