const { Movie, validate } = require("../models/movie");
const { genre } = require("../models/genre");
const mogoose = require("mongoose");
const express = require("express");
const router = express.Router();