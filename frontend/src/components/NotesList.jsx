import { useState } from 'react';
import { notesAPI } from '../services/api';
import './NotesList.css';

export default function NotesList({ notes, onNotesChange, leadId, currentUser }) {
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setLoading(true);
    setError('');

    try {
      await notesAPI.createNote(leadId, {
        content: newNote,
        createdBy: currentUser
      });
      setNewNote('');
      onNotesChange();
    } catch (err) {
      setError('Failed to add note');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Delete this note?')) return;

    try {
      await notesAPI.deleteNote(noteId);
      onNotesChange();
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  return (
    <div className="notes-container">
      <h3>Notes</h3>

      <form onSubmit={handleAddNote} className="note-form">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          rows="3"
        />
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Adding...' : 'Add Note'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="no-notes">No notes yet</p>
        ) : (
          notes.map(note => (
            <div key={note._id} className="note-item">
              <div className="note-header">
                <span className="note-author">{note.createdBy}</span>
                <span className="note-date">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="btn-delete"
                  title="Delete note"
                >
                  ×
                </button>
              </div>
              <p className="note-content">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
