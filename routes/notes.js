const fs = require('fs');
const app = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');


// GET /api/notes should read the db.json file and return all the saved notes as JSON
// app.get('/api/notes', (req, res) => res.json(termData));
//http://localhost:3001/api/notes/
app.get('/', (req, res) => {
    // Read the existing notes from the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: 'could not read the notes' });
      }
      // Convert string into JSON object
      const existingNotes = JSON.parse(data);
  console.log(existingNotes)
      // Send the existing notes as JSON response
      return res.json(existingNotes);
    });
  });
  
  
  
  
  // POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
  //http://localhost:3001/api/notes/
  app.post('/', (req, res) => {
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
        return res.status(201).json(existingNotes);})
        
        
      });
      });


      module.exports = app;