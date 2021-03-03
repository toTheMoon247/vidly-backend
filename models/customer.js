const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Define the schema for customers
const customerSchema = new mongoose.Schema({
	isGold: {
		type: Boolean,
		default: false
	},
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	}
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
	// TODO
};

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
