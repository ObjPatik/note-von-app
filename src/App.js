import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Header from './components/Header';
import './App.css';

// Base URL of your backend API service
const API_BASE_URL = 'http://localhost:8080/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. GET: Fetch all notes from the backend database on load
  useEffect(() => {
    fetch(API_BASE_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch notes.');
        return response.json();
      })
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 2. POST: Send a new note to the backend database
  const addNote = (title, text) => {
    const newNotePayload = {
      title: title || 'Untitled Note',
      text: text
    };

    fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNotePayload),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to save note.');
        return response.json();
      })
      .then((savedNote) => {
        // Prepend the newly created note (returned with its DB ID) to the UI state
        setNotes([savedNote, ...notes]);
      })
      .catch((err) => alert(err.message));
  };

  // 3. DELETE: Remove a note from the backend database by ID
  const deleteNote = (id) => {
    fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to delete note.');
        // Remove from local state if backend deletion succeeded
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <NoteForm onAddNote={addNote} />
        
        {loading && <p>Loading your notes from the database...</p>}
        {error && <p style={{ color: '#ef4444' }}>Error: {error}</p>}
        
        {!loading && !error && (
          <NoteList notes={notes} onDeleteNote={deleteNote} />
        )}
      </div>
    </div>
  );
}

export default App;