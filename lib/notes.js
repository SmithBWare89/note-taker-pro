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
    if(!note.id || typeof note.id !== 'string'){
        return false;
    }
    return true;
}

module.exports = {createNewNote, validateNote};