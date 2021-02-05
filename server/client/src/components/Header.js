import "./Header.css";
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
              href="/api/logout"
              style={{ textAlign: "center" }}
            >
              Logout
            </a>
          </ul>
        );
    }
  }

  render() {
    return (
      <nav className="site-header">
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/dashboard" : "/"}
            className="brand-logo"
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
