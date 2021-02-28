const Joi = require('joi'); // Joi is a data validation package
const express = require('express');
const app = express();

app.use(express.json()); // This is a build-in middleware in Express. Output: req.body (JSON object)

// For now we save it locally, instead of the DB
const genres = [
	{ id: 1, name: 'action' },
	{ id: 2, name: 'horror' },
	{ id: 2, name: 'drama' },
];

// Create
app.post('/api/genres', (req, res) => {
	// Check for errors - if there are errors return to the client
	const { error } = validateGenre(req.body);
	if (error)
		return res.status(400).send(error.details[0].message);

	// Create a genre object
	const genre = {
		id: genres.length + 1,
		name: req.body.name
	};

	// Update the "Database"
	genres.push(genre);
	res.send(genre);

	// Update the client
	res.send(genre);
});

// Read
app.get('/api/genres', (req, res) => {
	res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
	// Find the genre
	const genre = genres.find(c => c.id === parseInt(req.params.id));
	if (!genre)
		return res.status(404).send("couldn't find genre id");

	res.send(genre);
});

// Update
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) 
  	return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body); 
  if (error) 
  	return res.status(400).send(error.details[0].message);
  
  genre.name = req.body.name; 
  res.send(genre);
});

// Delete
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

// Helper Functions
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`)); 