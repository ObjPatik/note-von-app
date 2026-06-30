import React from 'react';

const Note = ({ id, title, text, date, category, action, onDeleteNote }) => {
  return (
    <div className="note-card">
      <div className="note-header">
        <div>
          <h4>{title}</h4>
          <div className="note-badges">
            <span className="note-badge">{category}</span>
            <span className="note-badge subtle">{action}</span>
          </div>
        </div>
        <button className="delete-btn" onClick={() => onDeleteNote(id)} aria-label="Delete note">
          &times;
        </button>
      </div>
      <p className="note-body">{text}</p>
      <small className="note-footer">{date}</small>
    </div>
  );
};

export default Note;