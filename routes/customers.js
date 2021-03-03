const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Define the schema for customers
const newSchema = new mongoose.Schema({
	isGold: {
		type: Boolean,
		required: ture
	}
	name: {
		type: String,
		required: true
	}
	phone: {
		type: String
	}
});

