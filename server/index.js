const express = require("express");
const cors = require("cors");

const { connectDB } = require("./utils/dbConnect");

const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/question");
const leaderboardRoutes = require("./routes/leaderboard");

const port = 5001;

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(authRoutes);
app.use(questionRoutes);
app.use(leaderboardRoutes);

const startServer = async () => {
  await connectDB();
};
startServer();
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = (req, res) => {
  app(req, res);
};
