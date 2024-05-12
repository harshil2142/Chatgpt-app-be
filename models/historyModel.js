const mongoose = require('mongoose');

// Define the schema for the history collection
const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pdfUrl: {
        type: String,
        required: true
    },
    summary:{
        type : String,
    },
    history: [{
        prompt: {
            type: String,
            required: true
        },
        response: {
            type: String,
            required: true
        }
    }]
},
    {
        timestamps: true,
    }
);

// Create a model for the history collection
const History = mongoose.model('History', historySchema);

module.exports = History;
