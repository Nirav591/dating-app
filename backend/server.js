const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth.route');
const videoRoute = require('./routes/video.route');
const premiumVideoRoute = require('./routes/premium-video.route');
const facebookAdsRoute = require('./routes/facebook-ads.route');
const googleAdsRoute = require('./routes/google-ads.route');
const { verifyToken } = require('./middlewares/verify-token');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes
app.use('/auth', authRoute);
app.use('/video', verifyToken, videoRoute);
app.use('/premium-video', verifyToken, premiumVideoRoute);
app.use('/facebook-ads', verifyToken, facebookAdsRoute);
app.use('/google-ads', verifyToken, googleAdsRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
