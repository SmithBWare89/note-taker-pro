const router = require('express').Router();
const notes = require('../../db/db.json');

router.get('/api/notes', (req, res) => {
    // When user requests the notes
    // Send the notes in a json format
    res.json(notes);
})

router.get('/api/notes/:id', (req, res) => {
    // find the note by id
    // if there is a matching result then return it
    // otherwise sending 404 error
})

router.get('/api/notes/:title', (req, res) => {
    // find note by keyword
    // if it matches then return it
    // otherwise return 404 error
})

router.post('/api/notes', (req, res) => {
    // set id for the note
    // validate the note
        // if note doesn't contain title
        // if note doesn't contain body text
        // keywords optional? mandatory?
})

router.get('/api/*', (req,res) => {
    res.status(404).send('This is not a valid request.');
})

module.exports = router;