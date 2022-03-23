import React from 'react';
import WordListEntry from './WordListEntry.jsx';

const WordList = ({ entries }) => (
  <div className="word-list">
    <h2>Entries</h2>
    {entries.map((entry) => (
      <WordListEntry key={entry._id} entry={entry} />
    ))}
  </div>
);

export default WordList;
