const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const url = "mongodb://127.0.0.1:27017/cms"

// Connect to your MongoDB database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(result => console.log('session database connected'))
  .catch(err => console.log(err));


router.post('/api/createCollection', async (req, res) => {
try {
    const today = new Date();
    const collectionName = today.toISOString().split('T')[0];
    
    const db = mongoose.connection.useDb('cms');
    const newCollection = db.model(collectionName, new mongoose.Schema({}));

    // Check if the collection already exists
    // const collectionExists = await mongoose.connection.db.listCollections({ name: collectionName }).hasNext();
    const collections = await db.db.listCollections().toArray();
    const collectionExists = collections.some((collection) => collection.name === collectionName);

    // const collectionExists = await newCollection.db.listCollections({ name: collectionName }).hasNext();

    if (!collectionExists) {
      // Create the collection if it doesn't exist
    //   const newCollection = mongoose.connection.db.collection(collectionName);
      res.json({ message: 'Collection created', created: true });
      console.log('Collection created')
    } else {
      res.json({ message: 'Collection already exists', created: false });
      console.log('Collection already exists')
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', created: false });
  }
});


module.exports = router;