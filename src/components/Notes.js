import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {

    const {showAlert} = props;
    
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const {notes, getNotes, editNote} = context;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();   
        } else {
            navigate("/login");
        }
    }, []);
    
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ""
    });
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }
    const openUpdateNoteModal = (updatingNote) => {
        ref.current.click();
        setNote(updatingNote);
    }
    
    const ref = useRef(null);
    const refClose=useRef(null);
    
    return (
        <>
            <AddNote showAlert={showAlert}/>

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
            Launch edit modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" onChange={onChange} aria-describedby="titleHelp" value={note.title} required/>
                            </div>
                            <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} required minLength={1} maxLength={1000}/>
                            </div>
                            <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>{editNote(note);refClose.current.click();showAlert("Note updated successfully", "success");}}>Update Note</button>
                    </div>
                    </div>
                </div>
            </div>

            <div className="container my-3">
                <h1>Your notes</h1>
                <div className="row my-3">
                {notes.map((note) => {
                    return <NoteItem key={note._id} openUpdateNoteModal={openUpdateNoteModal} note={note} showAlert={showAlert}/>;
                })}
                    <div className="container">
                        {notes.length===0 && "No notes to display"}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes