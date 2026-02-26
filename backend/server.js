require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

/* ===============================
   CORE MIDDLEWARE
================================= */
app.use(cors());
app.use(express.json());

/* ===============================
   DATABASE INITIALIZATION
================================= */
require("./db/database");

/* ===============================
   HEALTH CHECK ROUTE
================================= */
app.get("/", (req, res) => {
  res.json({
    status: "Chit Fund Backend Running",
    version: "1.0.0"
  });
});

/* ===============================
   API ROUTES
================================= */
const monthRoutes = require("./routes/month.routes");
const memberRoutes = require("./routes/member.routes");
const paymentRoutes = require("./routes/payment.routes");

app.use("/api/month", monthRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/payment", paymentRoutes);

/* ===============================
   404 HANDLER (Unknown Routes)
================================= */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

/* ===============================
   GLOBAL ERROR HANDLER
================================= */
app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error"
  });
});

/* ===============================
   SERVER START
================================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});