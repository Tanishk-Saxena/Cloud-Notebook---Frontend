import noteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {

    const host = "http://localhost:5000/";
    const token = localStorage.getItem("token");

    const [notes, setNotes] = useState([]);

    //Get all notes
    const getNotes = async () => {
        const url = `${host}api/notes/fetchallnotes`;
        const response = await fetch(url, {
            "method": "GET",
            "headers": {
                "auth-token": token
            }
        })
        const res = await response.json();
        setNotes(res);
    }

    //Add a note
    const addNote = async (newNote) => {
        //TODO: Make an api call
        const url = `${host}api/notes/addnote`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "auth-token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        });
        const res = response.json;
        getNotes();

        //Logic to implement in client
        // console.log("Adding a new note");
        // const note = {
        //     "_id": "62b5b88c8e70e52426c2e2dq",
        //     "user": "62b45403d77c663b3c41c829",
        //     "title": newNote.title,
        //     "description": newNote.description,
        //     "tag": newNote.tag,
        //     "date": "2022-06-24T13:13:48.650Z",
        //     "__v": 0
        // }
        // setNotes(notes.concat(note));
    }

    //Edit a note
    const editNote = async (note) => {
        //TODO: Make an api call
        const url = `${host}api/notes/updatenote/${note._id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "auth-token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: note.title, description: note.description, tag: note.tag})
        });
        const res = response.json;
        getNotes();

        //Logic to implement in client
        // for (let index = 0; index < notes.length; index++) {
        //     const element = notes[index];
        //     if(element._id===id){
        //         notes[index].title=title;
        //         notes[index].description=description;
        //         notes[index].tag=tag;
        //     }
            
        // }
    }

    //Delete a node
    const deleteNote = async (id) => {
        //TODO: Make an api call
        const url = `${host}api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "auth-token": token
            }
        });
        getNotes();

        //Logic to implement in client
        // console.log("Deleting the note with id: " + id);
        // const newNotes = notes.filter((note)=>{
        //     return note._id!==id;
        //   });
        // setNotes(newNotes);
    }

    return (
        <noteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;