'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	attachments = require('mongoose-attachments-localfs'),
	config = require('../../config/config'),
	os = require('os'),
	path = require('path');

/**
 * Picture Schema
 */
var PictureSchema = new Schema({
	participant: {
		type: Schema.ObjectId,
		ref: 'Participant'
	}
});

PictureSchema.plugin(attachments, {
	directory: os.tmpDir(),
	storage: {
		providerName: 'localfs',
		options: {
			directory: config.paths.images
		}
	},
	properties: {
		image: {
			styles:{
				original: {
				},
				thumb: {
					thumbnail: '100x100^',
					gravity: 'center',
					extent: '100x100',
					background: 'black',
					'$format': 'jpg'
				},
				detail: {
					resize: '500x500>',
					'$format': 'jpg'
				}
			}
		}
	}
});

PictureSchema.virtual('thumb_img', function(){
	return path.join('thumb', path.basename(this.image.thumb.path));
});
PictureSchema.virtual('detail_img', function(){
	return path.join('detail', path.basename(this.image.detail.path));
});

mongoose.model('Picture', PictureSchema);