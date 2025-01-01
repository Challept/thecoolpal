const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());

// Serve static files from the 'public' directory
// This is where you should put your 'index.html' and other static files like CSS, JS, images, etc.
app.use(express.static(join(__dirname, "public")));

// Serve auth_config.json (ensure it's in the root directory or correct path)
app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

// Serve index.html for all routes
// All routes should serve the same index.html for your single-page application (SPA)
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

// Listen on a specified port (Render uses process.env.PORT for production)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle graceful shutdown (for when the server is terminated)
process.on("SIGINT", function () {
  console.log("Server shutting down gracefully...");
  process.exit();
});

module.exports = app;
