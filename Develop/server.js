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
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const { uuid } = require('uuidv4');
const helpers = require('git ./helpers/fsUtils');
// const { clog } = require('./middleware/clog')
// const api = require('../routes.index.js')

const PORT = process.env.PORT || 3001;

const app = express()

// from the mini challenge. use as needed
// // Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);
app.use(express.static('public'));






// GET /notes should return the notes.html file
app.get('/notes', (req, res) => {
 return res.sendFile(path.join(__dirname, '/public/notes.html'))
});


// get * should return the index.html file
// GET Route for homepage
app.get('/', (req, res) => {
 return res.sendFile(path.join(__dirname, '/public/index.html'))
});





// GET /api/notes should read the db.json file and return all the saved notes as JSON
// app.get('/api/notes', (req, res) => res.json(termData));

app.get('/api/notes', (req, res) => {
  // Read the existing notes from the db.json file
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: 'could not read the notes' });
    }
    // Convert string into JSON object
    const existingNotes = JSON.parse(data);

    // Send the existing notes as JSON response
    return res.json(existingNotes);
  });
});




// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
console.info(`${req.method} request to add a review`)

  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4()
  };

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: 'could not read the notes'})
    }
      const existingNotes = JSON.parse(data);

      // const newNote = req.body
    existingNotes.push(newNote);

    // Write the updated notes to the db.json file
    fs.writeFile('./db/db.json', JSON.stringify(existingNotes, null, 4), (err) => {
      if (err) {
        console.error(err);
         return res.status(500).send({ error: 'could not save the note due to error'});
      }


    const response = {
      status: "success",
      body: newNote
    }

          // Return the new note to the client
      return res.status(201).send(newNote);})
      
      
    });
    });


    

    app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
  );
