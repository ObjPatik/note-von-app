import React from 'react';
import Note from './Note';

const NoteList = ({ notes, onDeleteNote }) => {
  if (notes.length === 0) {
    return <div className="no-notes">No notes yet. Add one to get started!</div>;
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          text={note.text}
          date={note.date}
          category={note.category}
          action={note.action}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </div>
  );
};

export default NoteList;