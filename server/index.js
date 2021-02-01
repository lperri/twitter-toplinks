const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const MONGO_URI = require("./config/keys").MONGO_URI;
// order of next two module imports matters
require("./models/User");
require("./services/passport");

mongoose.connect(MONGO_URI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

// Heroku sets the PORT environment variable if running in prod
const PORT = process.env.PORT || 5000;
app.listen(PORT);
