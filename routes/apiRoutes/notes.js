const router = require('express').Router();
const notes = require('../../db/db.json');
const fs = require('fs');
const path = require('path');
const { createNewNote, validateNote, findById, findByTitle, randomizeId } = require('../../lib/notes');

router.get('/notes', (req, res) => {
    // When user requests the notes
    // Send the notes in a json format
    res.status(200).json(notes);
})

router.get('/notes/:routeName', (req, res) => {
    // Replace one or more whitespace with a -
    const searchedTitle = req.params.routeName.replace(/\s+/g, "-");
    // Find out if the searched title matches a title in the notes array
    const result = findByTitle(searchedTitle, notes);
    // If there is a match
    if(result){
        // display the match
        res.status(200).json(result);
    } else {
        // No match send 404
        res.send(404);
    }
})

router.get('/notes/:id', (req, res) => {
    // find the note by id
    const result = findById(req.params.id, notes);

    // If there is a matching note
    if(result){
        // Print it
        res.status(200).json(result);
    } else {
        // Else send 404 error
        res.send(404);
    }
})

// Creates a new note in json
router.post('/notes', (req, res) => {
    // set unique id for the note
    req.body.id = randomizeId();

    // set route name
    // replaces all spaces in the title with hyphens
    req.body.routeName = req.body.title.replace(/\s+/g, "-");

    // If the note is not formatted properly
    if(!validateNote(req.body)) {
        // Send 400 status code
        // Print that the message
        res.status(400).send('The note is not properly formatted.');
    } else {
        // Else pass the new info and existing note array into function
        const newNote = createNewNote(req.body, notes);
        // Print the newly created note
        res.status(200).json(newNote);
    }
})

router.delete('/notes/:id', (req, res) => {
    // Convert the searched id to a number
    const id = Number(req.params.id);
    // See if the id exists in the array
    const deleted = notes.find(notes => notes.id === id);
    // If it does exist
    if(deleted){
        // Filter for all that don't match the id
        const notesArray = notes.filter(notes => notes.id !== id);
        // Rewrite the json file
        fs.writeFileSync(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify(notesArray, null, 2)
        );
        // Send new notes file
        res.send();
    } else {
        res.status(404).send(`Note you're looking for does not exist.`)
    }
})

// Tells the user their request is not valid if it does not match any path
router.get('/*', (req,res) => {
    res.status(404).send('This is not a valid request.');
})

module.exports = router;