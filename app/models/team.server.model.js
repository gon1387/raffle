'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Team Schema
 */
var TeamSchema = new Schema({
	name: {
		type: String,
		required: 'Please fill Team name',
		trim: true
	},
	abbrv: {
		type: String,
		required: 'Please fill Team abbreviation',
		trim: true,
		uppercase: true
	}
});

mongoose.model('Team', TeamSchema);