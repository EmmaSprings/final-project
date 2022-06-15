import mongoose from "mongoose"
//create a consequences schema and connect it in here.

const noteTemplate = new mongoose.Schema({
    // ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ownerId: {
        type: String
    },
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
        type: Object,
        required: true
    },
    isPinned: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Note', noteTemplate)