const { State, validate } = require("../models/state");

exports.getStates = async (req, res) => {
	const states = await State.find();
	res.send(states);
};

exports.getState = async (req, res) => {
	const state = await State.findById(req.params.id);
	if (!state)
		return res.status(404).send("The state with the given ID was not found.");
	res.send(state);
};

exports.createState = async (req, res) => {
	const { error } = validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	let state = new State({
		speed: req.body.speed,
		distance: req.body.distance,
	});

	state = await state.save();
	res.send(state);
};

exports.updateState = async (req, res) => {
	const { error } = validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const state = await State.findByIdAndUpdate(
		req.params.id,
		{
			speed: req.body.speed,
			distance: req.body.distance,
		},
		{ new: true }
	);

	if (!state)
		return res.status(404).send("The state with the given ID was not found.");

	res.send(state);
};

exports.deleteState = async (req, res) => {
	const state = await State.findByIdAndRemove(req.params.id);

	if (!state)
		return res.status(404).send("The state with the given ID was not found.");

	res.send(state);
};
