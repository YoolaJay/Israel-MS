const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User'); // Import the user model
const router = express.Router();
const url = "mongodb://127.0.0.1:27017/cms"
// const app = express();
// const port = 3001;



// router.use(cors({
//   origin: 'http://localhost:5173'
// }));

router.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(result => console.log('login database connected'))
.catch(err => console.log(err));


// API endpoint for user login
router.post('/api/login', async (req, res) => {

  try {
    const { username, password } = req.body;
    console.log('Recieved login request for username', username);

    // Check if the user exists in the database
    const user = await User.findOne({ username, password });

    if (user) {
      // User found, send a success response
      res.json({ success: true });
    } else {
      // User not found, send an error response\
      console.log('Invalid login attempt')
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      setErrorMessage("Invalid login details")
    }
  } catch (error) {
    // Handle any errors
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = router;