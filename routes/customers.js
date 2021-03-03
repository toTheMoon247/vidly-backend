const {Customer, validate} = require('../models/customer');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Create
router.post('/', async (req, res) => {
	// validate user body request (check that the customer properties are valid)
	// TODO

	// Create a customer object
	let customer = new Customer( {isGold: req.body.isGold, name: req.body.name, phone: req.body.phone} );
	console.log(customer);

	// Update the database
	customer = await customer.save(customer);

	// return response to the client
	res.send(customer);
});

// Read
router.get('/', async (req, res) => {
	// get all customers from database
	customers = await Customer.find().sort('name');
	res.send(customers);
});

router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.paramas.id);
	if (!customer)
		return res.status(404).send("couldn't find customer id");

	return res.send(customer);
});

// Update
router.put('/:id', async (req, res) => {
	// validate user body request (check that the customer properties are valid)
	// TODO

	const reqBody = {isGold: req.body.isGold, name: req.body.name, phone: req.body.phone};
	// find customer in the database by id and update it (all in one go)
	const customer = await Customer.findByIdAndUpdate(req.paramas.id, reqBody, { new: true } );
	if (!customer)
		return res.status(404).send("couldn't find customer id");

	// return response to the client 
	return res.send(customer);
});

// Delete
router.delete('/:id', async (req, res) => {
	// find customer in the database and remove it (all in one go)
	const customer = Customer.findByIdAndRemove(req.paramas.id);
	if (!customer)
		return res.status(404).send("couldn't find customer id");

	// return response to the client
	return res.send(customer);	
});

module.exports = router;