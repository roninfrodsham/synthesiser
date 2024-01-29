function getAllNaturalNotes(naturalNotes: Array<string>, [firstKey, lastKey]: Array<string>) {
  const firstNote = firstKey[0];
  const firstOctave = parseInt(firstKey[1]);
  const firstNotePosition = naturalNotes.indexOf(firstNote);
  const lastNote = lastKey[0];
  const lastOctave = parseInt(lastKey[1]);
  const lastNotePosition = naturalNotes.indexOf(lastNote);

  const allNaturalNotes: Array<string> = [];

  for (let octave = firstOctave; octave <= lastOctave; octave++) {
    if (octave === firstOctave) {
      naturalNotes.slice(firstNotePosition).forEach((note) => {
        allNaturalNotes.push(`${note}${octave}`);
      });
    } else if (octave === lastOctave) {
      naturalNotes.slice(0, lastNotePosition + 1).forEach((note) => {
        allNaturalNotes.push(`${note}${octave}`);
      });
    } else {
      naturalNotes.forEach((note) => {
        allNaturalNotes.push(`${note}${octave}`);
      });
    }
  }

  return allNaturalNotes;
}

export { getAllNaturalNotes };
