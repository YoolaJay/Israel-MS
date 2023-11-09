const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const url = "mongodb://127.0.0.1:27017/cms"

const router = express.Router();

// const mongoURI = 'mongodb://127.0.0.1:27017/cms';
mongoose.connect(url, {
   useNewUrlParser: true, 
   useUnifiedTopology: true 
  })
  .then(result => console.log('enrollment database connected'))
  .catch(err => console.log(err));


const enrollSchema = new mongoose.Schema({
    prefix: String,
    name: String,
    phone: String,
    gender: String,
    email: String,
    dateOfBirth: String,
    department: String,
    role: String,

// ... (other fields)
});

const Enroll = mongoose.model('Enroll', enrollSchema);

router.use(bodyParser.json());

// Add this route in your Express server
router.post('/api/enroll', async (req, res) => {
    try {
      const selectedUserData = req.body; // Assuming the selected user data is sent in the request body

      // Get the current date
      const currentDate = new Date();
      const day = currentDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
      const month = (currentDate.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }); // Month is 0-based, so add 1
      const year = currentDate.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;
  
      // Define the name of the collection using the formatted date
      const collectionName = formattedDate;
  
      // Create a new collection with the day's date as the name (if it doesn't already exist)
      const newCollection = mongoose.connection.collection(collectionName);

      const newEnroll = new Enroll(selectedUserData);
  
      await newEnroll.save()
      await newCollection.insertOne(selectedUserData);
      // Save the selected user's data to the new collection
    //   const result = await newCollection.insertOne(selectedUserData);
  
    //   if (result.insertedCount === 1) {
        if(newEnroll){
        res.status(200).json({ message: 'Enrollment successful' });

      } else {
        // Failed to enroll
        res.status(500).json({ error: 'Failed to enroll' });
      }
    } catch (error) {
      console.error('Error enrolling user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add this route in your Express server
router.get('/api/enroll/genderDataForDay', async (req, res) => {
    try {
      // Get the current date
      const currentDate = new Date();
      const day = currentDate.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
      const month = (currentDate.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }); // Month is 0-based, so add 1
      const year = currentDate.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;
    
      // Define the name of the collection using the formatted date
      const collectionName = formattedDate;
  
      // Use Mongoose to query the collection for gender data
      const enrollCollection = mongoose.connection.collection(collectionName);
  
      const genderData = await enrollCollection.aggregate([
        {
          $group: {
            _id: '$gender',
            count: { $sum: 1 },
          },
        },
      ]).toArray();
  
      // Construct the result with total males and females
      let males = 0;
      let females = 0;
      
      genderData.forEach((gender) => {
        if (gender._id === 'Male') {
          males = gender.count;
        } else if (gender._id === 'Female') {
          females = gender.count;
        }
      });
  
      res.status(200).json({ males, females });
    } catch (error) {
      console.error('Error fetching gender data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
  

module.exports = router;

