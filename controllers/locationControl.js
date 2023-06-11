const { Location, validate } = require("../models/location");

exports.getLocations = async (req, res) => {
	const locations = await Location.find().sort("name");
	res.send(locations);
};

exports.getLocation = async (req, res) => {
	const location = await Location.findById(req.params.id);
	if (!location)
		return res
			.status(404)
			.send("The location with the given ID was not found.");
	res.send(location);
};

exports.createLocation = async (req, res) => {
	const { error } = validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	let location = new Location({
		name: req.body.name,
		cordination: req.body.cordination,
	});

	location = await location.save();
	res.send(location);
};

exports.updateLocation = async (req, res) => {
	const { error } = validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const location = await Location.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			cordination: req.body.cordination,
		},
		{ new: true }
	);

	if (!location)
		return res
			.status(404)
			.send("The location with the given ID was not found.");

	res.send(location);
};

exports.deleteLocation = async (req, res) => {
	const location = await Location.findByIdAndRemove(req.params.id);

	if (!location)
		return res
			.status(404)
			.send("The location with the given ID was not found.");

	res.send(location);
};
