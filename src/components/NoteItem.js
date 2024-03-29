import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {

  const {note, openUpdateNoteModal, openReadMoreModal, showAlert} = props//destructuring

  const context = useContext(noteContext);
  const {deleteNote} = context; //destructuring

  return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
            <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);showAlert("Note deleted successfully", "success");}}></i>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{openUpdateNoteModal(note);}}></i>
            </div>        
            <p className="card-text">{note.description}</p>
            <button onClick={()=>{openReadMoreModal(note);}} className="btn btn-primary">Read More</button>
            </div>
        </div>
    </div>
  )
}

export default NoteItem