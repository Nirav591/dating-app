const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth.route');


const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define routes
app.use('/auth', authRoute);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
