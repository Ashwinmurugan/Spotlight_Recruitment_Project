require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Spotlight API is running");
});

// Use a default port if process.env.PORT is undefined
const PORT = process.env.PORT || 5000;  

app.listen(PORT, () => console.log(`Server Running.. on port ${PORT}`));
