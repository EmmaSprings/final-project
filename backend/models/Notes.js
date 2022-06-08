import mongoose from "mongoose"

const noteTemplate = new mongoose.Schema({
    ownerId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    title: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    activatingEvent: {
        type: String,
        required: true
    },
    automatingThoughts: {
        type: String,
        required: true
    },
    consequences: {
        type: String,
        required: true
    },
    isPinned: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Note', noteTemplate)

