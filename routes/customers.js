const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Define the schema for customers
const customerSchema = new mongoose.Schema({
	isGold: {
		type: Boolean,
		required: ture
	}
	name: {
		type: String,
		required: true
	}
	phone: {
		type: String,
		required: true
	}
});

const Customer = mongoose.model('Customer', customerSchema);

// Create
router.post('/', async (req, res) => {
	// validate user body request (check that the customer properties are valid)
	// TODO

	// Create a customer object
	let customer = new Customer( {isGold: req.body.isGold, name: req.body.name, phone: req.body.phone} );
	
	// Update the database
	customer = await Customer.save(customer);

	// return response to the client
	res.send(customer);
});

// Read
router.get('/', async (req, res) => {
	// get all customers from database
	customers = await Customer.find().sort('name');
	res.send(customers);
});

router.get('/:id', (req, res) => {
	customer = await Customer.findById(req.paramas.id);
	if (!customer)
		return res.status(404).send("couldn't find customer id");

	return res.send(customer);
});

// Update

// Delete