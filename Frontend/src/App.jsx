
import React, { useState, useEffect } from 'react';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');

  // Load notes from local storage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Save notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (editingIndex !== null) {
      const updatedNotes = notes.map((note, index) =>
        index === editingIndex ? { title, body, categories, tags } : note
      );
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([...notes, { title, body, categories, tags }]);
    }
    resetForm();
  };

  const handleEditNote = (index) => {
    const noteToEdit = notes[index];
    setTitle(noteToEdit.title);
    setBody(noteToEdit.body);
    setCategories(noteToEdit.categories);
    setTags(noteToEdit.tags);
    setEditingIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const resetForm = () => {
    setTitle('');
    setBody('');
    setCategories('');
    setTags('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Note Taking App</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Categories"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-500 text-white rounded p-2"
        >
          {editingIndex !== null ? 'Update Note' : 'Add Note'}
        </button>
      </div>
      <div>
        {notes.map((note, index) => (
          <div key={index} className="border rounded p-4 mb-2">
            <h2 className="font-semibold">{note.title}</h2>
            <p>{note.body}</p>
            <p className="text-gray-500">Categories: {note.categories}</p>
            <p className="text-gray-500">Tags: {note.tags}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEditNote(index)}
                className="bg-yellow-500 text-white rounded p-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteNote(index)}
                className="bg-red-500 text-white rounded p-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
