const Joi = require('joi'); // Joi is a data validation package
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Define a schema(Mongoose) for our gernes collection in mongoDB
const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50
	}
});

const Genre = mongoose.model('Genre', genreSchema);

// Create
router.post('/', async (req, res) => {
	// Check for errors - if there are errors return to the client
	const { error } = validateGenre(req.body);
	if (error)
		return res.status(400).send(error.details[0].message);

	// Create a genre object
	let genre = new Genre({ name: req.body.name });
	genre = await genre.save();	

	// Update the client
	res.send(genre);
});

// Read
router.get('/', async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

router.get('/:id', async (req, res) => {

	// Find the genre
	const genre = await Genre.findById(req.params.id);
	if (!genre)
		return res.status(404).send("couldn't find genre id");

	res.send(genre);
});

// Update
router.put('/:id', async (req, res) => {

	const { error } = validateGenre(req.body); 
	if (error) 
		return res.status(400).send(error.details[0].message);
	
	// new: true will send us back the updated object
	const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });	
	if (!genre) 
		return res.status(404).send('The genre with the given ID was not found.');

	res.send(genre);  
});

// Delete
router.delete('/:id', async (req, res) => {

	const genre = await Genre.findByIdAndRemove(req.params.id);

	if (!genre) 
		return res.status(404).send('The genre with the given ID was not found.');

	res.send(genre);	
});

// Helper Functions
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports= router;