'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Author Schema
 */
var AuthorSchema = new Schema({
    displayName: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    }
});

mongoose.model('Author', AuthorSchema);