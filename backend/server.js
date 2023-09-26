const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth.route');
const videoRoute = require('./routes/video.route');
const facebookAdsRoute = require('./routes/facebook-ads.route');
const googleAdsRoute = require('./routes/google-ads.route');

const { verifyToken } = require('./middlewares/verify-token');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes
app.use('/auth', authRoute);
app.use('/video', verifyToken, videoRoute);
app.use('/facebook-ads', verifyToken, facebookAdsRoute);
app.use('/google-ads', verifyToken, googleAdsRoute);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
