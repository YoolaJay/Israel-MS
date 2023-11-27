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
  .then(result => console.log('member database connected'))
  .catch(err => console.log(err));


const memberSchema = new mongoose.Schema({
  prefix: String,
  name: String,
  phone: String,
  gender: String,
  email: String,
  dateOfBirth: String,
  department: String,
  role: String,
  bio: String,
  notes: String,

  // ... (other fields)
});

const Member = mongoose.model('Member', memberSchema);

router.use(bodyParser.json());

//adding new members
router.post('/api/members', async (req, res) => {
  console.log("member database connected")
  // Your member creation logic here
  try{
  const newMemberData = req.body;

  
    // Check if a member with the same name and phone number already exists
    const existingMember = await Member.findOne({
      name: newMemberData.name,
      phone: newMemberData.phone,
    });

    if (existingMember) {
      return res.status(400).json({ message: 'Member with the same name and phone number already exists' });
    }

    // Create a new member document
    const newMember = new Member(newMemberData);

    // Save the member to the database
    await newMember.save();

    // Respond with a success status
    res.status(200).json({ message: 'Member added successfully' });
  } catch (error) {
    // Handle errors and respond with an error status
    console.error('Error creating member:', error);
    res.status(500).json({ message: 'Error creating member' });
  } 
});

//getting data from members database
router.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  }catch(error){
    console.error('Error fetching the data:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
}); 

// Add this route in your server
router.get('/api/members/suggestions', async (req, res) => {
    const query = req.query.query; // Get the search query from the request

    if (typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid search query' });
    }

    
    try {
      const members = await Member.find({
        $or: [
          { name: { $regex: query, $options: 'i' } }, // Case-insensitive name search
          { phone: { $regex: query, $options: 'i' } }, // Case-insensitive phone search
        ],
      });
      res.status(200).json(members);
    } catch (error) {
      console.error('Error searching for members:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Add this route in your Express server
router.get('/api/members/details', async (req, res) => {
  try {
    const selectedUserName = req.query.name; // Get the selected user's name from the query parameter
    // Query the 'members' collection for the user with the matching name
    const selectedUser = await Member.find({ name: selectedUserName });
    if (selectedUser) {
      // Send the user's details back in the response
      res.status(200).json(selectedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to delete members
router.delete('/api/members', async (req, res) => {
  const memberIdsToDelete = req.body.members;

  if (!Array.isArray(memberIdsToDelete) || memberIdsToDelete.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty member IDs provided' });
  }

  try {
    // Use the `deleteMany` method to delete multiple members based on their IDs
    const deleteResult = await Member.deleteMany({ _id: { $in: memberIdsToDelete } });

    if (deleteResult.deletedCount > 0) {
      res.status(200).json({ message: 'Members deleted successfully' });
    } else {
      res.status(404).json({ error: 'Members not found' });
    }
  } catch (error) {
    console.error('Error deleting members:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add this route in your Express server
router.put('/api/members/edit/:id', async (req, res) => {
  const memberId = req.params.id;
  const updatedMemberData = req.body;

  try {
    // Use the `findOneAndUpdate` method to find and update the member based on its ID
    const updatedMember = await Member.findOneAndUpdate(
      { _id: memberId },
      { $set: updatedMemberData },
      { new: true }
    );

    if (updatedMember) {
      res.status(200).json({ message: 'Member updated successfully', member: updatedMember });
    } else {
      res.status(404).json({ error: 'Member not found' });
    }
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  

module.exports = router;

