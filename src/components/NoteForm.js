import React, { useState } from 'react';

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Don't allow empty notes

    onAddNote(title, text);
    setTitle('');
    setText('');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h3>Create a Note</h3>
      <input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Take a note..."
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;