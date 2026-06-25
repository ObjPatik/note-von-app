// components/Note.js
import React from 'react';

const Note = ({ id, title, text, date, onDeleteNote }) => {
  return (
    <div className="note-card">
      <div className="note-header">
        <h4>{title}</h4>
        <button className="delete-btn" onClick={() => onDeleteNote(id)}>
          &times;
        </button>
      </div>
      <p className="note-body">{text}</p>
      <small className="note-footer">{date}</small>
    </div>
  );
};

export default Note;