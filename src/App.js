import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const STORAGE_KEY = 'notify-notes';

const getNoteMetadata = (title, text) => {
  const cleanTitle = title?.trim();
  const cleanText = text?.trim() || '';
  const titlePreview = cleanTitle || cleanText.split(/\s+/).slice(0, 5).join(' ') || 'Untitled Note';

  const lowerText = cleanText.toLowerCase();
  let category = 'General';
  let action = 'Capture and review later';

  if (/meeting|standup|client|project|deadline|agenda|team/.test(lowerText)) {
    category = 'Work';
    action = 'Follow up after the meeting';
  } else if (/todo|task|reminder|schedule|plan|deadline/.test(lowerText)) {
    category = 'Task';
    action = 'Turn this into an action list';
  } else if (/idea|brainstorm|creative|concept|innovation/.test(lowerText)) {
    category = 'Idea';
    action = 'Expand this idea later';
  } else if (/journal|reflection|feeling|mood|thought/.test(lowerText)) {
    category = 'Reflection';
    action = 'Keep this for personal review';
  }

  return {
    title: titlePreview,
    category,
    action,
  };
};

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const savedNotes = window.localStorage.getItem(STORAGE_KEY);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (err) {
      setError('Unable to load saved notes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes, loading]);

  const addNote = (title, text) => {
    const metadata = getNoteMetadata(title, text);
    const newNote = {
      id: Date.now(),
      title: metadata.title,
      text,
      date: new Date().toLocaleString(),
      category: metadata.category,
      action: metadata.action,
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <div className="app-container">
      <div className="app-shell">
        <Header />
        <div className="main-content">
          <div className="content-grid">
            <NoteForm onAddNote={addNote} />

            <section className="notes-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Workspace</p>
                  <h3>Recent notes</h3>
                </div>
                <span className="note-count">{notes.length} saved</span>
              </div>

              {loading && <div className="status-card">Loading your notes locally...</div>}
              {error && <div className="status-card error">Error: {error}</div>}

              {!loading && !error && <NoteList notes={notes} onDeleteNote={deleteNote} />}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;