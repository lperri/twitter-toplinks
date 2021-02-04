import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <ul className="right">
            <a
              id="twitter-button"
              className="btn btn-block btn-social btn-twitter"
              style={{
                width: 220,
                "text-align": "right",
                display: "inline-block",
                "background-color": "#1DA1F2",
              }}
              href="/auth/twitter"
            >
              Sign in with Twitter
              <i className="fa fa-twitter"></i>
            </a>
          </ul>
        );
      default:
        return (
          <ul className="right">
            <a
              id="twitter-button"
              className="btn btn-block btn-social btn-twitter"
              style={{
                width: 220,
                "text-align": "center",
                display: "inline-block",
                "background-color": "#1DA1F2",
              }}
              href="/api/logout"
            >
              Logout
            </a>
          </ul>
        );
    }
  }

  render() {
    return (
      <nav
        style={{
          "background-color": "white",
          display: "flex-inline",
          "justify-content": "space-around",
        }}
      >
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/dashboard" : "/"}
            className="left brand-logo"
            style={{
              color: "#AAB8C2",
              "font-family": "Poppins, sans-serif",
            }}
          >
            Twitter TopLinks
          </Link>
          <ul>{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);
