const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());

// Serve static files from the root directory
app.use(express.static(join(__dirname)));

// Serve index.html for all routes
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "svlogin.html"));
});

// Serve environment variables from process.env
app.get("/auth_config.json", (req, res) => {
  const authConfig = {
    domain: process.env.AUTH0_DOMAIN,
    client_id: process.env.AUTH0_CLIENT_ID
  };
  res.json(authConfig);
});

// Listen on a specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on("SIGINT", function () {
  process.exit();
});

module.exports = app;
