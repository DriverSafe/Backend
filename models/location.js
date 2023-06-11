const Joi = require("joi");
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	cordination: {
		type: String,
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
		name: Joi.string().required(),
		cordination: Joi.string().required(),
	});

	return schema.validate(location);
}

exports.Location = Location;
exports.validate = validateLocation;
