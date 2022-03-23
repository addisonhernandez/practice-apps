import React from 'react';

const WordListEntry = ({ word, definition }) => (
  <div className="glossary-entry">
    <span>{word}: </span>
    <span>{definition}</span>
  </div>
);

export default WordListEntry;
