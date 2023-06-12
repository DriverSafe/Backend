const Joi = require("joi");
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
	lat: {
		type: Number,
		required: true,
	},
	lng: {
		type: Number,
		required: true,
	},
	accuracy: {
		type: Number,
		required: true,
	},
	time: {
		type: Date,
		default: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000),
	},
});

const Location = mongoose.model("Location", locationSchema);

function validateLocation(location) {
	const schema = Joi.object({
		lat: Joi.number().required(),
		lng: Joi.number().required(),
		accuracy: Joi.number().required(),
		time: Joi.date(),
	});

	return schema.validate(location);
}

exports.Location = Location;
exports.validate = validateLocation;
