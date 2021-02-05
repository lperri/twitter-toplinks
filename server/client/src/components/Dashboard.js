import React from "react";
import { connect } from "react-redux";

const Dashboard = (props) => {
  console.log(props.auth);
  return (
    <div>
      <h1>Hey, {props.auth.fullName}!</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Dashboard);
