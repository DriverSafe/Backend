const config = require("config");
const { State, validate } = require("../models/state");

exports.getStates = async (req, res) => {
	const states = await State.find().sort({ _id: -1 });
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

	const requestCount = await State.countDocuments();

	if (requestCount >= config.get("maxRequestsStored")) {
		const oldestState = await State.findOne().sort({ _id: 1 });
		await State.findByIdAndRemove(oldestState._id);
	}

	let state = new State({
		speed: req.body.speed,
		state: req.body.state,
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
			state: req.body.state,
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

exports.deleteAllStates = async (req, res) => {
	const states = await State.deleteMany();

	if (!states)
		return res.status(404).send("The states with the given ID was not found.");

	res.send(states);
};
