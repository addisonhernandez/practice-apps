import React from 'react';

const WordListEntry = ({ entry, entryIndex, onEdit, onDelete }) => {
  return (
    <div className="glossary-entry">
      <h3>{entry.word}:</h3>
      <p>{entry.definition}</p>
      <button onClick={() => onEdit(entryIndex)}>Edit</button>
      <button onClick={() => onDelete(entryIndex)}>Delete</button>
    </div>
  );
};

export default WordListEntry;
