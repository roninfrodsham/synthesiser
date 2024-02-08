function getAllNaturalNotes(naturalNotes: Array<string>, [firstKey, lastKey]: Array<string>) {
  const firstNote = firstKey[0];
  const firstOctave = parseInt(firstKey[1]);
  const firstNotePosition = naturalNotes.indexOf(firstNote);
  const lastNote = lastKey[0];
  const lastOctave = parseInt(lastKey[1]);
  const lastNotePosition = naturalNotes.indexOf(lastNote);

  const allNaturalNotes: Array<string> = [];

  for (let octave = firstOctave; octave <= lastOctave; octave++) {
    const start = octave === firstOctave ? firstNotePosition : 0;
    const end = octave === lastOctave ? lastNotePosition + 1 : naturalNotes.length;

    naturalNotes.slice(start, end).forEach((note) => {
      allNaturalNotes.push(`${note}${octave}`);
    });
  }

  return allNaturalNotes;
}

export { getAllNaturalNotes };
