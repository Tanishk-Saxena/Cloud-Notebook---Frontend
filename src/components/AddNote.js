import React, {useContext, useState} from 'react'
import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {

    const {showAlert} = props;

    const context = useContext(noteContext);
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ""
    });
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    } 
    const handleClick = (e) => {
        try {
            e.preventDefault();
            context.addNote(note);
            setNote({
                title: "",
                description: "",
                tag: ""
            });
            showAlert("Note added successfully", "success"); 
        } catch (error) {
            console.log(error.message);
            showAlert("Internal Server Error", "danger");
        }
    }
    
    return (
        <div className="container my-3">
            <h1>Add a note</h1>
            <form>
                <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} aria-describedby="titleHelp" required/>
                </div>
                <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} required minLength={1} maxLength={1000}/>
                </div>
                <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote