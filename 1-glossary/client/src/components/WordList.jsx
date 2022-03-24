import React from 'react';
import WordListEntry from './WordListEntry.jsx';

const WordList = ({ entries, onEdit, onDelete }) => (
  <div className="word-list">
    <h2>Entries</h2>
    <span>
      <em>There are {entries.length} matching entries</em>
    </span>
    {entries.map((entry, index) => (
      <WordListEntry
        key={entry._id}
        entry={entry}
        entryIndex={index}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default WordList;
