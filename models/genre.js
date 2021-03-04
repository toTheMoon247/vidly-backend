const Joi = require('joi'); // Joi is a data validation package
const mongoose = require('mongoose');

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

// Helper Functions
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;