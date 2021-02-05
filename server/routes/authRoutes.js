const passport = require("passport");
const { emitWarning } = require("process");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send({ hi: "there" });
  });

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
};
