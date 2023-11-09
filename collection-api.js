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
  .then(result => console.log('collection retrieval connected'))
  .catch(err => console.log(err));

  const dateCollectionSchema = new mongoose.Schema({
    date: Date,
    maleCount: Number,
    femaleCount: Number,
    gender: String,
    // Define other fields as needed
});

const DateCollection = mongoose.model('DateCollection', dateCollectionSchema);

router.get('/api/collections', async (req, res) => {
    try {
        // Establish a connection to the MongoDB database
        const db = mongoose.connection.db;

        // Get a list of all collection names in the "cms" database
        const collectionNames = await db.listCollections().toArray();

        // Filter collection names that match the date pattern
        const dateCollectionNames = collectionNames
            .map(collection => collection.name)
            .filter(collectionName => /^\d{4}-\d{2}-\d{2}$/.test(collectionName));

            const dateCollections = [];
            for (const collectionName of dateCollectionNames) {
                const count = await db.collection(collectionName).countDocuments();
                const maleCount = await db.collection(collectionName).countDocuments({ gender: "Male" });
                const femaleCount = await db.collection(collectionName).countDocuments({ gender: "Female" });


                dateCollections.push({ collectionName, count, maleCount, femaleCount });

            }
    
            // console.log(maleCount)
            console.log(dateCollections)
        // Send the filtered date collection names as a response
        res.json(dateCollections);
    } catch (error) {
        console.error('Error fetching date collections:', error);
        res.status(500).json({ error: 'Failed to fetch date collections' });
    }
});

// Get detailed data for a specific date collection
router.get('/api/collections/:collectionName/details', async (req, res) => {
    try {
        // Establish a connection to the MongoDB database
        const db = mongoose.connection.db;
        const collectionName = req.params.collectionName;

        // Assuming your detailed data is stored in the "data" field of the collection
        const detailedData = await db.collection(collectionName).find().toArray();

        res.json(detailedData);
    } catch (error) {
        console.error('Error fetching detailed data:', error);
        res.status(500).json({ error: 'Failed to fetch detailed data' });
    }
});


module.exports = router;