function getAllNaturalNotes(naturalNotes: Array<string>, [firstKey, lastKey]: Array<string>) {
  const firstNote = firstKey.slice(0, 1);
  const firstOctave = parseInt(firstKey.slice(1));
  const firstNotePosition = naturalNotes.indexOf(firstNote);
  const lastNote = lastKey.slice(0, 1);
  const lastOctave = parseInt(lastKey.slice(1));
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
