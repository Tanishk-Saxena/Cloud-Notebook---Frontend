const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');
const Notes = require("../models/Notes");

const router=express.Router();

//ROUTE 1: Read all the notes using: GET "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);   
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
});

//ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required.
router.post("/addnote", [
    body('title', 'Enter a valid title').exists(),
    body('description', 'Enter a valid content').isLength({ min: 1, max: 1000 })
], fetchuser, async (req, res) => {
    
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {title, description, tag} = req.body;

    //create a note in the notes db
    try {
        const entry = {
            title,
            description,
            tag,
            user: req.user.id
        };
        let note = await Notes.create(entry);
        res.json(note);    
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
});

//ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote/:id". Login required.
router.put("/updatenote/:id", [
    body('title', 'Enter a valid title').exists(),
    body('description', 'Enter a valid content').isLength({ min: 1, max: 1000})
], fetchuser, async (req, res) => {
    
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {title, description, tag} = req.body;
    const entry = {
        title,
        description,
        tag,
        user: req.user.id
    };

    //update a note in the notes db
    try {

        //check to see if user is accessing a pre-existing note or not and whether that is one of his own notes or not
        const existingNote = await Notes.findById(req.params.id);
        if(!existingNote){
            return res.status(404).json({error: "No note found"});
        }
        if(existingNote.user.toString() !== req.user.id){
            return res.status(401).json({error: "Authentication error. This note does not belong to the token used."});
        }

        //if user is infact accessing his own notes, then update the note with a new entry
        let note = await Notes.findByIdAndUpdate(req.params.id, {$set: entry}, {new: true});
        // let note = await Notes.updateOne(entry, {_id: req.params.id});
        res.json(note);    
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
});

//ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote/:id". Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {

    //delete a note from the notes db
    try {

        //check to see if user is accessing a pre-existing note or not and whether that is one of his own notes or not
        const existingNote = await Notes.findById(req.params.id);
        if(!existingNote){
            return res.status(404).json({error: "No note found"});
        }
        if(existingNote.user.toString() !== req.user.id){
            return res.status(401).json({error: "Authentication error. This note does not belong to the token used."});
        }

        //if user is infact accessing his own notes, then delete the note
        let note = await Notes.findByIdAndDelete(req.params.id);
        res.json({success: "Note has been deleted", note});    
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = router;