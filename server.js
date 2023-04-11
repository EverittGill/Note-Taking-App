// GIVEN a note-taking application
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column


// success response 

const express = require('express');
const app = express()

// const fs = require('fs')
const path = require('path')
// const { v4: uuidv4 } = require('uuid');
// const { uuid } = require('uuidv4');
// const helpers = require('./helpers/fsUtils');
// const { clog } = require('./middleware/clog')
const api = require('./routes/index.js')

const PORT = process.env.PORT || 3001;


// from the mini challenge. use as needed
// // Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);
app.use(express.static('public'));
// http://localhost:3001/api
app.use('/api', api)





// GET /notes should return the notes.html file
app.get('/notes', (req, res) => {
 return res.sendFile(path.join(__dirname, '/public/notes.html'))
});


// get * should return the index.html file
// GET Route for homepage
app.get('/', (req, res) => {
 return res.sendFile(path.join(__dirname, '/public/index.html'))
});








    

    app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
