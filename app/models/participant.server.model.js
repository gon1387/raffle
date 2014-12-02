'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Participant Schema
 */
var ParticipantSchema = new Schema({
	firstname: {
		type: String,
		required: 'Please fill participan\'s firstname',
		trim: true
	},
	middlename: {
		type: String,
		required: 'Please fill participant\'s middlename',
		trim: true
	},
	lastname: {
		type: String,
		required: 'Please fill participant\'s lastname',
		trim: true
	},
	isPresent: {
		type: Boolean,
		default: false
	},
	isAttending: {
		type: Boolean,
		default: false
	},
	team: {
		type: Schema.ObjectId,
		ref: 'Team'
	},
	picture: {
		type: Schema.ObjectId,
		ref: 'Picture'
	}
});

mongoose.model('Participant', ParticipantSchema);