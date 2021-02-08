const passport = require("passport");
const { emitWarning } = require("process");
const { getFollowing } = require("../services/followingFetcher");
const { getHomeFeed } = require("../services/feedFetcher");
module.exports = (app) => {
  app.get("/auth/twitter", passport.authenticate("twitter"));

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
      successRedirect: "/dashboard",
      failureRedirect: "/",
    })
  );

  // when login is successful, retrieve user info
  app.get("/api/login/status", (req, res) => {
    res.send(req.user);
  });

  // When logout, redirect to client
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/followees", async (req, res) => {
    const followees = await getFollowing(req.user.twitterId);

    console.log("authRoutes: ", followees);

    res.send(followees);
  });

  app.get("/api/home_feed", async (req, res) => {
    const tweets = await getHomeFeed();

    console.log("authRoutes: ", tweets);

    res.send(tweets);
  });
};
