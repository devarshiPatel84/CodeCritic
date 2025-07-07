const mongoose = require('mongoose');

const reviewHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    }, {timestamps: true}
);

const ReviewHistory = mongoose.model('ReviewHistory', reviewHistorySchema);
module.exports = ReviewHistory;