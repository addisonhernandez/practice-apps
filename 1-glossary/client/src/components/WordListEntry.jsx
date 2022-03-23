import React from 'react';

const WordListEntry = (props) => (
  <div className="glossary-entry">
    <span>{props.entry.word}: </span>
    <span>{props.entry.definition}</span>
  </div>
);

export default WordListEntry;
