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
    const random = Math.floor(Math.random() * 1000000);
    if(notes.length > 0) {
        for(let i = 0; i < notes.length; i++){
            // If the randomly generated number is equal to a current id
            if(random === notes[i].id){
                // return a newly generated number
                return Math.floor(Math.random() * 1000000)
            }
            // If those don't then return the random number;
            return random;
        }
    }
    return random;
}

module.exports = {createNewNote, validateNote, findById, findByTitle, randomizeId };