const express = require('express');
const cors = require('cors');
const { connectDB } = require('./utils/dbConnect');
const authRoutes = require('./routes/auth');
// const port = 5000;

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(authRoutes)

const startServer = async () => {
    await connectDB(); 
  };
startServer();
// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
//   });
  
module.exports = (req, res) => {
    app(req, res);
};
