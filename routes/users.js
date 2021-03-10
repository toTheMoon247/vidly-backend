
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// This router will be used for registering new users to our system
router.post('/', async (req, res) => {
	// Check for errors - if there are errors return to the client
	const { error } = validate(req.body);
	if (error)
		return res.status(400).send(error.details[0].message);

	// Validate that the user is not registered
	let user = await User.findOne({ email: req.body.name });
	if (user)
		return res.status(400).send('This email is already registered in our system');

	// Create a user
	user = new User({ 
		name: req.body.name,
		email: req.body.email,
		password: req.body.password 
	});

	// Update the client
	await user.save();
	res.send(user);
});

module.exports = router;