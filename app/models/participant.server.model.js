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
	name: {
		type: String,
		default: '',
		required: 'Please fill Participant name',
		trim: true
	},
	firstname: {
		type: String,
		required: 'Please fill participan\'s firstname',
		trim: true
	},
	middlename: {
		type: String,
		require: 'Please fill participant\'s middlename',
		trim: true
	},
	lastname: {
		type: String,
		require: 'Please fill participant\'s lastname',
		trim: true
	},
	isPresent: {
		type: Boolean,
		default: false
	},
	picture: {
		type: Schema.ObjectId,
		ref: 'Picture'
	}
});

mongoose.model('Participant', ParticipantSchema);