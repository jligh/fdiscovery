'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Look Schema
 */
var LookSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Look Title',
		trim: true
	},
    blurb: {
        type: String,
        default: ''
    },
    thumbnail_url: {
        type: String,
        default: ''
    },
    details_url: {
        type: String,
        default: ''
    },
    author: {
        type: Schema.ObjectId,
        ref: 'Author'
    },
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Look', LookSchema);