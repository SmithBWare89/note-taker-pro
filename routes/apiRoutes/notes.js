const router = require('express').Router();
const notes = require('../../db/db.json');
const { v4: uuidv4 } = require('uuid');
const createNewNote = require('../../lib/notes');

router.get('/notes', (req, res) => {
    // When user requests the notes
    // Send the notes in a json format
    res.json(notes);
})
router.get('/notes/:id', (req, res) => {
    // find the note by id
    // if there is a matching result then return it
    // otherwise sending 404 error
})

router.get('/notes/:title', (req, res) => {
    const results = 
    res.json(notes)
})

router.post('/notes', (req, res) => {
    // set unique id for the note
    req.body.id = uuidv4();
    const newNote = createNewNote(req.body, notes);
    // res.json(newNote);
    res.json(newNote);
    // validate the note
        // if note doesn't contain title
        // if note doesn't contain body text
        // keywords optional? mandatory?
})

router.get('/*', (req,res) => {
    res.status(404).send('This is not a valid request.');
})

module.exports = router;