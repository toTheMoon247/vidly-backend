const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require('')

const Movie = mongoose.model('Movies', new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: truem,
		minlength: 2,
		maxlength: 128, // To avoid malicious client to abuse us and block the memory
	},
	genre: {
		type: genreSchema,
		required: true
	},
	numberInstock: {
		type: Number,
		required: true,
		min: 0,
		max: 128
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
		max: 128
	}
}));

// Note: Here schema refered to Joi schema, NOT mongoose schema
function validateMovie(movie) {
	cosnt schema = {
		title: Joi.string().min(5).max(50).required(),
		genreId: Joi.string().required(),
		numberInstock: Joi.number().min(0).required(),
		dailyRentalRate: Joi.number().min(0).required()
	}

	return Joi.validate(movie, schema);
}