import "./App.css"
import {useState} from "react";
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDuDdjkRHl9woTNBtRni5CYb660iG_Cqf0",
//   authDomain: "notes-app-d01d3.firebaseapp.com",
//   projectId: "notes-app-d01d3",
//   storageBucket: "notes-app-d01d3.appspot.com",
//   messagingSenderId: "934691326498",
//   appId: "1:934691326498:web:9e183c5235fe6f52b7d87b",
//   measurementId: "G-XWEKFRL9TP"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "note title 1",
      content: "content 1",
    },
    {
      id: 2,
      title: "note title 2",
      content: "content 2",
    },
    {
      id: 3,
      title: "note title 3",
      content: "content 3",
    },
    {
      id: 4,
      title: "note title 4",
      content: "content 4",
    }
  ]);

  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const handleNoteClick = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    //console.log("title ",title);
    //console.log("content ",content);

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    }

    setNotes([newNote,...notes]);
    setTitle("")
    setContent("")
  };

  const handleUpdateNote = (event:React.FormEvent) => {
    event.preventDefault();
    if (!selectedNote) {
      return;
    }
    const updatedNote: Note = {
      id: selectedNote.id,
      title:title,
      content:content,
    }

    const updatedNotesList = notes.map((note=> note.id===selectedNote.id? updatedNote : note)
    )

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }

  const deletenote = (event: React.MouseEvent,
    noteId: number
  ) => {
    event.stopPropagation();

    const updatedNotes = notes.filter((note) => note.id  !== noteId)

    setNotes(updatedNotes);
  };



  return (
    <div className="app-container">
      <form className="note-form" onSubmit={(event)=>selectedNote?
        handleUpdateNote(event) : handleAddNote(event)
      }>
        <input
          value={title}
          onChange = {(event)=> setTitle(event.target.value)}
          placeholder="Title" required></input>

          <textarea
            value={content}
            onChange = {(event)=> setContent(event.target.value)}
            placeholder="Content" rows={10} required></textarea>

            {selectedNote? (
              <div className="edit-buttons">
                <button type="submit">Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            ): (    <button type='submit'>Add Note</button>
            )}
      </form>

      <div className = "notes-grid">
        {notes.map((note) => (
          <div className='note-item'
          onClick={() => handleNoteClick(note)}>
          <div className="notes-header">
            <button
              onClick={(event)=> deletenote(event,note.id)}>x</button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
        ))}
        
      </div>
    </div>
  );
};

export default App;