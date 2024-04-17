const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const dbURI = 'mongodb+srv://stksagor:741258@atlascluster.vk55q5u.mongodb.net/jobs';
mongoose.connect(dbURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error: ' + err));

// Schema and Model
const itemSchema = new mongoose.Schema({
  image: String,
  mainTitle: String,
  category: String,
  lastTime: String
}, { versionKey: false });

const Item = mongoose.model('Item', itemSchema);

// POST endpoint to add new items
app.post('/jobpost', async (req, res) => {
  const newItem = new Item({
    image: req.body.image,
    mainTitle: req.body.mainTitle,
    category: req.body.category,
    lastTime: req.body.lastTime
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET endpoint to retrieve items
app.get('/jobs', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/', (req, res) => {
    res.send('Hello, browser!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
