const fs = require('fs');
const path = require('path');
const notes = require('../db/db.json');

function createNewNote(body, notes){
    const newNote = body;
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    return newNote;
}

// Accepts note being audited
function validateNote(note){
// validates if there's a title
    if(!note.title || typeof note.title !== 'string'){
        return false;
    }
    // validates if there's text
    if(!note.text || typeof note.text !== 'string'){
        return false;
    }
    // validates if there's an id
    if(!note.id || typeof note.id !== 'number'){
        return false;
    }
    return true;
}

function findById(searchedId, notesArray){
    // Convert the searched id to a number
    const number = Number(searchedId);
    // If it is not a number
    if(typeof number !== 'number'){
        // Return false
        return false;
    } else {
        // Else filter for matching id
        const result = notesArray.filter(note => note.id === number)[0];
        // Return object with matching id
        return result;
    }
}

function findByTitle(title, notesArray){
    // Filter titles of notes array to see if one matches our searched title
    const result = notesArray.filter(note => note.routeName === title)[0];
    // Return the matching object
    return result;
}

function randomizeId(){
    // Generate a random number
    const random = Math.floor(Math.random() * 1000000);
    // Find if there's a note with a matching id
    const matched = notes.find(note => note.id === random);
    // If it matches
    if(matched) {
        // Return a new random number
        return Math.floor(Math.random() * 1000000);
    } else {
        // Else return the random number
        return random;
    }
}

module.exports = {createNewNote, validateNote, findById, findByTitle, randomizeId };