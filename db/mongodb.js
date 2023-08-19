const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://SajnaTT:Saju123naufal@cluster0.sut9o9a.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to my local DB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });