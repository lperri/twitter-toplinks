import React from "react";
import { connect } from "react-redux";
import background from "./img/background.jpg";

const Landing = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100w",
        height: "100vh",
        opacity: 0.8,
      }}
    ></div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Landing);
