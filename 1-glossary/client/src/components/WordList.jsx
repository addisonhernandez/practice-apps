import React from 'react';

const WordList = (props) => (
  <div className="word-list">
    {props.entries.map((entry) => <WordListEntry entry={entry} />)}
  </div>
);

export default WordList;
