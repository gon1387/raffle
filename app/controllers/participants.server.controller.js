'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Participant = mongoose.model('Participant'),
	_ = require('lodash');

/**
 * Create a Participant
 */
exports.create = function(req, res) {
	var participant = new Participant(req.body);
	participant.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(participant);
		}
	});
};

/**
 * Show the current Participant
 */
exports.read = function(req, res) {
	res.jsonp(req.participant);
};

/**
 * Update a Participant
 */
exports.update = function(req, res) {
	var participant = req.participant ;

	participant = _.extend(participant , req.body);

	participant.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(participant);
		}
	});
};

/**
 * Delete an Participant
 */
exports.delete = function(req, res) {
	var participant = req.participant ;

	participant.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(participant);
		}
	});
};

/**
 * List of Participants
 */
exports.list = function(req, res) { 
	Participant.find().sort('-created').populate('user', 'displayName').exec(function(err, participants) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(participants);
		}
	});
};

/**
 * Participant middleware
 */
exports.participantByID = function(req, res, next, id) { 
	Participant.findById(id).exec(function(err, participant) {
		if (err) return next(err);
		if (! participant) return next(new Error('Failed to load Participant ' + id));
		req.participant = participant ;
		next();
	});
};

/**
 * Participant authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.participant.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
