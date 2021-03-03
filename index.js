const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

// Connect to the database
mongoose.connect('mongodb://localhost/vidly')
	.then(() => console.log('Connected to mongoDB...'))
	.catch(err => console.error('# Could not connect to MongoDB #'));

app.use(express.json()); // This is a build-in middleware in Express. Output: req.body (JSON object)
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`)); 