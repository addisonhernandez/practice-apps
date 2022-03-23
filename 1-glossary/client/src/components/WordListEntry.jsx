import React from 'react';

const WordListEntry = ({ entry }) => (
  <div className="glossary-entry">
    <span>{entry.word}: </span>
    <span>{entry.definition}</span>
  </div>
);

export default WordListEntry;
