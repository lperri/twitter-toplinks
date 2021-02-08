import React from "react";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = (props) => {
  // const [users, setUsers] = React.useState(null);

  // React.useEffect(() => {
  //   if (props.auth == null) {
  //     return;
  //   }
  //   const fetchAndHandleUsers = async () => {
  //     const followees = await axios.get("/api/followees");
  //     console.log("skkrrt", followees);
  //     setUsers(followees.data);
  //   };

  //   fetchAndHandleUsers();
  // }, [props.auth]);

  // let userString;

  // if (users != null && Array.isArray(users)) {
  //   userString = users.reduce((acc, user) => {
  //     console.log(user, acc);
  //     return acc + `${user.name}`;
  //   }, "");
  // }
  const [tweets, setTweets] = React.useState(null);
  React.useEffect(() => {
    if (props.auth == null) {
      return;
    }
    const fetchAndHandleTweets = async () => {
      const tweets = await axios.get("/api/home_feed");
      console.log("dashboard!!!!!!!....", tweets);
      setTweets(tweets.data);
    };

    fetchAndHandleTweets();
  }, [props.auth]);

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
            <h1>
              {tweets}
              <br />
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
