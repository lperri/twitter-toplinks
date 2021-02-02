const passport = require("passport");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send({ hi: "there" });
  });

  app.get("/auth/twitter", passport.authenticate("twitter"));

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
      successRedirect: "/",
      failureRedirect: "/login_status",
    })
  );

  // when login is successful, retrieve user info
  app.get("/login_status", (req, res) => {
    if (req.user) {
      res.json({
        success: true,
        message: "User has successfully been authenticated",
        user: req.user,
        cookies: req.cookies,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Failed to authenticate user",
      });
    }
  });

  // When logout, redirect to client
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
