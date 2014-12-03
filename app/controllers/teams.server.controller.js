'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Team = mongoose.model('Team'),
	_ = require('lodash');

/**
 * Create a Team
 */
exports.create = function(req, res) {
	var team = new Team(req.body);

	team.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(team);
		}
	});
};

/**
 * Show the current Team
 */
exports.read = function(req, res) {
	res.jsonp(req.team);
};

/**
 * Update a Team
 */
exports.update = function(req, res) {
	var team = req.team ;console.log(team);

	team = _.extend(team , req.body);

	team.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(team);
		}
	});
};

/**
 * Delete an Team
 */
exports.delete = function(req, res) {
	var team = req.team ;

	team.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(team);
		}
	});
};

/**
 * List of Teams
 */
exports.list = function(req, res) { 
	Team.find().exec(function(err, teams) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(teams);
		}
	});
};

/**
 * Team middleware
 */
exports.teamByID = function(req, res, next, id) { 
	Team.findById(id).exec(function(err, team) {
		if (err) return next(err);
		if (! team) return next(new Error('Failed to load Team ' + id));
		req.team = team ;
		next();
	});
};
