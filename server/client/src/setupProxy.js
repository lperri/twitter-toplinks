const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/login_status", "/auth/twitter", "/logout"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
