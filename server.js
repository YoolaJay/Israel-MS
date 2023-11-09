const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const User = require('./models/User'); // Import the user model

// const url = "mongodb://127.0.0.1:27017/cms"
const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());

// Connect to MongoDB
// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(result => console.log('database connected'))
// .catch(err => console.log(err));

const loginRoutes = require('./login-api'); // Include your existing login-related API
const memberRoutes = require('./member-api'); // Include the new member-related API
const powerRoutes = require('./power-api');
const enrollRoutes = require('./enroll-api');
const collectionRoutes = require('./collection-api')

// const app = express();
// const port = process.env.PORT || 3000;

app.use(loginRoutes); // Set up routes for login
app.use(memberRoutes); // Set up routes for member-related functionality
app.use(powerRoutes);
app.use(enrollRoutes);
app.use(collectionRoutes);

// Other server setup and middleware

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
