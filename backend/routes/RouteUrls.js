import express from "express"
import bcrypt from "bcrypt-nodejs"

import User from "../models/Users"
import Note from "../models/Notes"

const router = express.Router()

const authenticateUser = async (req, res, next) => {
    const user = await User.findOne({ accessToken: req.header('Authorization') })
    if (user) {
        req.user = user
        next()
    } else {
        res.status(401).json({ loggedOut: true })
    }
}

const salt = bcrypt.genSaltSync()
router.post('/signup', async (req, res) => {
    const duplicateUser = await User.findOne({ email: req.body.email} || {username: req.body.username})
    if (duplicateUser){
       return res.status(400).json({
            message: "Username or email has already been used. Please try again.",
            success: false
        })
    }
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt)
    })
    newUser.save()
        .then(() => {
            res.status(201).json({
                username: newUser.username,
                accessToken: newUser.accessToken,
                userId: newUser._id,
                success: true
            })
        })
        .catch(err => {
            res.status(400).json({
                message: "An error occurs, please try again.",
                errors: err.errors,
                success: false
            })
        })
})


router.post('/signin', async (req, res) => {
    const { email, username, password } = req.body
    let conditions
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        conditions = { email: email }
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
        conditions = { email: username }
    } else {
        conditions = !!username ? { username: username } : { username: email };
    }

    const user = await User.findOne(conditions)
    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({
            success: true,
            userID: user._id,
            username: user.username,
            accessToken: user.accessToken
        })
    } else {
        res.json({
            success: false,
            notFound: true
        })
    }
})

router.post('/notes', authenticateUser)
router.post('/notes', async (req, res) => {
    const userId = await User.findOne({ accessToken: req.header('Authorization') })
    const { title, activatingEvent, automatingThoughts, consequences, isPinned, when } = req.body
    const newNote = new Note({
        title: title,
        ownerId: userId._id,
        date: Date.now(),
        activatingEvent: activatingEvent,
        automatingThoughts: automatingThoughts,
        consequences: consequences,
        isPinned: isPinned,
        when: when
    })
    newNote.save()
        .then(() => {
            res.status(201).json({
                success: true
            })
        })
        .catch(err => {
            res.status(400).json({
                message: "Please try again",
                errors: err.errors,
                success: false
            })
        })
})

router.get('/notes', authenticateUser)
router.get('/notes', async (req, res) => {
    const userId = await User.findOne({ accessToken: req.header('Authorization') })
    const getNotes = await Note.find({ ownerId: userId._id}).sort({ date: "desc" })
    res.json({
        data: getNotes
    })
})



router.get('/notes/:noteId', authenticateUser)
router.get('/notes/:noteId', async (req, res) => {
    const getNotes = await Note.findOne({ _id: req.params.noteId })
    res.json(
      getNotes)
})

router.patch('/notes/:noteId', async (req, res) => {
    const { title, activatingEvent, automatingThoughts, consequences, isPinned } = req.body
    try {
        const updatedNote = await Note.updateOne(
            { _id: req.params.noteId },
            {
                $set: {
                    title: title,
                    activatingEvent: activatingEvent,
                    automatingThoughts: automatingThoughts,
                    consequences: consequences,
                    isPinned: isPinned
                }
            }
        )
        res.json(updatedNote)
    } catch (err) {
        res.json({ message: err })
    }
})

router.delete('/notes/:noteId', async (req, res) => {
    try {
        const removedNote = await Note.deleteOne({ _id: req.params.noteId })
        res.json(removedNote)
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router