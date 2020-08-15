const router = require('express').Router();
const notes = require('../../db/db.json');
const { v4: uuidv4 } = require('uuid');
const { createNewNote, validateNote } = require('../../lib/notes');

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
    // If the note is not valid
    if(!validateNote(req.body)) {
        // Send 400 status code
        // Print that the note is not formatted properly
        res.status(400).send('The note is not properly formatted.');
    } else {
        // Else pass the new note info and current note array into function
        const newNote = createNewNote(req.body, notes);
        // Print the newly created note
        res.json(notes);
    }
})

router.get('/*', (req,res) => {
    res.status(404).send('This is not a valid request.');
})

module.exports = router;