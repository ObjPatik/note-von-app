import React, { useMemo, useState } from 'react';

const getAssistantSuggestions = (title, text) => {
  const cleanText = text.trim();
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

  const suggestedTitle = title.trim() || cleanText.split(/\s+/).slice(0, 5).join(' ') || 'Untitled Note';

  return { suggestedTitle, category, action };
};

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAddNote(title, text);
    setTitle('');
    setText('');
  };

  const aiSuggestions = useMemo(() => getAssistantSuggestions(title, text), [title, text]);

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div>
        <p className="eyebrow">Quick capture</p>
        <h3>New note</h3>
      </div>
      <p className="form-subtitle">Capture a task, meeting insight, or idea in seconds.</p>
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your note here..."
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>

      {(text || title) && (
        <div className="ai-preview">
          <div className="ai-preview-title">AI assistant</div>
          <div className="ai-preview-row">
            <span className="ai-chip">Title: {aiSuggestions.suggestedTitle}</span>
            <span className="ai-chip">Category: {aiSuggestions.category}</span>
          </div>
          <div className="ai-chip action-chip">Next step: {aiSuggestions.action}</div>
        </div>
      )}

      <button type="submit">Save note</button>
    </form>
  );
};

export default NoteForm;