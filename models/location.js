const Joi = require("joi");
const mongoose = require("mongoose");
const moment = require("moment-timezone");

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
		default: () => moment().tz("Asia/Kolkata").toDate(),
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
