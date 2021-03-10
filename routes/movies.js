const { Movie, validate } = require("../models/movie");
const { genre } = require("../models/genre");
const mogoose = require("mongoose");
const express = require("express");
const router = express.Router();


// Read (read all & read one)
router.get(('/', async (res, req) => {
	const movies = await Movie.find().sort('name');
	res.send(movies);
}));


router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error)
		return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) 
		return res.status(400).send('Invalid genre.');

	let movie = new Movie({
		title: req.body.title;
		// embedded documant: We choose only the properties that we want. and not all the documant. 
		genre: {
			_id: genre._id,
			name: genre.name
		},
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate
	});
	movie = await movie.save();
});