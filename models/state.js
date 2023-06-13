const Joi = require("joi");
const mongoose = require("mongoose");
const moment = require("moment-timezone");

const stateSchema = new mongoose.Schema({
	speed: {
		type: Number,
		required: true,
	},

	state: {
		type: String,
		required: true,
	},

	time: {
		type: Date,
		default: () => moment().tz("Asia/Kolkata").toDate(),
	},
});

const State = mongoose.model("State", stateSchema);

function validateState(state) {
	const schema = Joi.object({
		speed: Joi.number().required(),
		state: Joi.string().required(),
	});

	return schema.validate(state);
}

exports.State = State;
exports.validate = validateState;
