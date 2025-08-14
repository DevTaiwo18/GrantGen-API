const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const grantRoutes = require("./routes/grants");
const proposalRoutes = require('./routes/proposal');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

app.use("/api/grants", grantRoutes);
app.use('/api', proposalRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
