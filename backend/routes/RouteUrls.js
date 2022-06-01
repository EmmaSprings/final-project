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
router.post('/signup', (req, res) => {
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
                userId: newUser._id
            })
        })
        .catch(err => {
            res.json(400).json({
                message: "Please try again",
                errors: err.errors,
                success: false
            })
        })
})

router.post('/notes', (req,res) => {
  const { title, date, activatingEvent, automatingThoughts, consequences } = req.body
   const newNote = new Note({
        title: title,
        date: date,
        activatingEvent: activatingEvent,
        automatingThoughts: automatingThoughts,
        consequences: consequences
    })
    newNote.save()
        .then(() => {
            res.status(201).json({
                success: true
            })
        })
        .catch(err => {
            res.json(400).json({
                message: "Please try again",
                errors: err.errors,
                success: false
            })
        })
})

router.post('/signin', async (req, res) => {
    const { email, username, password } = req.body
    let conditions
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        conditions = {email : email}
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
        conditions = {email : username}
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
            notFound: true })
    }
})

router.get('/memberzone', authenticateUser)
router.get('/memberzone', async (req, res) => {
    const getUser = await User.findOne({ accessToken: req.header('Authorization') })
    res.json({
        message: "Hello",
        username: getUser.username,
        memberSince: getUser.date
    })
})

router.get('/notes', async (req, res) => {
    const notes = await Note.find()
    res.json(notes)
})

module.exports = router