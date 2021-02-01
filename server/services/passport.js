const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // user.id is the _id property in our mongo record
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // once we find the right user, return that in "done" callback
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.TWITTER_CONSUMER_API_KEY,
      clientSecret: keys.TWITTER_CONSUMER_API_SECRET_KEY,
      callbackURL: "/auth/twitter/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // query the mongo DB to see if this user exists already
      const existingUser = await User.findOne({ twitterId: profile.id });
      if (existingUser) {
        // we already have a record with the given profile ID
        return done(null, existingUser);
      }
      // we don't have a user record with this ID, make a new record
      const user = await new User({ twitterId: profile.id }).save();
      done(null, user);
    }
  )
);
